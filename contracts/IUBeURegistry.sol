// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IUBeURegistry - UBeU Registry Interface
 * @dev Interface for UBeU Registry contract
 * @notice Defines the standard interface for DID-to-domain mappings and identity anchoring
 */
interface IUBeURegistry {
    // Events
    event DomainRegistered(string indexed domain, string indexed did, address indexed owner);
    event DomainVerified(string indexed domain, string indexed did, uint256 timestamp);
    event DIDAnchored(string indexed did, bytes32 documentHash, uint256 timestamp);
    event DomainRenewed(string indexed domain, uint256 newExpiry);

    // Core Registry Operations
    function registerDomain(string memory domain, string memory did, address owner) external payable;
    function verifyDomain(string memory domain, string memory did) external;
    function resolveDomain(string memory domain) external view returns (string memory);
    function anchorDIDDocument(string memory did, bytes32 documentHash) external;
    function renewDomain(string memory domain) external payable;

    // Query Functions
    function getDomainRecord(string memory domain) external view returns (
        string memory domainName,
        string memory did,
        address owner,
        uint256 registeredAt,
        uint256 verifiedAt,
        uint256 expiresAt,
        bool isActive
    );

    function isDomainVerified(string memory domain) external view returns (bool);
    function getUserDomains(address user) external view returns (string[] memory);
    function getDIDPrimaryDomain(string memory did) external view returns (string memory);

    // Batch Operations
    function batchRegisterDomains(
        string[] memory domains,
        string[] memory dids,
        address[] memory owners
    ) external payable;

    // Hedera Integration Functions
    function getExchangeRate() external returns (uint256, uint256);
    function generateRandomNumber() external returns (uint256);

    // Emergency Functions
    function emergencyPause() external;
    function emergencyUnpause() external;
    function withdrawFees() external;

    // Metadata
    function getVersion() external pure returns (string memory);
}