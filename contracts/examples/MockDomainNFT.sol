// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../IDomainNFT.sol";

/**
 * @title MockDomainNFT
 * @dev Mock implementation of IDomainNFT for testing and development
 * @notice This contract provides mock implementations of all IDomainNFT functions
 * for use in development, testing, and integration examples.
 */
contract MockDomainNFT is IDomainNFT {
    // DomainInfo struct (redefined for mock implementation)
    struct DomainInfo {
        string domain;
        address originalOwner;
        address currentOwner;
        uint256 mintedAt;
        uint256 expiresAt;
        uint256 renewalCount;
        bool isActive;
    }

    // Mock storage
    mapping(uint256 => DomainInfo) private _mockDomainInfo;
    mapping(string => uint256) private _mockDomainTokens;
    mapping(uint256 => address) private _mockTokenOwners;
    mapping(address => string[]) private _mockUserDomains;

    uint256 private _nextTokenId = 1;

    /**
     * @dev Mock implementation of mintDomainNFT
     */
    function mintDomainNFT(string memory domain, address owner)
        external
        payable
        override
        returns (uint256)
    {
        require(bytes(domain).length > 0, "Invalid domain");
        require(owner != address(0), "Invalid owner");

        uint256 tokenId = _nextTokenId++;

        DomainInfo memory domainInfo = DomainInfo({
            domain: domain,
            originalOwner: owner,
            currentOwner: owner,
            mintedAt: block.timestamp,
            expiresAt: block.timestamp + 365 days,
            renewalCount: 0,
            isActive: true
        });

        _mockDomainInfo[tokenId] = domainInfo;
        _mockDomainTokens[domain] = tokenId;
        _mockTokenOwners[tokenId] = owner;
        _mockUserDomains[owner].push(domain);

        emit DomainNFTMinted(tokenId, domain, owner);

        return tokenId;
    }

    /**
     * @dev Mock implementation of renewDomain
     */
    function renewDomain(string memory domain) external payable override {
        uint256 tokenId = _mockDomainTokens[domain];
        require(tokenId != 0, "Domain not found");
        require(_mockTokenOwners[tokenId] == msg.sender, "Not domain owner");

        DomainInfo storage info = _mockDomainInfo[tokenId];
        info.expiresAt += 365 days;
        info.renewalCount++;

        emit DomainNFTRenewed(domain, info.expiresAt);
    }

    /**
     * @dev Mock implementation of transferDomainNFT
     */
    function transferDomainNFT(string memory domain, address to) external override {
        uint256 tokenId = _mockDomainTokens[domain];
        require(tokenId != 0, "Domain not found");
        require(_mockTokenOwners[tokenId] == msg.sender, "Not domain owner");
        require(to != address(0), "Invalid recipient");

        address from = msg.sender;
        _mockTokenOwners[tokenId] = to;
        _mockDomainInfo[tokenId].currentOwner = to;

        // Update user domain lists
        _removeUserDomain(from, domain);
        _mockUserDomains[to].push(domain);

        emit DomainNFTTransferred(domain, from, to);
    }

    /**
     * @dev Mock implementation of burnDomainNFT
     */
    function burnDomainNFT(string memory domain) external override {
        uint256 tokenId = _mockDomainTokens[domain];
        require(tokenId != 0, "Domain not found");

        address owner = _mockTokenOwners[tokenId];
        _removeUserDomain(owner, domain);

        delete _mockDomainInfo[tokenId];
        delete _mockDomainTokens[domain];
        delete _mockTokenOwners[tokenId];

        emit DomainNFTBurned(tokenId, domain);
    }

    /**
     * @dev Mock implementation of getDomainInfo
     */
    function getDomainInfo(uint256 tokenId)
        external
        view
        override
        returns (
            string memory domain,
            address originalOwner,
            address currentOwner,
            uint256 mintedAt,
            uint256 expiresAt,
            uint256 renewalCount,
            bool isActive
        )
    {
        DomainInfo memory info = _mockDomainInfo[tokenId];
        return (
            info.domain,
            info.originalOwner,
            info.currentOwner,
            info.mintedAt,
            info.expiresAt,
            info.renewalCount,
            info.isActive
        );
    }

    /**
     * @dev Mock implementation of getTokenByDomain
     */
    function getTokenByDomain(string memory domain) external view override returns (uint256) {
        return _mockDomainTokens[domain];
    }

    /**
     * @dev Mock implementation of isDomainRegistered
     */
    function isDomainRegistered(string memory domain) external view override returns (bool) {
        return _mockDomainTokens[domain] != 0;
    }

    /**
     * @dev Mock implementation of isDomainExpired
     */
    function isDomainExpired(string memory domain) external view override returns (bool) {
        uint256 tokenId = _mockDomainTokens[domain];
        if (tokenId == 0) return false;
        return _mockDomainInfo[tokenId].expiresAt < block.timestamp;
    }

    /**
     * @dev Mock implementation of getUserDomains
     */
    function getUserDomains(address user) external view override returns (string[] memory) {
        return _mockUserDomains[user];
    }

    /**
     * @dev Mock implementation of getDomainOwner
     */
    function getDomainOwner(string memory domain) external view override returns (address) {
        uint256 tokenId = _mockDomainTokens[domain];
        if (tokenId == 0) return address(0);
        return _mockTokenOwners[tokenId];
    }

    /**
     * @dev Mock implementation of batchMintDomains
     */
    function batchMintDomains(
        string[] memory domains,
        address[] memory owners
    ) external payable override returns (uint256[] memory) {
        require(domains.length == owners.length, "Array length mismatch");

        uint256[] memory tokenIds = new uint256[](domains.length);
        for (uint256 i = 0; i < domains.length; i++) {
            tokenIds[i] = this.mintDomainNFT(domains[i], owners[i]);
        }

        return tokenIds;
    }

    /**
     * @dev Mock implementation of batchRenewDomains
     */
    function batchRenewDomains(string[] memory domains) external payable override {
        for (uint256 i = 0; i < domains.length; i++) {
            this.renewDomain(domains[i]);
        }
    }

    /**
     * @dev Mock implementation of burnExpiredDomains
     */
    function burnExpiredDomains(string[] memory domains) external override {
        for (uint256 i = 0; i < domains.length; i++) {
            if (this.isDomainExpired(domains[i])) {
                this.burnDomainNFT(domains[i]);
            }
        }
    }

    /**
     * @dev Mock implementation of getHTSPrecompile
     */
    function getHTSPrecompile() external pure override returns (address) {
        return address(0x167); // Mock HTS precompile address
    }

    /**
     * @dev Mock implementation of getDomainNFTTokenId
     */
    function getDomainNFTTokenId() external pure override returns (address) {
        return address(0x1234567890123456789012345678901234567890); // Mock token address
    }

    /**
     * @dev Mock implementation of emergencyPause
     */
    function emergencyPause() external override {
        // Mock implementation - in real contract this would pause functionality
    }

    /**
     * @dev Mock implementation of emergencyUnpause
     */
    function emergencyUnpause() external override {
        // Mock implementation - in real contract this would unpause functionality
    }

    /**
     * @dev Mock implementation of withdrawFees
     */
    function withdrawFees() external override {
        // Mock implementation - in real contract this would withdraw accumulated fees
    }

    /**
     * @dev Mock implementation of getVersion
     */
    function getVersion() external pure override returns (string memory) {
        return "1.0.0-mock";
    }

    /**
     * @dev Helper function to remove domain from user's list
     */
    function _removeUserDomain(address user, string memory domain) internal {
        string[] storage userDomains = _mockUserDomains[user];
        for (uint256 i = 0; i < userDomains.length; i++) {
            if (keccak256(bytes(userDomains[i])) == keccak256(bytes(domain))) {
                userDomains[i] = userDomains[userDomains.length - 1];
                userDomains.pop();
                break;
            }
        }
    }
}