// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IUBAuthToken - UBAuth Token Interface
 * @dev Interface for UBeU UBAuth token contract
 * @notice Defines the standard interface for UBAuth token operations
 * @dev UBAuth tokens are NON-TRANSFERABLE by design to ensure identity integrity
 */
interface IUBAuthToken {
    // Events
    event UBAuthTokenCreated(address indexed user, string indexed did, int64 serialNumber);
    event UBAuthTokenBurned(address indexed user, int64 serialNumber);
    event IdentityUpdated(address indexed user, string oldDID, string newDID);

    // Core Token Operations
    function mintUBAuth(address user, string memory did, string memory primaryDomain) external returns (int64);
    function burnUBAuth(address user) external;
    function updateIdentity(address user, string memory newDID, string memory newPrimaryDomain) external;

    // Query Functions
    function getIdentity(address user) external view returns (
        address userAddress,
        string memory did,
        string memory primaryDomain,
        uint256 mintedAt,
        uint256 lastUpdated,
        int64 serialNumber,
        bool isActive
    );

    function getTokenByUser(address user) external view returns (int64);
    function getUserByDID(string memory did) external view returns (address);
    function getDIDByUser(address user) external view returns (string memory);
    function hasUBAuth(address user) external view returns (bool);
    function getTokenBalance(address account) external view returns (int64);

    // Batch Operations
    function batchMintUBAuth(
        address[] memory users,
        string[] memory dids,
        string[] memory domains
    ) external returns (int64[] memory);

    // Utility Functions
    function getUBAuthTokenId() external view returns (address);
    function isNonTransferable() external pure returns (bool);

    // Emergency Functions
    function emergencyPause() external;
    function emergencyUnpause() external;

    // Metadata
    function getVersion() external pure returns (string memory);
}