// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../IUBeURegistry.sol";

/**
 * @title MockUBeURegistry
 * @dev Mock implementation of IUBeURegistry for testing and development
 * @notice This contract provides mock implementations of all IUBeURegistry functions
 * for use in development, testing, and integration examples.
 */
contract MockUBeURegistry is IUBeURegistry {
    // DomainRecord struct (redefined for mock implementation)
    struct DomainRecord {
        string domain;
        string did;
        address owner;
        uint256 registeredAt;
        uint256 verifiedAt;
        uint256 expiresAt;
        bool isActive;
    }

    // Mock storage
    mapping(string => DomainRecord) private _mockDomainRecords;
    mapping(string => string) private _mockDidToPrimaryDomain;
    mapping(address => string[]) private _mockUserDomains;

    /**
     * @dev Mock implementation of registerDomain
     */
    function registerDomain(
        string memory domain,
        string memory did,
        address owner
    ) external payable override {
        require(bytes(domain).length > 0, "Invalid domain");
        require(bytes(did).length > 0, "Invalid DID");
        require(owner != address(0), "Invalid owner");
        require(!_mockDomainRecords[domain].isActive, "Domain already registered");

        DomainRecord memory record = DomainRecord({
            domain: domain,
            did: did,
            owner: owner,
            registeredAt: block.timestamp,
            verifiedAt: 0,
            expiresAt: block.timestamp + 365 days,
            isActive: true
        });

        _mockDomainRecords[domain] = record;
        _mockDidToPrimaryDomain[did] = domain;
        _mockUserDomains[owner].push(domain);

        emit DomainRegistered(domain, did, owner);
    }

    /**
     * @dev Mock implementation of verifyDomain
     */
    function verifyDomain(string memory domain, string memory did) external override {
        require(_mockDomainRecords[domain].isActive, "Domain not registered");
        require(_mockDomainRecords[domain].owner == msg.sender, "Not domain owner");
        require(
            keccak256(bytes(_mockDomainRecords[domain].did)) == keccak256(bytes(did)),
            "DID mismatch"
        );

        _mockDomainRecords[domain].verifiedAt = block.timestamp;

        emit DomainVerified(domain, did, block.timestamp);
    }

    /**
     * @dev Mock implementation of resolveDomain
     */
    function resolveDomain(string memory domain) external view override returns (string memory) {
        require(_mockDomainRecords[domain].isActive, "Domain not registered");
        return _mockDomainRecords[domain].did;
    }

    /**
     * @dev Mock implementation of anchorDIDDocument
     */
    function anchorDIDDocument(string memory did, bytes32 documentHash) external override {
        string memory primaryDomain = _mockDidToPrimaryDomain[did];
        require(bytes(primaryDomain).length > 0, "DID not registered");
        require(_mockDomainRecords[primaryDomain].owner == msg.sender, "Not DID owner");

        emit DIDAnchored(did, documentHash, block.timestamp);
    }

    /**
     * @dev Mock implementation of renewDomain
     */
    function renewDomain(string memory domain) external payable override {
        require(_mockDomainRecords[domain].isActive, "Domain not registered");
        require(_mockDomainRecords[domain].owner == msg.sender, "Not domain owner");

        DomainRecord storage record = _mockDomainRecords[domain];
        record.expiresAt += 365 days;

        emit DomainRenewed(domain, record.expiresAt);
    }

    /**
     * @dev Mock implementation of getDomainRecord
     */
    function getDomainRecord(string memory domain)
        external
        view
        override
        returns (
            string memory domainName,
            string memory did,
            address owner,
            uint256 registeredAt,
            uint256 verifiedAt,
            uint256 expiresAt,
            bool isActive
        )
    {
        DomainRecord memory record = _mockDomainRecords[domain];
        return (
            record.domain,
            record.did,
            record.owner,
            record.registeredAt,
            record.verifiedAt,
            record.expiresAt,
            record.isActive
        );
    }

    /**
     * @dev Mock implementation of isDomainVerified
     */
    function isDomainVerified(string memory domain) external view override returns (bool) {
        return _mockDomainRecords[domain].verifiedAt > 0;
    }

    /**
     * @dev Mock implementation of getUserDomains
     */
    function getUserDomains(address user) external view override returns (string[] memory) {
        return _mockUserDomains[user];
    }

    /**
     * @dev Mock implementation of getDIDPrimaryDomain
     */
    function getDIDPrimaryDomain(string memory did) external view override returns (string memory) {
        return _mockDidToPrimaryDomain[did];
    }

    /**
     * @dev Mock implementation of batchRegisterDomains
     */
    function batchRegisterDomains(
        string[] memory domains,
        string[] memory dids,
        address[] memory owners
    ) external payable override {
        require(domains.length == dids.length && dids.length == owners.length, "Array length mismatch");

        for (uint256 i = 0; i < domains.length; i++) {
            this.registerDomain(domains[i], dids[i], owners[i]);
        }
    }

    /**
     * @dev Mock implementation of getExchangeRate
     */
    function getExchangeRate() external pure override returns (uint256, uint256) {
        // Mock exchange rate: 1 HBAR = 10 USD cents
        return (100000000, 10000000); // tinybarsToTinycents, tinycentsToTinybars
    }

    /**
     * @dev Mock implementation of generateRandomNumber
     */
    function generateRandomNumber() external view override returns (uint256) {
        // Mock random number generation
        return uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 1000000;
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
}