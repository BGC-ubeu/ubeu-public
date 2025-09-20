// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../IUBAuthToken.sol";

/**
 * @title MockUBAuthToken
 * @dev Mock implementation of IUBAuthToken for testing and development
 * @notice This contract provides mock implementations of all IUBAuthToken functions
 * for use in development, testing, and integration examples.
 */
contract MockUBAuthToken is IUBAuthToken {
    // Identity struct (redefined for mock implementation)
    struct Identity {
        address userAddress;
        string did;
        string primaryDomain;
        uint256 mintedAt;
        uint256 lastUpdated;
        int64 serialNumber;
        bool isActive;
    }

    // Mock storage
    mapping(address => int64) private _mockUserTokens;
    mapping(int64 => address) private _mockTokenUsers;
    mapping(string => address) private _mockDidToUser;
    mapping(address => string) private _mockUserToDID;

    int64 private _nextSerialNumber = 1;

    /**
     * @dev Mock implementation of mintUBAuth
     */
    function mintUBAuth(
        address user,
        string memory did,
        string memory primaryDomain
    ) external override returns (int64) {
        require(user != address(0), "Invalid user address");
        require(bytes(did).length > 0, "Invalid DID");
        require(_mockUserTokens[user] == int64(0), "User already has UBAuth token");

        int64 serialNumber = _nextSerialNumber++;

        _mockUserTokens[user] = serialNumber;
        _mockTokenUsers[serialNumber] = user;
        _mockDidToUser[did] = user;
        _mockUserToDID[user] = did;

        emit UBAuthTokenCreated(user, did, serialNumber);

        return serialNumber;
    }

    /**
     * @dev Mock implementation of burnUBAuth
     */
    function burnUBAuth(address user) external override {
        int64 serialNumber = _mockUserTokens[user];
        require(serialNumber != int64(0), "User does not have UBAuth token");

        string memory did = _mockUserToDID[user];

        delete _mockUserTokens[user];
        delete _mockTokenUsers[serialNumber];
        delete _mockDidToUser[did];
        delete _mockUserToDID[user];

        emit UBAuthTokenBurned(user, serialNumber);
    }

    /**
     * @dev Mock implementation of updateIdentity
     */
    function updateIdentity(
        address user,
        string memory newDID,
        string memory newPrimaryDomain
    ) external override {
        require(_mockUserTokens[user] != int64(0), "User does not have UBAuth token");
        require(bytes(newDID).length > 0, "Invalid DID");

        string memory oldDID = _mockUserToDID[user];

        _mockUserToDID[user] = newDID;
        _mockDidToUser[newDID] = user;
        delete _mockDidToUser[oldDID];

        emit IdentityUpdated(user, oldDID, newDID);
    }

    /**
     * @dev Mock implementation of getIdentity
     */
    function getIdentity(address user)
        external
        view
        override
        returns (
            address userAddress,
            string memory did,
            string memory primaryDomain,
            uint256 mintedAt,
            uint256 lastUpdated,
            int64 serialNumber,
            bool isActive
        )
    {
        int64 userSerial = _mockUserTokens[user];
        require(userSerial != int64(0), "User does not have UBAuth token");

        return (
            user,
            _mockUserToDID[user],
            "", // primaryDomain would be stored in real implementation
            block.timestamp - 86400, // Mock minted 1 day ago
            block.timestamp, // Mock last updated now
            userSerial,
            true
        );
    }

    /**
     * @dev Mock implementation of getTokenByUser
     */
    function getTokenByUser(address user) external view override returns (int64) {
        return _mockUserTokens[user];
    }

    /**
     * @dev Mock implementation of getUserByDID
     */
    function getUserByDID(string memory did) external view override returns (address) {
        return _mockDidToUser[did];
    }

    /**
     * @dev Mock implementation of getDIDByUser
     */
    function getDIDByUser(address user) external view override returns (string memory) {
        return _mockUserToDID[user];
    }

    /**
     * @dev Mock implementation of hasUBAuth
     */
    function hasUBAuth(address user) external view override returns (bool) {
        return _mockUserTokens[user] != int64(0);
    }

    /**
     * @dev Mock implementation of getTokenBalance
     */
    function getTokenBalance(address account) external view override returns (int64) {
        return _mockUserTokens[account] != int64(0) ? int64(1) : int64(0);
    }

    /**
     * @dev Mock implementation of batchMintUBAuth
     */
    function batchMintUBAuth(
        address[] memory users,
        string[] memory dids,
        string[] memory domains
    ) external override returns (int64[] memory) {
        require(users.length == dids.length && dids.length == domains.length, "Array length mismatch");

        int64[] memory serialNumbers = new int64[](users.length);
        for (uint256 i = 0; i < users.length; i++) {
            serialNumbers[i] = this.mintUBAuth(users[i], dids[i], domains[i]);
        }

        return serialNumbers;
    }

    /**
     * @dev Mock implementation of getUBAuthTokenId
     */
    function getUBAuthTokenId() external pure override returns (address) {
        return address(0x9876543210987654321098765432109876543210); // Mock token address
    }

    /**
     * @dev Mock implementation of isNonTransferable
     */
    function isNonTransferable() external pure override returns (bool) {
        return true; // UBAuth tokens are always non-transferable
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
     * @dev Mock implementation of getVersion
     */
    function getVersion() external pure override returns (string memory) {
        return "1.0.0-mock";
    }
}