// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IDomainNFT - Domain NFT Interface
 * @dev Interface for UBeU Domain NFT contract
 * @notice Defines the standard interface for domain NFT operations
 */
interface IDomainNFT {
    // Events
    event DomainNFTMinted(uint256 indexed tokenId, string indexed domain, address indexed owner);
    event DomainNFTRenewed(string indexed domain, uint256 newExpiry);
    event DomainNFTBurned(uint256 indexed tokenId, string indexed domain);
    event DomainNFTTransferred(string indexed domain, address indexed from, address indexed to);

    // Core Domain Operations
    function mintDomainNFT(string memory domain, address owner) external payable returns (uint256);
    function renewDomain(string memory domain) external payable;
    function transferDomainNFT(string memory domain, address to) external;
    function burnDomainNFT(string memory domain) external;

    // Query Functions
    function getDomainInfo(uint256 tokenId) external view returns (
        string memory domain,
        address originalOwner,
        address currentOwner,
        uint256 mintedAt,
        uint256 expiresAt,
        uint256 renewalCount,
        bool isActive
    );

    function getTokenByDomain(string memory domain) external view returns (uint256);
    function isDomainRegistered(string memory domain) external view returns (bool);
    function isDomainExpired(string memory domain) external view returns (bool);
    function getUserDomains(address user) external view returns (string[] memory);
    function getDomainOwner(string memory domain) external view returns (address);

    // Batch Operations
    function batchMintDomains(
        string[] memory domains,
        address[] memory owners
    ) external payable returns (uint256[] memory);

    function batchRenewDomains(string[] memory domains) external payable;
    function burnExpiredDomains(string[] memory domains) external;

    // Utility Functions
    function getHTSPrecompile() external pure returns (address);
    function getDomainNFTTokenId() external view returns (address);

    // Emergency Functions
    function emergencyPause() external;
    function emergencyUnpause() external;
    function withdrawFees() external;

    // Metadata
    function getVersion() external pure returns (string memory);
}