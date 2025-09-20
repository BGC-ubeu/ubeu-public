# @hiero-did-sdk/anoncreds

This package provides implementation of Hedera AnonCreds Registry, following [Hedera AnonCreds Method specification](https://hiero-ledger.github.io/hedera-anoncreds-method/).
It enables the management of AnonCreds resources using Hedera Consensus Service (HCS) as Verifiable Data Registry (VDR) with support for revocation.

## Features

- AnonCreds VDR: Register and resolve AnonCreds objects using HCS as highly-performant and cost-effective VDR.
- Revocation Support: Comprehensive support for AnonCreds revocation through effective approach for revocation registry management.
- TypeScript Support: Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/anoncreds
```

## Usage

Learn how to manage anoncreds registry on the Hedera network in the [Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/anoncreds-guide.html).
For more detailed examples and usage scenarios, refer to the [AnonCreds Package Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/anoncreds-guide.html).

## API Reference

See detailed API specifications and available methods in the [API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/anoncreds-api.html).


## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.
- [Hedera AnonCreds Method](https://hiero-ledger.github.io/hedera-anoncreds-method/) - The specification for Hedera AnonCreds Method implemented in thus package.
- [Hedera Consensus Service](https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service) - Documentation for the Hedera Consensus Service used by this package.

# @hiero-did-sdk/cache

This package provides caching utilities for the Hiero DID SDK JS.
It implements Least Recently Used (LRU) memory cache to improve performance by reducing redundant operations and network calls.

## Features

- **LRU Memory Cache:** Implements an efficient Least Recently Used (LRU) caching strategy.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/cache
```

## Usage

Learn how to use the LRUMemoryCache in the [Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/cache-guide.html).

## API Reference

See detailed API specifications and available methods in the [API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/cache-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [LRU Cache Algorithm](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)) - Information about the Least Recently Used cache replacement policy implemented in this package.

# @hiero-did-sdk/client

This package provides a flexible and configurable approach to managing Hedera SDK Clients with different network configurations.

## Features

- **Hedera Client Management:** Simplifies the creation and configuration of Hedera clients.
- **Multi-Network Support:** Configure and manage clients for multiple Hedera networks simultaneously.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/client
```

## Usage

Learn how to use the HederaClientService in the [Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/client-guide.html).

## API Reference

See detailed API specifications and available methods in the [API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/client-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/core

This package forms the foundation of the Hiero DID SDK. It provides essential interfaces, utilities, and validation tools for working with Decentralized Identifiers (DIDs) on the Hedera network.

## Features

- **Interfaces:** Exports core interfaces for DID operations and Hedera interactions.
- **Key Management:** Provides utilities for handling and transforming cryptographic keys in various formats.
- **DID Validation:** Ensures DIDs comply with the specification using the `isHederaDID` function.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/core
```

## Usage

Learn how to use the core interfaces and utilities for DID operations in the [Core Package Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/core-guide.html).

## API Reference

Learn more in the [Core API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/core-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/crypto

This package provides cryptographic utilities for the Hiero DID SDK JS.

## Features

- **SHA-256 Hashing:** Provides a simple API for generating SHA-256 hashes.
- **Cross-Platform Compatibility:** Automatically detects and uses the appropriate cryptographic implementation based on the runtime environment.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/crypto
```

## Usage

Learn how to use the Crypto module in the [Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/crypto-guide.html).

## API Reference

See detailed API specifications and available methods in the [API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/crypto-api.html).


## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/hcs

This package provides a comprehensive interface for interacting with Hedera Consensus Service (HCS) within the Hiero DID SDK JS.
It offers a set of services for managing topics, submitting and retrieving messages, and handling files through HCS.

## Features

- **HCS Topics Management:** Provides capabilities for creating, updating and deleing HCS Topics.
- **HCS Messages Management:** Submit and retrieve HCS messages.
- **HCS-1 standard support:** Submit and retrieve files using HCS as a storage layer according to HCS-1 Standard.
- **Caching Support:** Improve performance with optional caching of HCS messages and Topics info.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/hcs
```

## Usage

Learn how to use:
- [HederaHcsService Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-service-guide.html)
- [HcsTopicService Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-topic-service-guide.html)
- [HcsMessageService Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-message-service-guide.html)
- [HcsFileService Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-file-service-guide.html)

## API Reference

See detailed API specifications and available methods here:
- [HederaHcsService API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-service-api.html).
- [HcsTopicService API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-topic-service-api.html)
- [HcsMessageService API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-message-service-api.html)
- [HcsFileService API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/hcs-file-service-api.html)

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.
- [Hedera Consensus Service](https://docs.hedera.com/hedera/sdks-and-apis/sdks/consensus-service) - Documentation for the Hedera Consensus Service used by this package.

# @hiero-did-sdk/lifecycle

This package provides a lifecycle management system for orchestrating complex asynchronous operations within the Hiero DID SDK.
It enables developers to define sequences of steps, handle asynchronous actions, manage signatures, and control the flow of execution with features like pausing and resuming. By streamlining these processes, it simplifies the development of robust and reliable DID-related applications.

## Features

- **Step-by-Step Execution:** Define a clear sequence of asynchronous steps for DID operations.
- **Callback Integration:** Incorporate custom callback functions at any point in the lifecycle.
- **Signature Handling:** Include signature generation and verification steps seamlessly.
- **Pause/Resume Functionality:** Introduce pauses for manual intervention or external interactions, and resume execution when ready.
- **Error Handling:** Implement robust error handling with catch steps to gracefully handle exceptions.
- **Flexible Builder Pattern:** Provides a fluent API for building and configuring lifecycles with ease.
- **TypeScript Support:** Built with TypeScript for enhanced developer experience and type safety.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/lifecycle
```

## Usage

Learn how to use the lifecycle management system to orchestrate complex asynchronous operations for DID management in the [Lifecycle Management Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/lifecycle-guide.html).

## API Reference

Learn more in the [Lifecycle Management API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/lifecycle-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/messages

This package provides a comprehensive set of classes for constructing and handling DID Messages within the Hiero DID SDK. These DID Messages facilitate various DID operations on the Hedera network, such as creating, updating, and deactivating DIDs, as well as managing their associated keys and services.

## Features

- **DID Message Classes:** Offers a variety of DID Message classes for different DID operations.
- **Serialization and Deserialization:** Provides methods for serializing DID Messages to byte arrays and deserializing them back into DID Message objects.
- **Lifecycle Integration:** Seamlessly integrates with the `@hiero-did-sdk/lifecycle` package to define and execute DID Message lifecycles.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and type safety.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/messages
```

## Usage

Learn how to use the DID Message classes to construct and handle DID Messages for various DID operations in the [Messages Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/messages-guide.html).

## API Reference

Learn more in the [Messages API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/messages-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/publisher-internal

This package provides the `Publisher` class, a core component of the Hiero DID SDK.
It offers a standardized way to submit and execute transactions on the Hedera network, simplifying the process of interacting with the Hedera Consensus Service (HCS). The `Publisher` class adheres to the `Publisher` interface, ensuring consistency and interoperability within the Hedera DID ecosystem.

## Features

- **Transaction Submission:** Submits transactions to the Hedera network for DID operations.
- **Transaction Execution:** Executes transactions on the Hedera network, ensuring reliable processing.
- **Network Interaction:** Provides a streamlined interface for interacting with the Hedera network.
- **Network Detection:** Automatically detects the Hedera network environment (mainnet, testnet).
- **Error Handling:** Includes robust error handling for transaction failures and network issues.
- **Extensibility:** Designed for extensibility to support future Hedera network features.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and type safety.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/publisher-internal
```

## Usage

Learn how to use the `Publisher` class to submit transactions to the Hedera network in the [Publisher Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/publisher-guide.html).

## API Reference

Learn more in the [`Publisher` API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/publisher-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/resolver

This package provides the `resolveDID` function, a core component of the Hiero DID SDK. It resolves Decentralized Identifiers (DIDs) registered on the Hedera network to their corresponding DID Documents. These documents contain crucial information about the DID subject, such as public keys and authentication mechanisms, which are cryptographically verified by the `resolveDID` function. By adhering to the DID specification and leveraging the Hedera Consensus Service (HCS), `resolveDID` ensures secure and verifiable DID resolution, enabling a wide range of DID operations.

## Features

- **DID Resolution:** Resolves Hedera DIDs to their corresponding DID Documents in various formats (JSON, JSON-LD, DID Resolution).
- **Cryptographic Verification:** Verifies the authenticity and integrity of DID Documents.
- **Hedera Network Support:** Supports resolving DIDs on the Hedera mainnet and testnet.
- **Error Handling:** Provides robust error handling for invalid DIDs, network issues, and unsupported formats.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and type safety.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/resolver
```

## Usage

Learn how to use the `resolveDID` function to resolve DID Documents in the [resolveDID Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/resolveDID-guide.html).

## API Reference

Learn more in the [`resolveDID` API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/resolveDID-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.


# @hiero-did-sdk/registrar

This package provides the core functions for registering and managing Decentralized Identifiers (DIDs) on the Hedera network within the Hiero DID SDK.
It offers a streamlined interface for creating, updating, and deactivating DIDs, ensuring secure and verifiable DID operations.

Specifically, this package provides the `createDID`, `updateDID`, and `deactivateDID` functions. These functions allow you to:

- **`createDID`:** Generate and register a new DID on the Hedera network.
- **`updateDID`:** Update an existing DID by modifying its associated DID Document.
- **`deactivateDID`:** Deactivate a DID, effectively revoking it.

These functions interact with the Hedera Consensus Service (HCS) to ensure that DID operations are securely and verifiably recorded on the Hedera network. By adhering to the DID specification, these functions enable interoperable and standardized DID management.

## Features

- **DID Creation:** Generates and registers new DIDs on the Hedera network with customizable options.
- **DID Updating:** Updates existing DIDs, allowing modifications to DID Documents.
- **DID Deactivation:** Deactivates registered DIDs on the Hedera network, revoking their validity.
- **Key Management:** Supports various key types and formats for DID controllers and verification methods.
- **DID Document Generation:** Automatically generates DID Documents conforming to the DID specification.
- **Hedera Network Support:** Supports DID operations on the Hedera mainnet and testnet.
- **Error Handling:** Provides robust error handling for invalid input, network issues, and other potential problems.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and type safety.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/registrar
```

## Usage

This package provides three main functions for managing DIDs: `createDID`, `updateDID`, and `deactivateDID`.

Learn how to use the `createDID` function to create a new DID in the [`createDID` Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/createDID-guide.html).

Learn how to use the `updateDID` function to update an existing DID in the [`updateDID` Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/updateDID-guide.html).

Learn how to use the `deactivateDID` function to deactivate a DID in the [`deactivateDID` Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/deactivateDID-guide.html).

## API Reference

Learn more in the [`createDID` API reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/createDID-api.html).

Learn more in the [`updateDID` API reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/updateDID-api.html).

Learn more in the [`deactivateDID` API reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/deactivateDID-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/signer-internal

This package provides the `Signer` class, a core component of the Hiero DID SDK. It enables secure key management and digital signature generation for Decentralized Identifiers (DIDs) using the ED25519 algorithm. The `Signer` class adheres to the `Signer` interface, providing a standardized way to handle cryptographic operations within the Hedera DID ecosystem.

## Features

- **Key Management:** Generate ED25519 key pairs or initialize from existing keys, providing flexibility in key management workflows.
- **Signing and Verification:** Efficiently sign messages and verify signatures, ensuring data integrity and authenticity within your DID implementations.
- **Compatibility:** Supports both raw and DER-formatted keys for seamless integration with different systems and libraries.
- **Security:** Designed with security best practices to safeguard your private keys and ensure the reliability of signature operations.
- **Hedera Network Support:** Supports DID creation on the Hedera mainnet and testnet.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/signer-internal
```

## Usage

Learn how to use the `Signer` class to generate key pairs, sign messages, and verify signatures in the [Signer Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/signer-guide.html).

## API Reference

Learn more in the [`Signer` API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/signer-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/verifier-internal

This package provides the `Verifier` class, a core component of the Hiero DID SDK. It enables digital signature verification for Decentralized Identifiers (DIDs) using the ED25519 algorithm. The `Verifier` class adheres to the `Verifier` interface, providing a standardized way to handle cryptographic operations within the Hedera DID ecosystem.

## Features

- **Verification:** Efficiently verify signatures, ensuring data integrity and authenticity within your DID implementations.
- **Compatibility:** Supports both raw and multibase-formatted keys for seamless integration with different systems and libraries.
- **Security:** Designed with security best practices to safeguard your private keys and ensure the reliability of signature operations.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/verifier-internal
```

## Usage

Learn how to use the `Verifier` class to verify signatures in the [Verifier Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/verifier-guide.html).

## API Reference

Learn more in the [`Verifier` API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/verifier-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hiero DID SDK, containing the complete source code and documentation.
- [Hedera JavaScript SDK](https://github.com/hashgraph/hedera-sdk-js) - The official Hedera JavaScript SDK, used for interacting with the Hedera network.

# @hiero-did-sdk/zstd

This package provides Zstandard (Zstd) compression utilities for the Hiero DID SDK JS.

## Features

- **Zstd Compression and Decompression:** Provides a simple API for compressing and decompressing data using the Zstandard algorithm.
- **Cross-Platform Compatibility:** Automatically detects and uses the appropriate Zstd implementation based on the runtime environment.
- **TypeScript Support:** Built with TypeScript to enhance developer experience and code maintainability.

## Installation

Install the package via npm:

```bash
npm install @hiero-did-sdk/zstd
```

## Usage

Learn how to use the Zstd module in the [Usage Guide](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/zstd-guide.html).

## API Reference

See detailed API specifications and available methods in the [API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/zstd-api.html).


## API Reference

Learn more in the [Zstd API Reference](https://hiero-ledger.github.io/hiero-did-sdk-js/documentation/latest/03-implementation/components/zstd-api.html).

## Running Tests

Unit tests are included to validate functionality. Run tests with:

```bash
npm test
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## References

- [Hiero DID SDK](https://github.com/hiero-ledger/hiero-did-sdk-js) - The official repository for the Hashgraph DID SDK, containing the complete source code and documentation.
- [Zstandard](https://facebook.github.io/zstd/) - The official Zstandard website, providing information about the compression algorithm used in this package.



# Introduction and Goals
**Executive Summary**
This proposal outlines the development of an enhanced Hiero DID SDK (Decentralized Identifier Software Development Kit) to address key limitations in the current implementation. This new SDK will empower developers to build secure, high-performance, and interoperable decentralized applications (dApps) on the Hedera network. By resolving performance bottlenecks, enhancing security, improving interoperability, and fixing critical bugs, the SDK will provide a robust foundation for decentralized identity management, ensuring scalability, reliability, and seamless integration within the Hedera ecosystem.

**Achievements**:
- Community-Driven Design: The new SDK has been shaped by active engagement with the Hedera developer community, ensuring it aligns with the needs and expectations of the ecosystem.

- Comprehensive Solution Design: The new SDK offers a robust solution that incorporates essential features to address the limitations of the current SDK and significantly improve performance, security, and flexibility.

**Goals**:
- Unlock High Performance: By enabling asynchronous cryptographic operations, the SDK will allow the development of applications that are both responsive and scalable, even under high-demand scenarios.

- Maximize Security: Flexible key management options, including External Secret Mode and Client-managed Secret Mode, will give developers the tools to implement robust security measures tailored to their specific application needs.

- Facilitate Seamless Integration: Multibase encoding will be integrated to enhance interoperability, ensuring seamless communication between decentralized applications and a wide range of systems and technologies, both within and outside the blockchain space.

- Ensure Reliability: By addressing critical bugs identified in the current SDK, including issues with message verification and signature validation, the new SDK will maintain stability, reliability, and data integrity, providing a trusted foundation for decentralized applications.

- Foster Open Collaboration: An open-source reference implementation and comprehensive documentation will encourage community contributions and feedback, fostering a collaborative environment across the Hedera ecosystem.

**Key Components**
To achieve these ambitious goals, the enhanced Hiero DID SDK will incorporate the following key components:

- Asynchronous Cryptographic Operations: The SDK will implement asynchronous cryptographic operations to eliminate performance bottlenecks, improving the responsiveness and efficiency of applications, particularly under high-load conditions. This will enable dApps to handle a larger volume of transactions with reduced latency.

- Flexible Key Management: The SDK will support both External Secret Mode and Client-managed Secret Mode, providing developers with the flexibility to choose the most appropriate key management strategy for their specific security and operational needs.

- Multibase Encoding: Integrating multibase encoding will enhance interoperability by allowing the SDK to seamlessly communicate with a diverse range of systems and technologies. This will enable broader adoption and integration of Hedera-based decentralized identities.

- Critical Bug Fixes: Addressing critical bugs, including issues with message verification, signature validation, and topic subscription management, will ensure the stability and integrity of decentralized applications built on Hedera. This focus on reliability will foster trust in the SDK and the dApps built upon it.

- Comprehensive Reference Implementation: The SDK will include an open-source reference implementation, complete with detailed documentation and robust test coverage (targeting 80% across unit, integration, security, and performance tests). This will provide developers with clear guidance, best practices, and confidence in the SDK’s quality and reliability.

**Conclusion**
The enhanced Hiero DID SDK represents a significant step forward in decentralized identity management on the Hedera network. By addressing critical challenges in performance, security, and interoperability, the new SDK will provide developers with the tools they need to build innovative, secure, and scalable decentralized applications. This initiative reflects Hedera’s commitment to progress, collaboration, and the advancement of a secure, user-centric, and universally accessible digital identity ecosystem.

# Requirements Overview
**Functional Requirements**
This table lists the functional requirements for the Hiero DID SDK, detailing the specific functionalities it must provide.

ID      Requirement
FR-001  The SDK shall support multibase encoding

FR-002. The SDK shall support manual node selection

FR-003. The SDK shall allow serialization of transactions

FR-004. The SDK shall allow freezing of transactions

FR-005. The SDK shall allow signing transactions with external keys

FR-006. The SDK shall allow signing transactions with private keys

FR-007. The SDK shall support the 2018 verification key format

FR-008. The SDK shall support the 2020 verification key format

FR-009. The SDK shall include a DID resolver

FR-010. The SDK shall support JSON-LD format for DID resolution

FR-011. The SDK shall support dereferencing of DID services

FR-012. The SDK shall support JSON format for DID resolution

FR-013. The SDK shall support CBOR format for DID resolution

FR-014. The SDK shall support dereferencing of DID fragments

FR-015. The SDK shall support management of DID services

FR-016. The SDK shall allow creation of DIDs

FR-017. The SDK shall enable batch updates for DID registrations

FR-018. The SDK shall allow transfer of DID ownership

FR-019. The SDK shall allow deactivation of DIDs

FR-020. The SDK shall support management of DID verification relationships

FR-021. The SDK shall support management of DID verification methods

FR-022. The SDK shall provide an implementation of Hedera AnonCreds Registry

**Non-Functional Requirements**
This table lists the non-functional requirements for the Hiero DID SDK, specifying quality attributes like performance, security, and maintainability.

ID        Requirement
NFR-001.  The SDK shall be compatible with various environments

NFR-002.  The SDK shall have minimal dependencies on external Node modules

NFR-003.  The SDK shall be compatible with specified Node.js versions

NFR-004.  The SDK shall have comprehensive test coverage

**Risks and Technical Debt**
This section outlines the top architectural risks and technical debt items associated with the Application, along with their potential impact and proposed mitigation strategies.

1. SDK Dependency and Maintenance

- Description: The application utilizes the Hiero DID SDK. Dependencies on external libraries like this introduce risks related to maintenance, updates, and potential vulnerabilities within the SDK itself.

- Potential Impact: Increased development time, difficulty in resolving issues stemming from the SDK, security vulnerabilities inherited from the SDK.

- Mitigation Strategy: Stay informed about SDK updates and security advisories. Establish a process for timely updates and vulnerability patching. Contribute to the SDK’s development or consider forking it if necessary to maintain control.

2. Hedera Network Dependency

- Description: The application is dependent on the Hedera network for core functionality. Any issues with the Hedera network, such as outages, performance degradation, or consensus issues, will directly impact the application.

- Potential Impact: Service disruptions, delays in transaction processing, potential data inconsistencies.

- Mitigation Strategy: Implement robust error handling and retry mechanisms for Hedera API calls. Monitor Hedera network status and performance. Consider alternative solutions or fallback mechanisms for critical functionalities in case of Hedera network issues. Explore Hedera mirror nodes for data retrieval.

3. Scalability and Performance

- Description: As the application grows and user adoption increases, scalability and performance can become bottlenecks.

- Potential Impact: Slow response times, degraded user experience, increased operational costs.

- Mitigation Strategy: Design the application with scalability in mind. Employ performance testing and optimization techniques. Utilize caching mechanisms effectively. Monitor application performance and identify potential bottlenecks proactively. Consider horizontal scaling options.

4. Security of Sensitive Data

- Description: The application handles sensitive user data and private keys. Inadequate security measures could lead to data breaches and unauthorized access.

- Potential Impact: Loss of user data, financial losses, reputational damage.

- Mitigation Strategy: Implement strong encryption for data at rest and in transit. Enforce strict access controls and authentication mechanisms. Conduct regular security audits and penetration testing. Stay up-to-date with security best practices and Hedera security recommendations.

**Best Practices**:
The risks listed above are prioritized based on their potential impact and the likelihood of occurrence.

This document will be reviewed and updated quarterly or whenever significant changes are made to the application architecture or its dependencies.

Regular risk assessments will be conducted to identify and address new or evolving risks.

**Glossary**
This glossary provides definitions for key terms used throughout this document.

Term    Description
- Decentralized Identifier (DID)

A globally unique identifier that allows entities (like individuals, organizations, or devices) to control their own digital identity without relying on centralized authorities. Think of it as a digital passport for the online world. Example: did:example:123456789abcdefghi

- DID Document

A machine-readable document (often in JSON format) that acts as a verifiable "digital passport" for a DID. It contains essential information about the DID, such as public keys, authentication methods, and service endpoints.

- Verifiable Data Registry (VDR)

A role a system might perform by mediating the creation and verification of identifiers, verification material, and other relevant data, such as verifiable credential schemas, revocation registries, and so on, which might be required for using verifiable credentials. Examples of verifiable data registries include trusted databases, decentralized databases, government ID databases, and distributed ledgers.

- DID SDK (Decentralized Identity Software Development Kit)

A set of tools and libraries that make it easier for developers to build decentralized identity applications that use manage DIDs and other resources on the Hedera network. This SDK simplifies the process of creating, managing, and resolving DIDs as well as provides implementation of Hedera VDR for AnonCreds Verifiable Credentials.

- Client-managed Secret Mode

A key management approach where the application developer takes full control of managing the cryptographic keys associated with a DID. This offers flexibility but requires careful implementation to ensure security.

- External Secret Mode

A key management approach where the cryptographic keys are managed outside of the DID SDK, often by a dedicated key management service or hardware security module. This enhances security by separating key management responsibilities.

- Internal Secret Mode

A key management approach where the DID SDK itself manages the cryptographic keys. This can be more convenient for developers but might have security implications depending on the SDK’s implementation.

- Interoperability

The ability of different systems and technologies to communicate and exchange information seamlessly. In the context of DIDs, interoperability ensures that DIDs created on Hedera can be used with other systems and applications.

- Key Management

The processes and technologies for generating, storing, and managing cryptographic keys. This includes key generation, secure storage, key rotation, and key revocation. Proper key management is crucial for the security of DIDs.

- Multibase Encoding

A method for encoding binary data (like cryptographic keys) into a textual representation that can be easily shared and used across different systems and protocols. This improves the interoperability of DIDs.

- PrivateKey

A secret cryptographic key used to generate digital signatures and decrypt messages. In the context of DIDs, private keys are associated with a DID and used to authenticate actions performed on behalf of that DID.

- PublicKey

A cryptographic key that is mathematically linked to a private key. It is used to verify digital signatures created with the corresponding private key, ensuring authenticity and integrity.

# Architecture
This section presents the static structure of the system using C4 model diagrams. Each level provides increasing detail about the software architecture.

## Level 1: System Context
This view shows the Hiero DID SDK JS as a system in its environment and the key actors and external systems it collaborates with. It follows the C4 Model "Context" level.

system context diagram
**People**
dApp Developer: Builds dApps with decentralized identity.

Operator/DevOps: Configures network access, credentials, and optional external KMS (e.g., HashiCorp Vault).

**Software Systems**
Hiero DID SDK JS (System): Monorepo of npm packages that expose APIs to manage and resolve DIDs on Hedera, plus utilities for cryptography, caching, compression, messaging, and AnonCreds registry integration.

Hedera Network (External System): Provides Hedera Consensus Service (HCS) topics, Nodes for submitting transactions, and Mirror Nodes for reading messages.

HashiCorp Vault (External System, optional): External KMS used by optional signer/verifier packages for key custody.

**Relationships**
dApp Developer → Hiero DID SDK JS: Calls Registrar to perform DID operations; calls Resolver to resolve DID Documents; may call AnonCreds registry APIs.

Hiero DID SDK JS → Hedera Network: Publishes DID operations to HCS topics via Hedera Clients; reads topic messages via Mirror Node APIs.

Hiero DID SDK JS → HashiCorp Vault (optional): Uses Vault-backed signer/verifier packages for signing and verification without exposing private keys.

## Level 2: Container View
This view identifies the main containers (runnable units and libraries) inside the Hiero DID SDK JS and their relationships with external systems. It follows the C4 Model "Container" level.

container view diagram
**Internal Containers (npm packages)**
- core: Common types, interfaces, and utilities shared by all packages.

- messages: DID message formats and lifecycle events.

- lifecycle: Async orchestration utilities for DID flows.

- registrar: High-level API to create/update/deactivate DIDs. Depends on messages, signer, publisher, hcs, client.

- resolver: High-level API to resolve DIDs from Hedera. Depends on hcs topic reader, cache, verifier, client.

- signer-internal: Local signing using Hedera PrivateKey.

- verifier-internal: Local verification of signatures.

- signer-hashicorp-vault (optional): Vault-backed signing.

- verifier-hashicorp-vault (optional): Vault-backed verification.

- publisher-internal: Publishes transactions to Hedera via Client.

- client: Configures and provides Hedera SDK Client per network.

- hcs: Abstraction over Hedera Consensus Service (publish/read topics, publish/read messages, submit/resolve files by HCS-1 standard).

- cache: In-memory cache primitives used by resolver and others.

- crypto: Cryptographic helpers (SHA-256 hashing).

- zstd: Compression utilities used to reduce on-chain payload size.

- anoncreds: Hedera AnonCreds Registry implementation per spec.

**External Containers**
- Hedera Nodes: Submit transactions (DID ops) to the network.

- Hedera Mirror Node: Read topic info and messages for resolution.

- HashiCorp Vault (optional): External KMS used by Vault signer/verifier.

**Relationships**
- registrar → signer(-internal | -vault): to sign DID operations.

- registrar → publisher-internal → client → Hedera Nodes: to submit HCS transactions.

- resolver → hcs (Topic Reader) → Mirror Node: to fetch topic messages; may use cache and zstd for performance.

- resolver → verifier(-internal | -vault): to verify signatures of DID messages/documents.

- hcs → client: to publish to HCS topics.

- anoncreds → hcs/client: to interact with Hedera AnonCreds registry.

**Notes**
Each container is versioned and published independently, enabling consumers to choose only what they need. See Packages Guide for details and links.

## Level 3: Component View
This diagram provides a detailed view of the components within the Hiero DID SDK and their interactions with each other and with external dependencies. It illustrates the internal workings of the SDK and how it facilitates DID management.

component view diagram
**Components**
- dApp Developer: Builds dApps with decentralized identity.

- Hiero DID SDK: The software development kit comprising the following components and services:

- Registrar: Handles creation, updating, and deactivation of DIDs.

- Resolver: Resolves DIDs to their corresponding DID Documents.

- HcsService: Central service managing Hedera Consensus Service (HCS) objects; responsible for initializing the Hedera client and cache.

- HederaAnoncredsRegistry: Manages registration and resolution of AnonCreds schemas, credential definitions, revocation registries, and revocation status lists on Hedera.

- Signer: Signs DID messages to ensure cryptographic integrity.

- Verifier: Verifies DID messages using internal cryptographic.

- HashiCorpSigner: Signs DID messages using HashiCorp Vault.

- HashiCorpVerifier: Verifies DID messages using HashiCorp Vault.

- Publisher: Signs and publishes transactions to the Hedera Topic Service.

- HederaClientService: Manages Hedera SDK clients for multiple networks, handling client lifecycle and configuration.

- HcsTopicService: Manages creation, update, deletion, and retrieval of topics within the Hedera Consensus Service.

- HcsMessageService: Handles sending and retrieving messages from HCS topics.

- HcsFileService: Provides file storage and retrieval capabilities using the HCS-1 standard, with automatic Zstandard compression and integrity verification.

- Cache Service: Caches data and query results to improve performance and reduce redundant network requests.

- Crypto Library: Provides cryptographic functions such as SHA-256 hashing.

- Zstd Compression: Module for compressing and decompressing data using the Zstandard algorithm.

**External Systems**
- Hedera Consensus Service: Hedera’s publish/subscribe messaging platform through which DID topics and messages are exchanged.

- Hedera Node: Hedera network node that acts as a gateway for submitting transactions and interacting with the blockchain.

**Interactions**
- dApp Developers use Registrar, Resolver, HcsService, and HederaAnoncredsRegistry: Developers interact with these components to manage decentralized identifiers, resolve DID documents, manipulate HCS objects, and register AnonCreds data.

- Registrar uses Signer and Publisher: Registrar signs DID-related messages with the Signer and publishes these signed transactions to the Hedera network via the Publisher.

- Publisher publishes signed transactions to the Hedera Consensus Service: Publisher submits signed transactions as messages to HCS topics.

- Resolver retrieves DID Documents from the Hedera Consensus Service: Resolver queries DID document data by reading messages from HCS topics.

- HcsService initializes HederaClientService and Cache Service: HcsService sets up the network client and caching mechanism for HCS operations.

- HcsService uses HcsTopicService, HcsMessageService, and HcsFileService: Delegates topic, messaging, and file operations to specialized services.

- HcsTopicService, HcsMessageService, HcsFileService use HederaClientService: These services leverage the Hedera SDK client for network interactions.

- HcsTopicService, HcsMessageService, HcsFileService use Cache Service: All these services utilize caching to enhance data retrieval efficiency.

- HcsFileService uses Crypto Library and Zstd Compression: For file compression during storage and retrieval.

- HcsMessageService publishes and retrieves messages from Hedera Consensus Service: Manages message sending and receiving through topics.

- HcsFileService publishes and retrieves files from Hedera Consensus Service: Manages chunked file submissions and retrieval with compression.

- HcsTopicService manages topics in the Hedera Consensus Service: Oversees topic lifecycle (creation, update, deletion).

- HederaAnoncredsRegistry uses HcsService: Uses HCS services to store and retrieve AnonCreds-related data on Hedera.

- Hedera Consensus Service communicates with Hedera Node: The underlying infrastructure supporting message publication and retrieval.

## Level 4: Runtime View
This diagram illustrates the runtime interactions between the components of the Hiero DID SDK, a dApp developer, and the Hedera network during a typical DID management workflow. It shows the sequence of operations and how data flows between the components.

runtime view diagram
Components
dApp Developer: Builds dApps with decentralized identity.

Hiero DID SDK: The software development kit providing key components to work with decentralized identity on Hiero:

Registrar: Handles creation, update, deactivation, and resolution of DIDs at runtime.

Resolver: Resolves DID Documents upon developer’s request.

Signer: Signs DID messages and transactions to ensure integrity and authenticity.

Publisher: Signs and publishes transactions to the Hedera Consensus Service (HCS).

HcsService: Coordinates Hedera Consensus Service objects handling and initializes underlying services.

HcsTopicService: Manages HCS topics lifecycle (create, update, delete) used for DID communication.

HcsMessageService: Sends messages to and retrieves messages from HCS topics.

HcsFileService: Handles chunked file submission and retrieval with compression and verification.

HederaClientService: Provides configured Hedera SDK clients for interacting with Hedera networks.

Cache Service: Caches frequently used data to enhance performance.

Crypto Library: Provides cryptographic utilities (e.g., SHA-256 hashing).

Zstd Compression: Offers compression and decompression using the Zstandard algorithm.

HederaAnoncredsRegistry: Manages decentralized anonymous credentials (AnonCreds) data lifecycle on Hedera.

Hedera Consensus Service: The Hedera network service providing publish/subscribe messaging on topics.

Hedera Node: The blockchain node gateway handling transaction submission and state queries.

Runtime Workflow Interactions
DID Operation Initiation: The dApp developer triggers a DID operation (create, update, deactivate, or resolve) via the Registrar or Resolver components.

Signer Interaction: For operations involving DID messages, the Registrar requests the Signer to cryptographically sign the messages, ensuring authenticity.

HCS Object Management: The Registrar invokes HcsService, which orchestrates interactions with HcsTopicService, HcsMessageService, and HcsFileService to handle topic creation, message sending, or file storage.

Transaction Preparation and Publishing: The Publisher publishes the signed transactions to the Hedera Consensus Service.

Ledger Interaction: The Hedera Consensus Service communicates with one or more Hedera Nodes to persist, order, and propagate the transactions.

Caching for Efficiency: The Cache Service caches Hedera Consensus Service data to reduce redundant network calls.

Message and File Retrieval: The Resolver, when resolving DID Documents, uses TopicReader for retrieving messages. The HcsFileService, when resolving files, uses HcsTopicService to retrieve chunk messages, builds file payload from them according to HCS-1 standard (decompressing via Zstd Compression and verifying integrity with the Crypto)

Hedera Client Usage: All interactions with the Hedera network (making calls, submitting transactions) pass through clients managed by HederaClientService, which handles multi-network configurations and client lifecycle.

Anoncreds Data Management: The HederaAnoncredsRegistry uses HcsService and related messaging/file services to register schemas, credential definitions, revocation registries, and status lists, ensuring decentralized credential management atop Hedera.

Data Flow Summary
Developer → Registrar/Resolver: Triggers DID management or resolution.

Registrar → Signer: Signs DID messages.

Registrar → HcsService → (HcsTopicService, HcsMessageService, HcsFileService): Manages Hedera topics, messages, files.

Publisher → Hedera Topic Service: Publishes signed transactions.

Hedera Topic Service ↔ Hedera Node: Processes transactions and returns state.

Resolver → HcsMessageService/HcsFileService → Cache: Retrieves and caches DID documents and credential data.

All Ledger interactions → HederaClientService: Provides configured clients for network operations.

HederaAnoncredsRegistry ↔ HcsService: Manages AnonCreds lifecycle on ledger.

# Hedera DID Method
This guide provides an overview of the Hedera DID Method Specification, which defines how Decentralized Identifiers (DIDs) are created, resolved, updated, and deactivated on the Hedera network.

DID Format
A Hedera DID adheres to the following format:

did:hedera:<network>:<base58-encoded-public-key>_<topic-id>
Where:

<network> is either mainnet or testnet.

<base58-encoded-public-key> is the base58 encoding of the DID’s root public key.

<topic-id> is the ID of the Hedera topic associated with the DID.

This structure ensures that Hedera DIDs are easily identifiable and can be resolved to their corresponding DID Documents.

CRUD Operations
The Hedera DID method utilizes the Hedera Consensus Service (HCS) to manage the lifecycle of DIDs. The following CRUD operations are supported:

Create: A new DID is created by sending a ConsensusSubmitMessage transaction to an HCS topic. The message includes the initial DID Document or DID Owner information.

Read (Resolve): A DID is resolved by reading messages from the associated HCS topic. The DID Document is constructed by processing the messages in chronological order.

Update: A DID Document is updated by sending a ConsensusSubmitMessage transaction with an updated DIDOwner, VerificationMethod, or VerificationRelationship.

Deactivate: A DID is deactivated by sending a ConsensusSubmitMessage transaction with the deactivate operation.

Delete: A DID Document is deleted by sending a ConsensusSubmitMessage transaction with the delete operation.

These operations leverage the immutability and transparency of the Hedera network to provide a secure and auditable way to manage DIDs.

Create
To create a DID, you need to:

Generate a key pair.

Create an HCS topic.

Submit a create message to the topic, including the DID Document or DID owner information.

The initial DID Document MUST contain a public key with the ID #did-root-key and type Ed25519VerificationKey2018.

Read (Resolve)
To resolve a DID, you need to:

Retrieve the messages from the HCS topic associated with the DID.

Process the messages to construct the current state of the DID Document.

If the most recent valid message has the operation set to delete, the DID Document returned MUST be empty.

Update
To update a DID, you need to:

Submit an update message to the HCS topic associated with the DID.

Include the changes to be made to the DID Document in the message payload.

The message payload can include updates to the DID Document’s DIDOwner, VerificationMethod, or VerificationRelationship.

Deactivate
To deactivate a DID, you need to:

Submit a deactivate message to the HCS topic associated with the DID.

This operation revokes the DID, making it unusable for further operations.

Delete
To delete a DID, you need to:

Submit a delete message to the HCS topic associated with the DID.

This operation removes the DID’s association with the Hedera topic.

DID Messages
DID operations are performed using DID Messages, which are JSON objects containing information about the operation and the DID. Each message includes:

operation: The type of operation being performed (create, update, deactivate, or delete).

did: The DID string.

event: A Base64-encoded JSON object containing the data relevant to the operation.

timestamp: The message creation timestamp.

signature: A signature of the message content, signed by the DID controller’s private key.

These messages are submitted to the HCS topic associated with the DID, creating a verifiable and tamper-proof record of DID operations.

Event Payloads
DID Messages include an event property that contains the data relevant to the operation. The following event types are supported:

DIDDocument: A reference to a DID Document stored in IPFS.

DIDOwner: Information about the DID’s controller and public key.

VerificationMethod: A cryptographic public key associated with the DID.

VerificationRelationship: The relationship between the DID subject and a verification method (e.g., authentication, assertion).

Service: A service endpoint associated with the DID.

These events allow for flexible and granular updates to the DID Document, enabling various use cases and interactions.

Security and Privacy Considerations
The Hedera DID method inherits the security properties of the Hedera network, including its hashgraph consensus algorithm, proof-of-stake model, and fee structure. This ensures the integrity and availability of DID data.

Privacy considerations include avoiding the inclusion of Personally Identifiable Information (PII) in DID Documents and mitigating the risk of correlation by using unique DIDs and keys for different interactions.

Full Specification
This guide provides a concise overview of the Hedera DID Method. For a deeper understanding, refer to the Hedera DID Method Specification.


# Hiero DID SDK: Essential Components
Introduction
This guide provides an overview of the essential components and functions that power the Hiero DID SDK. These elements work together to enable developers to seamlessly manage Decentralized Identifiers (DIDs) and AnonCreds resources on the Hedera network. Familiarizing yourself with these core aspects is key to effectively leveraging the SDK for your decentralized identity solutions.

Resolving DIDs with resolveDID
The resolveDID function is your gateway to accessing DID Documents. It retrieves and verifies these documents, which contain crucial information about a DID, such as public keys and authentication methods. By using the Hedera Consensus Service (HCS), resolveDID ensures secure and verifiable retrieval, adhering to the DID specification and supporting the Hedera DID method.

Managing DIDs: createDID, updateDID, and deactivateDID
The Hiero DID SDK provides a streamlined way to manage the entire lifecycle of a DID. With createDID, you can generate and register new DIDs on the Hedera network. updateDID allows you to modify existing DIDs, while deactivateDID enables you to revoke a DID when needed. These functions interact with the HCS to ensure the secure handling of DID documents, adhering to the DID specification and supporting the Hedera DID method.

Secure Key Management with the Signer Class
The Signer class plays a vital role in securing your DID operations. It provides a standardized way to generate keys, sign messages, and verify signatures. This ensures the integrity and authenticity of your DID operations, contributing to the overall trustworthiness of DIDs on Hedera.

Streamlined Transaction Handling with the Publisher Class
The Publisher class acts as a bridge between your DID operations and the Hedera network. It simplifies the submission of transactions to the Hedera Consensus Service (HCS), streamlining the process of registering, updating, and deactivating DIDs. With automatic network detection and robust error handling, the Publisher class ensures a smooth and reliable experience.

Managing AnonCreds resources with the HederaAnoncredsRegistry Class
The HederaAnoncredsRegistry class provides an API to register and resolve AnonCreds resources (Schema, Credential Definition, Revocation Registries) on Hedera ledger. Combined with effective built-in caching, this provides a great AnonCreds Verifiable Data Registry (VDR) option that allows developers to leverage Hedera speed and cost-effectiveness for AnonCreds use cases.

Convenient integration with Hedera Consensus Service (HCS)
The @hiero-did-sdk/hcs package provides API and helpers to simplify integration with HCS. The HcsService class provides easy-to-use common API with built-in management of Hedera SDK Client instances. HcsTopicService, HcsMessageService and HcsFileService (HCS-1 standard implementation) classes provide specific API parts that can be used independently.

# Hiero DID SDK: Key Management Modes
This guide outlines the different key management strategies supported by the DID SDK, allowing you to choose the approach that best suits your security needs and application architecture. Proper key management is crucial for the security and integrity of your Decentralized Identifiers (DIDs). Choose the strategy that aligns with your risk tolerance and operational requirements.

Internal Secret Mode
In this mode, the DID SDK generates and stores the private key within the application itself. This approach is suitable for:

Development and testing: When experimenting with DIDs and the SDK.

Low-risk environments: Where the security of the DID is not critical.

Prototyping: For proof-of-concept implementations.

Avoid using this mode in production environments or when dealing with sensitive data, as it increases the risk of private key exposure.
internal secret mode diagram
Creating a DID
const { did, didDocument } = await createDID({
  privateKey: "0x...", // Replace with your private key in DER format
  client,
});
Alternatively, generate a new private key:

const { did, didDocument } = await createDID({
  privateKey: new PrivateKey(),
  client,
});
Updating a DID
const updatedDidDocument = await updateDID({
  did,
  updates: [...],
  privateKey: "0x...", // Your private key
}, { clientOptions });
Deactivating a DID
await deactivateDID({
    did,
    privateKey: "0x...", // Your private key
}, { clientOptions });
External Secret Mode
This mode offers enhanced security by storing private keys externally, such as in:

Hardware Security Modules (HSMs): Provide tamper-resistant protection for keys.

Cloud Key Management Systems (KMS): Offer secure, centralized key management with granular access control.

This approach is recommended for production systems and applications handling sensitive data.

external secret mode diagram
The Signer object acts as an interface to your external key management system. For example, to use a HashiCorp Vault for key storage, you would configure the Vault Signer using a VaultSignerFactory:

const signerFactory = await VaultSignerFactory.loginWithToken({
  token: 'your-vault-token',
  url: 'your-vault-url',
});
Creating a DID
const { did, didDocument } = await createDID({
  signer: await signerFactory.forKey('your-key-name'), // 'your-key-name' identifies the key in your Vault
  client,
});
Updating a DID
const updatedDidDocument = await updateDID({
  did,
  updates: [...],
}, {
  client,
  signer: await signerFactory.forKey('your-key-name'),
});
Deactivating a DID
await deactivateDID({ did }, {
  signer: await signerFactory.forKey('your-key-name'),
  clientOptions,
});
Client Managed Secret Mode
This mode delegates private key management to the client application, often within a secure wallet environment. This is suitable for scenarios where:

Users control their own keys: Providing self-sovereignty over DIDs.

Keys are stored in secure enclaves: Like mobile wallets or browser extensions.

client managed secret mode diagram
This mode uses a specific lifecycle flow to facilitate secure signing by the client.

Here’s how it works:

Server initiates the operation: The server starts the DID creation, update, or deactivation process.

Server pauses for client signature: The server generates a signing request and a state. The state object contains the operation details, while the signing request includes the payload to be signed. The server then sends the signing request to the client and persists the state object for later use.

Client signs the request: The client application (e.g., a wallet) uses the user’s private key to sign the request.

Client returns the signature: The signed request is sent back to the server.

Server completes the operation: The server verifies the signature and completes the DID operation using persisted state.

client managed secret mode flow
Creating a DID
// Server initiates lifecycle flow and pauses
const { state, signingRequest } = await generateCreateDIDRequest(
  { multibasePublicKey: 'zK24v8mQF...' }, // Public key of client's wallet, used for DID root key
  { client }
);

// Server sends signing request to client
// Client signs request payload with wallet and returns signature
const payload = signingRequest.serializedPayload;
const clientSignature = await wallet.sign(payload);

// Server resumes lifecycle and creates final DID on the network
const { did, didDocument } = await submitCreateDIDRequest(
  state,
  clientSignature,
  { client }
);
Updating a DID
// Server initiates lifecycle flow and pauses
const { states, signingRequests } = await generateUpdateDIDRequest(
  { did, updates: [...] },
  { client }
);

// Server sends signing requests to client
// Client signs each request payload with wallet and returns signatures
// Each request corresponds to a specific update operation, and the client signs them sequentially
const signatures = Object.keys(signingRequests).reduce(async (acc, request) => {
  const signingRequest = signingRequests[request];
  const signature = await wallet.sign(signingRequest.serializedPayload);

  return {
    ..acc,
    [request]: signature,
  };
}, {});

// Server resumes lifecycle and updates DID on the network
const { did, didDocument } = await submitUpdateDIDRequest(
  states,
  signatures,
  { client }
);
Deactivating a DID
// Server initiates lifecycle flow and pauses
const { state, signingRequest } = await generateDeactivateDIDRequest(
  { did },
  { client }
);

// Server sends signing request to client
// Client signs request payload with wallet and returns signature
const payload = signingRequest.serializedPayload;
const clientSignature = await wallet.sign(payload);

// Server resumes lifecycle and creates final DID on the network
const { did, didDocument } = await submitDeactivateDIDRequest(
  state,
  clientSignature,
  { client }
);
Persisting a state object
The generated state object contains the operation details and is used to resume the DID operation. It should be persisted securely on the server side, ensuring that it is not tampered with or exposed to unauthorized parties. Once the client returns the signed request, the server can use the state object to complete the operation.

States is a OperationState object, and have the following structure:

type StateStatus = 'success' | 'error' | 'pause';

interface OperationState {
  message: string;
  status: StateStatus;
  index: number;
  label: string;
}
All of the properties are primitives, so they can be easily persisted in a database or file system.

# Hiero DID SDK: Handling Exceptions
This guide explains how to handle exceptions and errors when using the Hiero DID SDK. It covers common error scenarios, best practices for error handling, and strategies for debugging and troubleshooting.

Error classes
The Hiero DID SDK introduces a custom error class, DIDError, to handle exceptions and errors. This class extends the native Error class and provides additional properties and methods for error handling.

The DIDError class includes the following properties:

code: A unique error code that identifies the type of error.

description: A human-readable error message that describes the error in detail.

isDIDError: A boolean flag that indicates whether the error is an instance of DIDError.

diderror interface diagram
Error codes
The DIDError class defines a set of error codes that correspond to different types of errors. These error codes help developers identify the root cause of an error and take appropriate action to resolve it.

The following table lists the error codes defined in the DIDError class:

Error Code    Description
invalidDid

The provided DID is invalid or malformed.

invalidDidUrl

The provided DID URL is invalid, malformed or not supported.

methodNotSupported

The provided DID method is not supported.

representationNotSupported

The provided DID representation is not supported.

invalidPublicKey

The provided public key is invalid or malformed.

invalidPublicKeyLength

The provided public key has an invalid length.

invalidPublicKeyType

The provided public key type in invalid.

unsupportedPublicKeyType

The provided public key type is not supported.

internalError

An internal error occurred while processing the request.

notFound

The requested resource was not found.

invalidSignature

The provided signature is invalid or malformed.

invalidMultibase

The provided multibase encoding is invalid or not supported.

invalidArgument

The provided argument is invalid or missing.

The ErrorCodes enumerated type can be imported from the @hiero-did-sdk/core package to access the error codes in your application.

Error handling
When using the Hiero DID SDK, it is essential to implement robust error handling to gracefully handle exceptions and errors. Proper error handling ensures that your application can recover from errors, provide meaningful feedback to users, and prevent unexpected behavior.

The following best practices can help you handle exceptions and errors effectively:

Use try-catch blocks: Wrap code that may throw exceptions in try-catch blocks to catch and handle errors gracefully.

Check error codes: Use the error codes provided by the DIDError class to identify the type of error and take appropriate action.

Catch other errors: Remember that errors not derived from DIDError may still occur. Catch these errors and handle them accordingly.

Implement fallback mechanisms: Define fallback mechanisms to handle errors that cannot be resolved immediately, such as retrying the operation or displaying a user-friendly error message.

The following example demonstrates how to handle exceptions and errors when resolving a DID:

try {
  const didDocument = await resolveDID(did);
  console.log(didDocument);
} catch (error: unknown) {
  if (error.isDIDError) {
    const didError = error as DIDError;
    console.error(`Error resolving DID: ${didError.description} (${didError.code})`);
  } else {
    console.error(`An unexpected error occurred: ${error}`);
  }
}

# Hiero DID SDK: Single vs Shared Topic
When creating Decentralized Identifiers (DIDs) on Hedera Hiero using the DID SDK, you have two fundamental approaches for storing DID Documents: using a single topic per DID or using a shared topic for multiple DIDs. This guide explains the differences, advantages, and disadvantages of each approach to help you choose the best solution for your use case.

Understanding Topics in Hedera
A Hedera Consensus Service (HCS) topic is a channel for submitting and retrieving messages. In the context of DIDs:

Single Topic: Each DID has its own dedicated HCS topic

Shared Topic: Multiple DIDs share the same HCS topic

Single Topic Approach
How It Works
When using the single topic approach, each DID is created with its own dedicated HCS topic. All operations related to that specific DID (creation, updates, deactivation) are submitted as messages to that DID’s unique topic.

// Creating a DID with a single topic approach (default behavior)
const didResult = await createDID({
  privateKey: privateKey,
  // No topicId specified, so a new topic will be created
});
Advantages
Isolation: Each DID’s operations are completely isolated from other DIDs

Simplified Resolution: When resolving a DID, there is no need to filter messages for the specific DID

Clean Separation: Easier to manage permissions and access control for each DID

Reduced Message Volume: Each topic contains only messages relevant to a single DID

Independent Lifecycle: Each DID can be managed independently without affecting others

Disadvantages
Cost: Creating and maintaining separate topics for each DID incurs higher costs

Resource Intensive: More network resources are consumed with multiple topics

Management Overhead: Managing many topics can become complex at scale

Shared Topic Approach
How It Works
With the shared topic approach, multiple DIDs use the same HCS topic. All operations for these DIDs are submitted to this common topic, with each message containing information about which DID it pertains to.

// Creating a DID using a shared topic
const sharedTopicId = "0.0.1234567"; // Your existing topic ID

const didResult = await createDID({
  privateKey: privateKey,
  topicId: sharedTopicId, // Specify the shared topic ID
});
Advantages
Cost-Effective: Reduces the number of topics needed, lowering overall costs

Resource Efficient: Fewer topics consume fewer network resources

Simplified Management: Easier to manage a smaller number of topics

Suitable for Organizations: Ideal for organizations managing many DIDs

Disadvantages
Increased Complexity: Resolution requires filtering messages for the specific DID

Performance Impact: As the topic grows with many DIDs, resolution may become slower

Potential Bottlenecks: High-volume topics might face throughput limitations

Shared Fate: Issues with the topic affect all DIDs stored within it

Choosing the Right Approach
Consider these factors when deciding between single and shared topics:

When to Use Single Topics
High-Value DIDs: For DIDs representing significant assets or identities

Performance Priority: When resolution speed for individual DIDs is critical

Low Volume of DIDs: When you’re managing a small number of DIDs

Independent Management: When DIDs need to be managed by different entities

When to Use Shared Topics
Cost Sensitivity: When minimizing costs is a priority

High Volume of DIDs: When creating and managing many DIDs

Organizational DIDs: For DIDs belonging to the same organization

Related Identities: For DIDs that are logically grouped

Centralized Management: When DIDs are managed by the same entity

Hybrid Approach
In some cases, a hybrid approach might be optimal:

Use shared topics for low-value, high-volume DIDs

Use single topics for high-value, critical DIDs

Group DIDs by category or purpose into different shared topics

Best Practices
Document Your Approach: Clearly document which approach you’re using

Consider Future Growth: Plan for how your DID usage might scale

Monitor Costs: Regularly review the costs associated with your approach

Performance Testing: Test resolution performance under expected load

Example: Creating a DID with a Shared Topic
import { createDID } from "@hashgraph/did-sdk-js";

// Your existing topic ID
const sharedTopicId = "0.0.1234567";

async function createDidWithSharedTopic() {
  try {
    const result = await createDID({
      privateKey: "your-private-key",
      topicId: sharedTopicId,
      // Other options as needed
    });

    console.log("Created DID:", result.did);
    console.log("Using shared topic:", sharedTopicId);

    return result;
  } catch (error) {
    console.error("Error creating DID:", error);
    throw error;
  }
}
Example: Creating a DID with a Single Topic
import { createDID } from "@hashgraph/did-sdk-js";

async function createDidWithSingleTopic() {
  try {
    // No topicId specified - a new topic will be created
    const result = await createDID({
      privateKey: "your-private-key",
      // Other options as needed
    });

    console.log("Created DID:", result.did);
    console.log("Created new topic:", result.topicId);

    return result;
  } catch (error) {
    console.error("Error creating DID:", error);
    throw error;
  }
}

# Hiero DID SDK: Transaction Costs
This guide provides estimated transaction costs for various DID operations when using the Hiero DID SDK. Understanding these costs can help you plan and budget for your DID-related activities on the Hedera network.

All costs provided in this guide are estimates and may change based on Hedera network conditions, transaction complexity, and future fee adjustments. For the most up-to-date and detailed fee information, please refer to the official Hedera Transaction Fees documentation or Hedera Fee Estimator.

DID Operation Cost Estimates
The following table summarizes the estimated costs for common DID operations:

Operation    Description    Estimated Cost (USD)
createDID

Creating a new DID document with new topic

$0,0101

createDID

Creating a new DID document on existing topic

$0.0001

updateDID

Updating an existing DID document (per update)

$0.0001

deactivateDID

Deactivating a DID document

$0.0001

resolveDID

Resolving a DID

Free

Detailed Cost Breakdown
createDID
Creating a DID document involves:

A Hedera Consensus Service (HCS) topic creation (optional)

A Hedera Consensus Service (HCS) message submission

Factors affecting cost:

Message size

Network congestion

updateDID
Each update to a DID document incurs a cost:

A Hedera Consensus Service (HCS) message submission

Cost may vary based on the size of the update

Factors affecting cost:

Size of the update payload

Network conditions

deactivateDID
Deactivating a DID is typically a lightweight operation:

A Hedera Consensus Service (HCS) message submission

Generally costs slightly less than creation or updates

resolveDID
Resolving a DID requires reading from the Hedera Consensus Service (HCS) topic. This operation is free.

# Hiero DID SDK: Getting Started
Introduction
Welcome to the Hiero DID SDK! This guide provides a quick and practical introduction to creating and managing Decentralized Identifiers (DIDs) and AnonCreds resources on the Hedera network.

The Hiero DID SDK empowers you to leverage decentralized identity concepts for your applications, providing:

Enhanced Security: give users greater control over their digital identities and reduce the reliance on centralized authorities.

Improved Privacy: decentralized identity can be used to selectively disclose information, minimizing the data shared with third parties.

Increased Trust: DIDs and AnonCreds resources are anchored to the Hedera ledger, providing a tamper-proof and auditable record of identity information.

This guide will walk you through the essential steps to get you started with the Hiero DID SDK. You’ll learn how to install the SDK, create and resolve your first DID and AnonCreds credential schema.

Prerequisites:

Node.js and npm: Ensure you have Node.js and npm (or yarn) installed on your system.

Hedera Account: You’ll need a Hedera account with some hbars to pay for transaction fees. You can create one on the Hedera Portal: https://portal.hedera.com/

(Optional) Basic understanding of DIDs: Familiarity with the concept of DIDs is helpful but not required. If you’re new to DIDs, you can learn more here: https://www.w3.org/TR/did-core/

Let’s get started!

1. Install the SDK
Use npm to install the necessary packages:

npm install @hashgraph/sdk @hiero-did-sdk/registrar @hiero-did-sdk/resolver
2. Set up your environment
Create a .env file: Store your Hedera account ID and private key securely in a .env file in your project directory.

# .env
HEDERA_ACCOUNT_ID=0.0.12345
HEDERA_PRIVATE_KEY=your_private_key_here
Import and configure the SDK:

import { Client, PrivateKey } from "@hashgraph/sdk";

require("dotenv").config();

const myAccountId = process.env.HEDERA_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

const client = Client.forTestnet(); // Use Client.forMainnet() for mainnet
client.setOperator(myAccountId, myPrivateKey);
3. Create your first DID
import { createDID } from "@hiero-did-sdk/registrar";

async function main() {
  try {
    const { did, didDocument } = await createDID({
      client,
    });

    console.log(`DID: ${did}`);
    console.log(`DID Document: ${JSON.stringify(didDocument, null, 2)}`);
  } catch (error) {
    console.error("Error creating DID:", error);
  }
}

main().finally(() => client.close());
This code will:

Import the createDID function from the @hiero-did-sdk/registrar package.

Invoke the createDID function with a providers object containing your configured Hedera client.

Generate a new DID with default settings.

Output the generated DID string (e.g., did:hedera:testnet:z6Mkhj…​) and its associated DID document, which contains important information about the DID.

4. Resolve a DID Document
import { resolveDID } from "@hiero-did-sdk/resolver";

async function main() {
  const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to resolve

  try {
    const didDocument = await resolveDID(did);
    console.log(`DID Document: ${JSON.stringify(didDocument, null, 2)}`);
  } catch (error) {
    console.error("Error resolving DID:", error);
  }
}

main().finally(() => client.close());
This code demonstrates how to:

Use the resolveDID function from the resolver package.

Fetch and display the DID document associated with a given DID string. This allows you to verify the authenticity and retrieve information linked to the DID.

5. Create AnonCreds schema
import { HederaAnoncredsRegistry } from '@hiero-did-sdk/anoncreds';
import { HederaClientConfiguration } from '@hiero-did-sdk/client';

const config: HederaClientConfiguration = {
  networks: [
    {
      network: 'testnet',
      operatorId,
      operatorKey
    }
  ]
};

const schema = {
  issuerId: 'did:example:issuer1',
  name: 'Example Schema',
  version: '1.0',
  attrNames: ['attr1', 'attr2']
};

async function main() {
  const registry = new HederaAnoncredsRegistry(config);

  try {
    const result = await registry.registerSchema({ networkName: 'testnet', schema });
    console.log('Schema register result:', result);
  } catch (error) {
    console.error('Failed to register schema:', error);
  }
}

main();
This code demonstrates how to:

Use the HederaAnoncredsRegistry.registerSchema function to register AnonCreds schema on Hedera ledger.

Display the AnonCreds schema registration result to verify the status of the operation (success/failure).

6. Resolve AnonCreds schema
import { HederaAnoncredsRegistry } from '@hiero-did-sdk/anoncreds';
import { HederaClientConfiguration } from '@hiero-did-sdk/client';

const config: HederaClientConfiguration = {
  networks: [
    {
      network: 'testnet',
      operatorId,
      operatorKey
    }
  ]
};

// Specify the existing schemaId on the testnet here
const schemaId = 'did:hedera:testnet:zFAeKMsqnNc2bwEsC8oqENBvGqjpGu9tpUi3VWaFEBXBo_0.0.5896419/anoncreds/v0/SCHEMA/0.0.6557796';

async function main() {
  const registry = new HederaAnoncredsRegistry(config);

  try {
    const result = await registry.getSchema(schemaId);
    console.log('Schema resolution result:', result);
  } catch (error) {
    console.error('Failed to resolve schema:', error);
  }
}

main();
This code demonstrates how to:

Use the HederaAnoncredsRegistry.getSchema function to resolve AnonCreds schema from Hedera ledger.

Fetch and display the AnonCreds schema object associated with a given AnonCreds identifier.

# Hiero DID SDK: Running in the Browser Environment
This guide provides instructions on how to run the Hiero DID SDK in a browser environment. The SDK is designed to be used in a Node.js environment, but it can also be used in a browser environment.

Installation
The Hiero DID SDK can be installed using npm or yarn.

npm install @hashgraph/sdk @hiero-did-sdk/registrar @hiero-did-sdk/resolver
Additionally, a buffer package is required to be installed as a dependency.

npm install buffer
The buffer package provides a polyfill for the Buffer class in the browser environment.

Make sure that your module bundler is configured to resolve browser field in package.json files. This is required to load the correct version of the DID SDK in the browser environment.
Usage
Usage of the Hiero DID SDK in a browser environment is similar to the Node.js environment. The following example demonstrates how to create a DID in React Component:

import { createDID } from '@hiero-did-sdk/registrar';
import { useState, useEffect } from 'react';

export function App() {
    const [createDIDResponse, setCreateDIDResponse] = useState(null);

    useEffect(() => {
        createDID({
            publisher: CustomWalletConnectPublisher,
        }).then(setCreateDIDResponse);
    }, []);

    return <p>{createDIDResponse.did}</p>;
}
The CustomWalletConnectPublisher is a custom implementation of the Publisher interface that uses WalletConnect to connect to the Hedera network. You need to implement it yourself.

Limitations
The main dependency of the Hiero DID SDK is @hashgraph/sdk. It allows to interact with the Hedera network like submitting transactions, creating accounts, etc. This library exposes WebClient which is a browser-friendly version of the Hedera SDK Client. But because of the nature of the WebClient, it is instantiated with empty mirror node addresses and network. This prevents you from using it out of the box in the browser environment. You can read more about it in the issue.

To use the @hashgraph/sdk in a browser environment, you need to manually set the mirror node address and network. Another option is to use the @hashgraph/sdk with the WalletConnect provider. This will require you to implement a custom Publisher class.

When you have a custom Publisher implementation, you will need to pass it to all the DID SDK functions that require it, like createDID and resolveDID.

Using Resolver and Registrar
DID Resolver is a core component of the Hiero DID SDK. It is used to resolve DIDs and DID Documents. Registrar uses a resolver for various operations.

By default, Registrar and Resolver uses a TopicReader to read messages from the Hedera network topic. Default version of the TopicReader uses gRPC to connect to the Hedera network. This won’t work in the browser environment.

To fix that you can use Hedera Rest API TopicReader. It uses Mirror Node REST API to fetch messages from the Hedera network. This can be imported from @hiero-did-sdk/resolver package.

import {
  resolveDID,
  TopicReaderHederaRestApi,
} from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaRestApi();
const didDocument = await resolveDID(did, 'application/did+ld+json', {
  topicReader,
});

# Topic Reader Class
The TopicReader class is a core component of the resolver package. It allows to implement custom logic for reading messages from the Hedera network topic.

Overview
The TopicReader class provides a flexible interface for reading messages from the Hedera network topic. It allows to implement custom logic for reading messages from the Hedera network topic. Hedera DID SDK provides most common implementations of the TopicReader class. You can use them as is or extend them to implement custom logic. You can also implement your own TopicReader implementation based on your specific requirements.

Benefits of using the TopicReader class:

Flexible interface for reading messages from the Hedera network topic.

Implement custom logic for reading messages from the Hedera network topic.

Use Hedera DID SDK provided implementations of the TopicReader class.

Implement your own TopicReader implementation based on your specific requirements.

Use cases:

Read messages from the Hedera network topic using gRPC client.

Read messages from the Hedera network topic using HCS package.

Read messages from the Hedera network topic using REST API.

Read messages with additional caching capabilities.

Read messages for testing or development purposes.

Implementations
Hedera DID SDK provides the following implementations of the TopicReader class:

TopicReaderHederaClient - Read messages from the Hedera network topic using gRPC client (default implementation).

TopicReaderHederaHcs - Read messages from the Hedera network topic using gRPC client (using the new HCS service).

TopicReaderHederaRestApi - Read messages from the Hedera network topic using Mirror Node REST API (browser friendly).

TopicReaderHederaClient
The TopicReaderHederaClient class is a default implementation of the TopicReader class. It uses the Hedera gRPC client to read messages from the Hedera network topic. This implementation cannot be used in the browser environment.

import { TopicReaderHederaClient } from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaClient();
const messages = await topicReader.fetchFrom('0.0.5217215', 'testnet', {
  from: 0, // Read messages from the start of the topic
  to: 1000, // Read messages to 1000 seconds from the start of the topic
});

console.log(messages);
import { TopicReaderHederaClient } from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaClient();
const messages = await topicReader.fetchAllToDate('0.0.5217215', 'testnet');

console.log(messages);
TopicReaderHederaHcs
The TopicReaderHederaHcs class is a implementation of the TopicReader class using the HCS package. The TopicReaderHederaHcs class can be initialized with a set of required for using networks and with a Cache. It uses the Hedera gRPC client to read messages from the Hedera network topic. This implementation cannot be used in the browser environment.

import { TopicReaderHederaHcs } from '@hiero-did-sdk/hcs';

const topicReader = new TopicReaderHederaHcs({
    networks: [
        { network: 'testnet', operatorId, operatorKey  },
        { network: 'local-node', operatorId, operatorKey  },
        {
          network: {
            name: 'custom-network',
            nodes: {
              'https://testnet-node00-00-grpc.hedera.com:443': new AccountId(3),
            },
          },
          operatorId,
          operatorKey,
        },
    ],
    cache: { maxSize: 100 }
},
);
const messages = await topicReader.fetchFrom('0.0.5217215', 'testnet', {
  from: 0, // Read messages from the start of the topic
  to: 1000, // Read messages to 1000 seconds from the start of the topic
});

console.log(messages);

const messages = await topicReader.fetchAllToDate('0.0.5217215', 'testnet');

console.log(messages);
TopicReaderHederaRestApi
The TopicReaderHederaRestApi class is a implementation of the TopicReader class that uses the Mirror Node REST API to read messages from the Hedera network topic.

import { TopicReaderHederaRestApi } from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaRestApi();
const messages = await topicReader.fetchFrom('0.0.5217215', 'testnet', {
  from: 0, // Read messages from the start of the topic
  to: 1000, // Read messages to 1000 seconds from the start of the topic
});
console.log(messages);
import { TopicReaderHederaRestApi } from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaRestApi();
const messages = await topicReader.fetchAllToDate('0.0.5217215', 'testnet');

console.log(messages);
Using Custom Rest API
By default, the TopicReaderHederaRestApi class uses the public Mirror Node REST API. You can use your own REST API endpoint by passing it to the constructor of the TopicReaderHederaRestApi class as a map of network names to REST API endpoints.

import { TopicReaderHederaRestApi } from '@hiero-did-sdk/resolver';

const topicReader = new TopicReaderHederaRestApi({
  mainnet: 'https://mainnet.example.com',
  testnet: 'https://testnet.example.com',
  previewnet: 'https://previewnet.example.com',
  'local-node': 'http://local.example.com',
});
Make sure that your API is compliant with the Hedera Mirror Node REST API specification.

# resolveDID Function
The resolveDID function is a core component of the Hiero DID SDK. It allows you to resolve a Decentralized Identifier (DID) registered on the Hedera network and retrieve its corresponding DID Document. This function handles the retrieval and cryptographic verification of the DID Document, ensuring its authenticity and integrity.

Resolving a DID Document
The following examples demonstrate how to use the resolveDID function to retrieve a DID Document in different formats.

As JSON-LD (Default)
This example shows how to resolve a DID and retrieve its corresponding DID Document in JSON-LD format.

import { resolveDID } from "@hiero-did-sdk/resolver";

const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to resolve

async function main() {
  try {
    const didDocument = await resolveDID(did);
    console.log(didDocument);
  } catch (error) {
    console.error("Error resolving DID:", error);
  }
}

main();
See a full running example in the source code.

As JSON
This example shows how to resolve a DID and retrieve its corresponding DID Document in JSON format.

import { resolveDID } from "@hiero-did-sdk/resolver";

const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to resolve

async function main() {
  try {
    const didDocument = await resolveDID(did, "application/did+json");
    console.log(didDocument);
  } catch (error) {
    console.error("Error resolving DID:", error);
  }
}

main();
See a full running example in the source code.

With Full Metadata
This example shows how to resolve a DID and retrieve its corresponding DID Document with full DID Resolution metadata.

import { resolveDID } from "@hiero-did-sdk/resolver";

const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to resolve

async function main() {
  try {
    const didDocument = await resolveDID(
      did,
      'application/ld+json;profile="https://w3id.org/did-resolution"'
    );
    console.log(didDocument);
  } catch (error) {
    console.error("Error resolving DID:", error);
  }
}

main();
See a full running example in the source code.

As CBOR
This example shows how to resolve a DID and retrieve its corresponding DID Document in CBOR format.

import { resolveDID } from "@hiero-did-sdk/resolver";

const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to resolve

async function main() {
  try {
    const didDocumentUintArray = await resolveDID(
      did,
      'application/did+cbor'
    );
    console.log(didDocumentUintArray);
  } catch (error) {
    console.error("Error resolving DID:", error);
  }
}

main();
See a full running example in the source code.

Using TopicReader
The resolveDID function accepts an optional options parameter that allows you to specify a custom TopicReader implementation. This is useful if you need to read messages not using a default gRPC Hedera client. It has many use cases, such as:

Reading messages from a Hedera network using a REST API.

Reading messages with additional caching capabilities.

Reading messages for testing or development purposes.

Example below shows how to use a custom TopicReader implementation to read messages from a Hedera network using a default gRPC Hedera client.

import {
  resolveDID,
  TopicReaderHederaClient,
} from '@hiero-did-sdk/resolver';

const did =
  'did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215';

async function main() {
  try {
    const topicReader = new TopicReaderHederaClient();
    const didDocument = await resolveDID(did, 'application/did+ld+json', {
      topicReader,
    });
    console.log(didDocument);
  } catch (error) {
    console.error('Error resolving DID:', error);
  }
}

main();
See a full running example in the source code.

Using Verifier
The resolveDID function accepts an optional options parameter that allows you to specify a custom Verifier implementation. This is useful if you need to verify the DID Document signature using a custom verifier.

Example below shows how to use a custom Verifier implementation to verify the DID Document signature using a default internal verifier.

import { resolveDID } from '@hiero-did-sdk/resolver';
import { Verifier } from '@hiero-did-sdk/verifier-internal';

const did =
  'did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215';

async function main() {
  try {
    const verifier = Verifier.fromBase58(
      '23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3',
    );
    const didDocument = await resolveDID(did, 'application/did+ld+json', {
      verifier,
    });
    console.log(didDocument);
  } catch (error) {
    console.error('Error resolving DID:', error);
  }
}

main();

# dereferenceDID Function
The dereferenceDID function is extended from the resolveDID function. It allows you to dereference a DID URL and retrieve the corresponding Verification Method, or Service.

Dereferencing a DID Document
The following examples demonstrate how to use the dereferenceDID function to retrieve a Verification Method or Service.

Dereference a DID Document Fragment
This example shows how to dereference a DID Document fragment. It can be used to retrieve a Verification Method, Verification Relationship, or Service. To dereference a DID Document fragment, the didUrl must contain a fragment. The fragment can be a verificationMethod, verificationRelationship, or service. For example, did:hedera:testnet:z6Mkhj…​#verificationMethod or did:hedera:testnet:z6Mkhj…​#service.

import { dereferenceDID } from '@hiero-did-sdk/resolver';

const didUrl =
  'did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215#did-root-key'; // Replace with the DID URL you want to dereference

async function main() {
  try {
    const verificationMethod = await dereferenceDID(didUrl);
    console.log(verificationMethod);
  } catch (error) {
    console.error('Error dereferencing DID:', error);
  }
}

main();
See a full running example in the source code.

Dereference a DID Document Service Endpoint
This example shows how to dereference a DID Document Service Endpoint. It can be used to retrieve a Service Endpoint. To dereference a DID Document Service Endpoint, the didUrl must contain a service parameter with additional relativeRef parameter. For example, did:hedera:testnet:z6Mkhj…​?service=github&relativeRef=hiero-did-sdk-js. As a result, the function will return the Service Endpoint of the github service. relativeRef is appended to the service endpoint as a path to the URL.

import { dereferenceDID } from '@hiero-did-sdk/resolver';

const didUrl =
  'did:hedera:testnet:3f3zxTz93CXnqhW3bNxqeyk8Gfk7v2yR27DRgSTYvHog_0.0.5278919?service=github&relativeRef=hiero-did-sdk-js';

async function main() {
  try {
    const serviceEndpoint = await dereferenceDID(didUrl);
    console.log(serviceEndpoint);
  } catch (error) {
    console.error('Error dereferencing DID:', error);
  }
}

main();
See a full running example in the source code.

Different accept values
dereferenceDID supports different accept values in the same way as resolveDID. Currently, the only supported accept value is application/ld+json;profile="https://w3id.org/did-resolution", application/did+json, application/did+ld+json and application/did+cbor. Based on the accept value, the function will return the corresponding Verification Method, Verification Relationship, or Service Endpoint in the corresponding format. application/did+json and application/did+ld+json are the same format, but application/did+ld+json adds @context to the JSON-LD document. application/ld+json;profile="https://w3id.org/did-resolution" adds resolution and content metadata to the result. The application/did+cbor format is a binary format of the dereferenced fragment.

In example below, the accept value is application/ld+json;profile="https://w3id.org/did-resolution". As a result, the function will return the Verification Method in JSON-LD format with resolution and content metadata.

import { dereferenceDID } from "@hiero-did-sdk/resolver";

const didUrl = "did:hedera:testnet:z6Mkhj...#did-root-key"; // Replace with the DID URL you want to resolve

async function main() {
  try {
    const verificationMethodResolution = await dereferenceDID(
      didUrl,
      'application/ld+json;profile="https://w3id.org/did-resolution"'
    );
    console.log(verificationMethodResolution);
  } catch (error) {
    console.error("Error dereferencing DID:", error);
  }
}

main();
See a full running example in the source code.

Using TopicReader
The dereferenceDID function accepts an optional options parameter that allows you to specify a custom TopicReader implementation. This is useful if you need to read messages from the Hedera network using a custom topic reader.

Example below shows how to use a custom TopicReader implementation to read messages from the Hedera network using a default gRPC Hedera client.

import {
  dereferenceDID,
  TopicReaderHederaClient,
} from '@hiero-did-sdk/resolver';

const didUrl =
  'did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215#did-root-key';

async function main() {
  try {
    const topicReader = new TopicReaderHederaClient();
    const verificationMethod = await dereferenceDID(
      didUrl,
      'application/did+ld+json',
      {
        topicReader,
      },
    );
    console.log(verificationMethod);
  } catch (error) {
    console.error('Error dereferencing DID:', error);
  }
}

main();
See a full running example in the source code.

Using Verifier
The dereferenceDID function accepts an optional options parameter that allows you to specify a custom Verifier implementation. This is useful if you need to verify the DID Document signature using a custom verifier.

Example below shows how to use a custom Verifier implementation to verify the DID Document signature using a default internal verifier.

import { dereferenceDID } from '@hiero-did-sdk/resolver';
import { Verifier } from '@hiero-did-sdk/verifier-internal';

const didUrl =
  'did:hedera:testnet:23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3_0.0.5217215#did-root-key';

async function main() {
  try {
    const verifier = Verifier.fromBase58(
      '23g2MabDNq3KyB7oeH9yYZsJTRVeQ24DqX8o6scB98e3',
    );
    const verificationMethod = await dereferenceDID(
      didUrl,
      'application/did+ld+json',
      {
        verifier,
      },
    );
    console.log(verificationMethod);
  } catch (error) {
    console.error('Error dereferencing DID:', error);
  }
}

main();

# createDID Function
The createDID function is a core component of the Hiero DID SDK, responsible for generating new DIDs for the Hedera DID method. It provides a flexible and user-friendly interface, allowing you to customize various aspects of the DID creation process.

Features
DID Creation: Generates and registers new DIDs on the Hedera network with customizable options.

Key Management: Supports various key types and formats for DID controllers and verification methods.

DID Document Generation: Automatically generates DID Documents conforming to the DID specification.

Hedera Network Support: Supports DID creation on the Hedera mainnet and testnet.

Error Handling: Provides robust error handling for invalid input, network issues, and other potential problems.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Creating a DID Document
The following examples demonstrate how to use the createDID function in different scenarios.

With Client Options
You can customize the Hedera network and account used for creating the DID by providing clientOptions to the createDID function.

const clientOptions = {
  privateKey: "0x...", // Replace with your Hedera account private key
  accountId: "0.0.0....", // Replace with your Hedera account ID
  network: "testnet",
};

const { did, didDocument, privateKey } = await createDID({
  clientOptions,
});
In this example, a Hedera Client instance is configured with essential parameters, including the Hedera account private key, account ID, and network. The function then returns the generated private key, the newly created DID, and its corresponding DID document.

See a full running example in the source code.

With a Hedera Client
You can provide a Hedera Client instance directly to the createDID function. This allows for more fine-grained control over the client configuration and network interaction.

const privateKey = "0x..."; // Replace with your Hedera account private key
const accountId = "0.0.0...."; // Replace with your Hedera account ID

const client = Client.forTestnet();
client.setOperator(accountId, privateKey);

const { did, didDocument } = await createDID({
  client,
});
In this example, a pre-configured Hedera Client instance is passed to the createDID function.

See a full running example in the source code.

With a Custom Controller
To modify the controller of a newly created DID, you can specify the desired controller as an argument to the createDID function. However, the provided controller must be a valid DID according to the Hedera method and must be active.

const { did, didDocument } = await createDID({
  controller: "did:hedera:mainnet:...", // Replace with your desired DID controller
}, { client });
In this example, the controller property is used to specify the desired controller for the newly created DID.

See a full running example in the source code.

With a Topic-Specific DID
In certain cases, it may be desirable to create a DID associated with a specific topic. This can be achieved by providing the relevant topic ID to the createDID function. It is important to ensure that the Client or Publisher being passed has the necessary permissions to submit content to that topic.

const { did, didDocument } = await createDID({
  topicId: "0.0.0...", // Replace with your desired topic ID
}, { client });
See a full running example in the source code.

Using Client Managed Secret Mode
In certain instances, keys are managed in a fashion that does not allow direct or indirect access by the SDK. Or you prefer to manage your keys yourself. In such a scenario, Client Managed Secret Mode can be utilized. In this mode, the DID SDK generates a signing request for you, so you can handle the signing process yourself. From it’s design, the process is divided into two steps: generateCreateDIDRequest and submitCreateDIDRequest.

The signing request contains all the necessary information about the algorithm of the signing and data to be signed. The serialized payload of the request is signed by the client and submitted to the SDK. The SDK then processes the request and creates the DID Document.

In order to create a DID using Client Managed Secret Mode, you need to provide a public key in multibase format to the generateCreateDIDRequest function. The public key is used as a DID root key.

const { state, signingRequest } = await generateCreateDIDRequest(
  {
    multibasePublicKey: publicMultibaseRootKey,
  },
  {
    client,
  },
);

const signature = await wallet.sign(signingRequest.serializedPayload);

const { did, didDocument } = await submitCreateDIDRequest(
  { state, signature },
  {
    client,
  },
);

# updateDID Function
The updateDID function, a core component of the Hiero DID SDK’s Registrar package, provides a flexible and user-friendly way to update existing DIDs for the Hedera DID method. It allows you to modify various aspects of a DID document, such as verification methods, relationships, and services, by submitting an update operation to the DID’s Hedera Topic. Each modification requires a separate message and potentially multiple signatures.

Features
DID Updating: Updates existing DIDs on the Hedera network, allowing modifications to DID Documents.

Flexible Updates: Supports various update operations, such as adding or removing verification methods, services, and other properties.

Secure Updates: Ensures secure and verifiable updates by leveraging the Hedera Consensus Service (HCS).

DID Document Versioning: Maintains a history of DID Document updates for auditability and transparency.

Hedera Network Support: Supports DID updates on the Hedera mainnet and testnet.

Error Handling: Provides robust error handling for invalid input, network issues, and other potential problems.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Updating a DID Document
The following examples demonstrate how to update a DID document using the updateDID function in different scenarios.

With Client Options
You can customize the Hedera network and account used for updating the DID by providing clientOptions to the updateDID function.

// Define client options with your Hedera account ID and private key
const clientOptions = {
  network: "testnet",
  accountId: "your-account-id",
  privateKey: "your-private-key"
};

const updatedDidDocument = await updateDID(
  "did:hedera:testnet:...", // Replace with the DID you want to update
  {
    updates: [
      {
        operation: "add-verification-method",
        // ... other properties
      },
      {
        operation: "add-service",
        // ... other properties
      }
    ],
    privateKey: "your-private-key" // Private key for signing the update
  },
  { clientOptions }
);
See a full running example in the source code.

With a Hedera Client
You can provide a Hedera Client instance directly to the updateDID function.

// Create a Hedera Client instance
const client = Client.forTestnet();
client.setOperator("your-account-id", "your-private-key");

const updatedDidDocument = await updateDID(
  "did:hedera:testnet:...", // Replace with the DID you want to update
  {
    updates: [
      {
        operation: "add-verification-method",
        // ... other properties
      },
      {
        operation: "add-service",
        // ... other properties
      }
    ],
    privateKey: "your-private-key" // Private key for signing the update
  },
  { client }
);
See a full running example in the source code.

With Multiple Properties
You can update multiple properties of a DID document simultaneously by providing an array of updates.

const updatedDidDocument = await updateDID(
  "did:hedera:testnet:...", // Replace with the DID you want to update
  {
    updates: [
      {
        operation: "add-verification-method",
        // ... other properties
      },
      {
        operation: "add-verification-method",
        // ... other properties
      },
      {
        operation: "remove-service",
        // ... other properties
      }
    ],
    privateKey: "your-private-key" // Private key for signing the update
  },
  { client }
);
See a full running example in the source code.

With the DIDUpdateBuilder Class
The DIDUpdateBuilder class provides a convenient way to construct and execute DID update operations. It offers methods for adding, removing, or modifying various components of a DID document, such as verification methods, services, and other properties. This builder simplifies the creation of complex DID updates while ensuring compliance with the Hedera DID method specification.

To use the DIDUpdateBuilder:

Create an instance: Using new DIDUpdateBuilder() create new builder instance.

Specify modifications: Use the builder’s methods (e.g., addVerificationMethod, removeService).

Build operations: Call build() to generate the update operations.

Execute the update: Pass the generated operations to the updateDID function.

Managing Verification Methods
Verification methods prove the authenticity of a DID Document.

Adding: Use addVerificationMethod(verificationMethod) to add a VerificationMethod object. You can call this method multiple times to add multiple verification methods.

    const builder = new DIDUpdateBuilder()
      .addVerificationMethod({
        id: "#key-1",
        controller: "did:hedera:mainnet:...",
        publicKeyMultibase: "z6Mk...",
      })
      .addVerificationMethod({
        // ... another verification method
      })
      .build();
Adding as a reference: You can also add a verification method by providing the ID of an existing method. This will create a reference to the existing method in the DID Document.

    const builder = new DIDUpdateBuilder()
      .addVerificationMethod("#key-1")
      .build();
Removing: Use removeVerificationMethod(verificationMethodId) to remove a verification method by its ID.

    const builder = new DIDUpdateBuilder()
      .removeVerificationMethod("#key-1")
      .build();
Managing Services
Services provide additional information about a DID Document.

Adding: Use addService(service) to add a Service object. You can call this method multiple times.

    const builder = new DIDUpdateBuilder()
      .addService({
        id: "#service-1",
        type: "LinkedDomains",
        serviceEndpoint: "https://example.com",
      })
      .addService({
        // ... another service
      })
      .build();
Removing: Use removeService(serviceId) to remove a service by its ID.

    const builder = new DIDUpdateBuilder()
      .removeService("#service-1")
      .build();
Managing Verification Relationships
Verification relationships express the relationship between a verification method and a DID subject (e.g., authentication, assertion).

Adding: Use specific methods for each relationship type (see the DIDUpdateBuilder API Reference). You can add a relationship by providing a VerificationMethod object or using the ID of an existing verification method.

    const builder = new DIDUpdateBuilder()
      .addCapabilityInvocationMethod({
        id: "#key-1",
        controller: "did:hedera:mainnet:...",
        publicKeyMultibase: "z6Mk...",
      })
      .addAuthenticationMethod("#key-2") // Using an existing method's ID
      .build();
Removing: Use the corresponding removal method for the relationship type (e.g., removeCapabilityInvocationMethod(verificationMethodId)).

    const builder = new DIDUpdateBuilder()
      .removeCapabilityInvocationMethod("#key-1")
      .build();
See a full running example in the source code.

Using Client Managed Secret Mode
In certain instances, keys are managed in a fashion that does not allow direct or indirect access by the SDK. Or you prefer to manage your keys yourself. In such a scenario, Client Managed Secret Mode can be utilized. In this mode, the DID SDK generates a signing request for you, so you can handle the signing process yourself. From it’s design, the process is divided into two steps: generateUpdateDIDRequest and submitUpdateDIDRequest.

The signing request contains all the necessary information about the algorithm of the signing and data to be signed. The serialized payload of the request is signed by the client and submitted to the SDK. The SDK then processes the request and update the DID Document.

const { states, signingRequests } = await generateUpdateDIDRequest(
  {
    did,
    updates: new DIDUpdateBuilder()
      .addService({
        id: '#service-1',
        type: 'VerifiableCredentialService',
        serviceEndpoint: 'https://example.com/vc/',
      })
      .build(),
  },
  {
    client,
  },
);

const signatures = Object.keys(signingRequests).reduce((acc, request) => {
  const signingRequest = signingRequests[request];
  const signature = await wallet.sign(signingRequest.serializedPayload);

  return {
    ...acc,
    [request]: signature,
  };
}, {});

const updatedDidDocument = await submitUpdateDIDRequest(
  { states, signatures },
  {
    client,
  },
);

# deactivateDID Function
The deactivateDID function is a core component of the Hiero DID SDK, responsible for deactivating existing DIDs for the Hedera DID method. This action effectively revokes the DID, making it unusable for future operations.

Features
DID Deactivation: Deactivates registered DIDs on the Hedera network, revoking their validity.

Secure Deactivation: Ensures secure and verifiable deactivation by leveraging the Hedera Consensus Service (HCS).

DID Document Update: Updates the DID Document to reflect the deactivated status of the DID.

Hedera Network Support: Supports DID deactivation on the Hedera mainnet and testnet.

Error Handling: Provides robust error handling for invalid input, network issues, and other potential problems.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Deactivating a DID Document
The following examples demonstrate how to deactivate a DID document using the deactivateDID function in different scenarios.

With Client Options
You can customize the Hedera network and account used for deactivating the DID by providing clientOptions to the deactivateDID function.

const clientOptions = {
  privateKey: "0x...", // Replace with your Hedera account private key
  accountId: "0.0.0....", // Replace with your Hedera account ID
  network: "testnet",
};

await deactivateDID({ did }, { clientOptions });
In this example, deactivateDID takes the DID to be deactivated and an object containing the clientOptions. This configuration object should include the necessary information to interact with the Hedera network, such as the private key, account ID, and network.

See a full running example in the source code.

With a Hedera Client
You can provide a Hedera Client instance directly to the deactivateDID function. This allows for more fine-grained control over the client configuration and network interaction.

const client = Client.forTestnet();
client.setOperator(accountId, privateKey);

await deactivateDID({ did }, { client });
In this example, a pre-configured Hedera Client instance is passed to the deactivateDID function.

See a full running example in the source code.

Using Client Managed Secret Mode
In certain instances, keys are managed in a fashion that does not allow direct or indirect access by the SDK. Or you prefer to manage your keys yourself. In such a scenario, Client Managed Secret Mode can be utilized. In this mode, the DID SDK generates a signing request for you, so you can handle the signing process yourself. From it’s design, the process is divided into two steps: generateDeactivateDIDRequest and submitDeactivateDIDRequest.

The signing request contains all the necessary information about the algorithm of the signing and data to be signed. The serialized payload of the request is signed by the client and submitted to the SDK. The SDK then processes the request and deactivate the DID Document.

const { state, signingRequest } = await generateDeactivateDIDRequest(
  {
    did,
  },
  {
    client,
  },
);

const signature = await wallet.sign(signingRequest.serializedPayload);

const deactivatedDidDocument = await submitDeactivateDIDRequest(
  {
    state,
    signature,
  },
  {
    client,
  },
);

# Signer Class
The Signer is a fundamental component of the Hiero DID SDK, responsible for securely managing cryptographic keys and generating digital signatures for DID operations. These signatures are essential for ensuring the authenticity and integrity of actions like creating, updating, or deactivating a DID. The Signer supports the Hedera DID method, adhering to the DID specification and integrating seamlessly with the Hedera ecosystem.

This component provides a standardized way to handle cryptographic operations, enhancing security and simplifying DID management within the SDK.

Features
Key Generation: Generates secure key pairs for use with DIDs.

Signature Generation: Creates digital signatures for DID operations, ensuring authenticity and integrity.

Signature Verification: Verifies digital signatures to validate the origin and integrity of data.

Key Management: Provides a standardized interface for managing cryptographic keys.

Compatibility: Supports various key formats and algorithms.

Error Handling: Includes robust error handling for invalid keys and other potential issues.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Using the Signer
Generating a Key Pair and Signing a Message
This example demonstrates how to generate a new key pair using the Signer and sign a message:

import { Signer } from "@hiero-did-sdk/signer-internal"; // Import from signer-internal

async function main() {
  const signer = Signer.generate();
  const publicKey = await signer.publicKey();

  console.log(`Public Key: ${publicKey}`);

  const message = new Uint8Array([1, 2, 3, 4, 5]);
  const signature = await signer.sign(message);

  console.log(`Signature: ${signature}`);
}

main();
Verifying a Signature
This example demonstrates how to verify a signature using the Signer:

import { Signer } from "@hiero-did-sdk/signer-internal"; // Import from signer-internal

async function main() {
  const signer = Signer.generate();
  const publicKey = await signer.publicKey();

  console.log(`Public Key: ${publicKey}`);

  const message = new Uint8Array([1, 2, 3, 4, 5]);
  const signature = await signer.sign(message);

  console.log(`Signature: ${signature}`);

  const isValid = await signer.verify(message, signature);
  console.log(`Signature valid? ${isValid}`);
}

main();

# Verifier Class
The Verifier is a fundamental component of the Hiero DID SDK, responsible for verifying digital signatures. Proper signature verification is essential for ensuring the authenticity and integrity of data, especially in the context of decentralized identifiers (DIDs). The Verifier supports the Hedera DID method, adhering to the DID specification and integrating seamlessly with the Hedera ecosystem.

This component provides a standardized way to verify the authenticity and integrity of data, ensuring that it has not been tampered with.

Features
Signature Verification: Verifies digital signatures to validate the origin and integrity of data.

Compatibility: Supports various key formats.

Error Handling: Includes robust error handling for invalid keys and other potential issues.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Using the Verifier
Verifying a Signature
This example demonstrates how to verify a signature using the Verifier:

import { Verifier } from "@hiero-did-sdk/verifier-internal"; // Import from verifier-internal

async function main() {
  const verifier = new Verifier(publicKey);

  const isValid = await verifier.verify(message, signature);
  console.log(`Signature valid? ${isValid}`);
}

main();
Creating a Verifier from a multibase-encoded Public Key
This example demonstrates how to create a Verifier instance from a multibase-encoded public key:

import { Verifier } from "@hiero-did-sdk/verifier-internal"; // Import from verifier-internal

async function main() {
  const verifier = Verifier.fromMultibase(multibasePublicKey);

  const publicKey = await verifier.publicKey();
  console.log(`Verifier public key: ${publicKey}`);
}

main();
Creating a Verifier from a base58-encoded Public Key
This example demonstrates how to create a Verifier instance from a base58-encoded public key:

import { Verifier } from "@hiero-did-sdk/verifier-internal"; // Import from verifier-internal

async function main() {
  const verifier = Verifier.fromBase58(base58PublicKey);

  const publicKey = await verifier.publicKey();
  console.log(`Verifier public key: ${publicKey}`);
}

# HashiCorp Vault Signer Class
The Signer is a fundamental component of the Hiero DID SDK, responsible for securely managing cryptographic keys and generating digital signatures for DID operations. The HashiCorp Vault Signer is a specialized implementation of the Signer that integrates with HashiCorp Vault to securely store and manage cryptographic keys. This guide provides an overview of the HashiCorp Vault Signer and demonstrates how to use it within the SDK.

This component provides a VaultSignerFactory class that allows you to create a Signer instance that uses HashiCorp Vault as the key store. The VaultSignerFactory class requires authentication credentials to access the HashiCorp Vault server.

Features
Key Management: Create new Ed25519 keys or use existing ones stored in HashiCorp Vault for flexible key handling.

Signing and Verification: Sign DID operations securely using Vault-managed Ed25519 keys.

Authentication: Supports authentication via Vault tokens, user/password, and AppRole for secure access.

Security: Keeps private keys inside Vault, ensuring strong protection and controlled access.

Vault Integration: Seamlessly interacts with HashiCorp Vault for key storage, retrieval, and signing operations.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Authentication with HashiCorp Vault
Refer to the following sections to learn how to authenticate the VaultSignerFactory with HashiCorp Vault using different methods. Remember to configure the HashiCorp Vault server and create the necessary roles and policies before proceeding.

Using a Vault Token
This example demonstrates how to authenticate VaultSignerFactory with HashiCorp Vault using an access token:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-vault-token",
});
Using a Username and Password
The VaultSignerFactory can also authenticate with HashiCorp Vault using a username and password:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithUsernameAndPassword({
  url: "http://localhost:8200",
  username: "your-username",
  password: "your-password",
});
Using AppRole
Another way to authenticate with HashiCorp Vault is by using the AppRole method:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithUsernameAndPassword({
  url: "http://localhost:8200",
  roleId: "your-role-id",
  secretId: "your-role-secret-id",
});
Using a secrets engine different path
If you are using a secrets engine with a different path then transit, you can specify the path when authenticating with the VaultSignerFactory. For example, if you are using the transit secrets engine with the path did, you can authenticate as follows:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  transitPath: "did", // Specify the path of the secrets engine
  token: "your-token",
});
Creating a Vault Signer
After authenticating with HashiCorp Vault, you can create a Signer instance using the VaultSignerFactory. You can either create a new Ed25519 key pair or use an existing key stored in HashiCorp Vault.

Creating a New Key Pair
This example demonstrates how to create a new Ed25519 key pair in HashiCorp Vault and create a Signer instance:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const signer = await factory.forNewKey('new-key-name');
Using an Existing Key
You can also use an existing Ed25519 key stored in HashiCorp Vault to create a Signer instance:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const signer = await factory.forKey('existing-key-name');
The forKey method will validate if a key with the given name exists in the Vault and if it is an Ed25519 key. If the key does not exist or is not an Ed25519 key, an error will be thrown.

Signing with Vault Signer
Once you have created a Signer instance using the VaultSignerFactory, you can use it to sign DID operations securely. The Signer provides a sign method that takes a message as input and returns a digital signature.

This example demonstrates how to sign a message using the Vault Signer:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const signer = await factory.forKey('existing-key-name');

const message = new Uint8Array([1, 2, 3, 4, 5]);
const signature = await signer.sign(message);
This will generate a digital signature for the given message using the Ed25519 key stored in HashiCorp Vault.

Verifying a Signature
You can also verify a digital signature using the Signer instance. The verify method takes the original message and the signature as input and returns a boolean indicating whether the signature is valid.

This example demonstrates how to verify a signature using the Vault Signer:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const signer = await factory.forKey('existing-key-name');

const message = new Uint8Array([1, 2, 3, 4, 5]);
const signature = await signer.sign(message);

const isValid = await signer.verify(message, signature);
console.log(`Signature valid? ${isValid}`);
Getting the Public Key
You can also retrieve the public key associated with the Signer instance using the publicKey method. This method returns the public key in the DER format.

This example demonstrates how to retrieve the public key using the Vault Signer:

import { VaultSignerFactory } from "@hiero-did-sdk/signer-hashicorp-vault";


const factory = VaultSignerFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const signer = await factory.forKey('existing-key-name');

const publicKey = await signer.publicKey();
Rotating Vault Keys
HashiCorp Vault provides a key rotation mechanism that allows you to rotate keys periodically for enhanced security. Unfortunately, the Hiero DID SDK does not currently support key rotation for Vault-managed keys both manually and automatically. Because of this, if a key has multiple versions in Vault, the SDK will always use the first version.

# HashiCorp Vault Verifier Class
The Verifier class in the Hiero DID SDK allows you to verify digital signatures using Ed25519 keys stored in HashiCorp Vault. This guide provides an overview of the Verifier class and demonstrates how to use it to verify signatures securely.

Features
Key Management: Use Ed25519 keys stored in HashiCorp Vault for flexible key handling.

Verification: Verify DID operations securely using Vault-managed Ed25519 keys.

Authentication: Supports authentication via Vault tokens, user/password, and AppRole for secure access.

Security: Keeps private keys inside Vault, ensuring strong protection and controlled access.

Vault Integration: Seamlessly interacts with HashiCorp Vault for key storage, retrieval, and verification operations.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Authentication with HashiCorp Vault
Refer to the following sections to learn how to authenticate the VaultVerifierFactory with HashiCorp Vault using different methods. Remember to configure the HashiCorp Vault server and create the necessary roles and policies before proceeding.

Using a Vault Token
This example demonstrates how to authenticate VaultVerifierFactory with HashiCorp Vault using an access token:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-vault-token",
});
Using a Username and Password
The VaultVerifierFactory can also authenticate with HashiCorp Vault using a username and password:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithUsernameAndPassword({
  url: "http://localhost:8200",
  username: "your-username",
  password: "your-password",
});
Using AppRole
Another way to authenticate with HashiCorp Vault is by using the AppRole method:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithUsernameAndPassword({
  url: "http://localhost:8200",
  roleId: "your-role-id",
  secretId: "your-role-secret-id",
});
Using a secrets engine different path
If you are using a secrets engine with a different path then transit, you can specify the path when authenticating with the VaultVerifierFactory. For example, if you are using the transit secrets engine with the path did, you can authenticate as follows:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithToken({
  url: "http://localhost:8200",
  transitPath: "did", // Specify the path of the secrets engine
  token: "your-token",
});
Creating a Vault Verifier
After authenticating with HashiCorp Vault, you can create a Verifier instance using the VaultVerifierFactory. It will enable use an existing key stored in HashiCorp Vault.

Using an Existing Key
This example demonstrates how to create a Verifier instance using an existing Ed25519 key stored in HashiCorp Vault:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const verifier = await factory.forKey('existing-key-name');
The forKey method will validate if a key with the given name exists in the Vault and if it is an Ed25519 key. If the key does not exist or is not an Ed25519 key, an error will be thrown.

Verifying a Signature
Once you have created a Verifier instance using the VaultVerifierFactory, you can use it to verify digital signatures. The verify method takes the message and signature as input and returns a boolean value indicating whether the signature is valid.

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const verifier = await factory.forKey('existing-key-name');

const message = new Uint8Array([1, 2, 3, 4, 5]);
const signature = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);

const isValid = await verifier.verify(message, signature);
console.log(`Signature valid? ${isValid}`);
Getting the Public Key
You can also retrieve the public key associated with the Verifier instance using the publicKey method. This method returns the public key in the DER format.

This example demonstrates how to retrieve the public key using the Vault Verifier:

import { VaultVerifierFactory } from "@hiero-did-sdk/verifier-hashicorp-vault";


const factory = VaultVerifierFactory.loginWithToken({
  url: "http://localhost:8200",
  token: "your-token",
});

const verifier = await factory.forKey('existing-key-name');

const publicKey = await verifier.publicKey();

# HederaHcsService Guide
The @hiero-did-sdk/hcs package provides powerful tools and services for interacting with Hedera Consensus Service (HCS) topics and messages. The package also implements support for the HCS-1 standard for file storage based on the Hedera ledger.

Overview
Use @hiero-did-sdk/hcs to:

Create, update, and delete HCS topics.

Publish and retrieve messages in HCS topics.

Store and retrieve files using Hedera Consensus Service file abstraction (HCS-1 standard).

Integrate caching and efficient retrieval for topic metadata and info.

Package Architecture
hcs service diagram
HederaHcsService - A service wrapper providing a convenient API for integration with the Hedera Consensus Service (HCS).

HcsTopicService - A service for managing HCS Topics.

HcsMessageService - A service for submitting and resolving HCS messages.

HcsFileService - A service creating and resolving files on HCS according to HCS-1 standard.

HcsCacheService - A service providing data caching functionality.

Initialization
HederaHcsService accepts the following parameters:

networks: NetworkConfig[]; - Network configuration for initialization.

cache?: CacheConfig | Cache; - Cache service parameters for initializing HcsCacheService.

Network option
export const HEDERA_NETWORKS = ['mainnet', 'testnet', 'previewnet', 'local-node'] as const;

export type HederaNetwork = (typeof HEDERA_NETWORKS)[number];

export type HederaCustomNetwork = {
  name: string;
  nodes: {
    [key: string]: string | AccountId;
  };
  mirrorNodes?: string | string[] | undefined;
};

export interface NetworkConfig {
  network: HederaNetwork | HederaCustomNetwork;
  operatorId: string;
  operatorKey: string;
}

export interface HederaClientConfiguration {
  networks: NetworkConfig[];
}
Networks configuration described in the Client API Reference

Cache option
export type CacheConfig = {
  maxSize: number;
};

export interface Cache {
  get<CacheValue>(key: string): Promise<CacheValue | null>;
  set<CacheValue>(key: string, value: CacheValue, expiresInSeconds?: number): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  cleanupExpired(): Promise<void>;
}
When initializing the cache, you can either use an external cache that implements the interface described in the Core API Reference, or create a cache by specifying the maximum number of elements maxSize. In this case, the network configuration described in the LRU Cache guide will be used.

Example
const options = {
    networks: [
        { network: 'testnet', operatorId, operatorKey  },
        { network: 'local-node', operatorId, operatorKey  },
        {
          network: {
            name: 'custom-network',
            nodes: {
              'https://testnet-node00-00-grpc.hedera.com:443': new AccountId(3),
            },
          },
          operatorId,
          operatorKey,
        },
    ],
    cache: { maxSize: 100 }
}
Basic Usage
Creating a Topic
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.createTopic({
  networkName: 'testnet',
  topicMemo: "Topic Memo",
  waitForChangesVisibility: true,
});

console.log(topic);
Updating a Topic
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.updateTopic({
  networkName: 'testnet',
  topicMemo: "New Topic Memo",
  waitForChangesVisibility: true,
});

console.log(topic);
Deleting a Topic
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.deleteTopic({
  topicId,
  currentAdminKey: PrivateKey.fromStringDer(operatorKey),
  waitForChangesVisibility: true,
});

console.log(topic);
Fetching Topic Info
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.getTopicInfo({
  topicId: "0.0.123"
});

console.log(topic);
Publishing Messages
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.submitMessage({
  networkName: 'testnet',
  topicId: 'topicId',
  message: 'message',
});

console.log(topic);
Fetching Topic Messages
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.getTopicMessages({
  networkName: 'testnet',
  topicId: '0.0.123'
});

console.log(topic);
Storing Files
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey }
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.submitFile({
  payload: Buffer.from('This is a test content'),
  submitKey: PrivateKey.generate(),
  waitForChangesVisibility: true,
});

console.log(topic);
Resolving Files
import { HederaHcsService } from '@hiero-did-sdk/hcs';

const hcsService = new HederaHcsService({
  networks: [
    { 'testnet', operatorId, operatorKey },
  ],
  cache: { maxSize: 100 },
});

const topic = await hcsService.resolveFile({ topicId: '0.0.123' };

console.log(topic);

# HcsTopicService Guide
The @hiero-did-sdk/hcs package provides HcsTopicService — a dedicated service for managing Hedera Consensus Service topics, including creation, updating, deletion, and querying topic info.

Overview
HcsTopicService allows developers to:

Create new HCS topics with optional memo, admin and submit keys, and auto-renew settings.

Update existing topics, including changing keys, memo, expiration, and auto-renew parameters.

Delete topics securely with proper authorization.

Retrieve topic metadata and state information efficiently.

Initialization
constructor(
  client: Client,
  cache?: CacheConfig | Cache | HcsCacheService
)
Create a new HcsTopicService instance.

client: Hedera SDK client instance for network operations.

cache: Optional cache configuration or instance to enhance performance by caching topic info.

Basic Usage
Creating a Topic
const topicService = new HcsTopicService(client, cache);

const topicId = await topicService.createTopic({
  topicMemo: "Example Topic",
  adminKey: adminPrivateKey,
  submitKey: submitPrivateKey,
  autoRenewPeriod: 7776000, // 90 days in seconds
  waitForChangesVisibility: true,
  waitForChangesVisibilityTimeoutMs: 60000,
});

console.log("Created topic ID:", topicId);
Parameters:

topicMemo (optional): Description or memo for the topic.

adminKey (optional): Private key with admin rights.

submitKey (optional): Private key permitted to submit messages.

autoRenewPeriod (optional): Topic auto-renew period in seconds.

waitForChangesVisibility (optional): Wait until topic visibility confirmed in mirror node.

waitForChangesVisibilityTimeoutMs (optional): Timeout for waiting visibility in milliseconds.

Updating a Topic
await topicService.updateTopic({
  topicId: existingTopicId,
  currentAdminKey: adminPrivateKey,
  topicMemo: "Updated Memo",
  submitKey: newSubmitKey,
  adminKey: newAdminKey,
  autoRenewPeriod: 7776000, // 90 days in seconds
  autoRenewAccountId: "0.0.1234", // optional
  autoRenewAccountKey: autoRenewPrivateKey, // required if autoRenewAccountId is set
  expirationTime: new Date('2025-01-01T00:00:00Z'), // optional
  waitForChangesVisibility: true,
  waitForChangesVisibilityTimeoutMs: 60000,
});
Parameters:

topicId (required): The ID of the topic to update.

currentAdminKey (required): Private key of the current admin authorizing the update.

topicMemo (optional): New memo for the topic. To clear, set as empty string.

submitKey (optional): New submit key.

adminKey (optional): New admin key.

autoRenewPeriod (optional): New auto-renewal period in seconds.

autoRenewAccountId (optional): Account ID to be charged for auto-renewal fees.

autoRenewAccountKey (optional): Private key for the auto-renew account; required if autoRenewAccountId is provided.

expirationTime (optional): New expiration time for the topic.

waitForChangesVisibility (optional): Wait until updated topic info is visible in mirror node.

waitForChangesVisibilityTimeoutMs (optional): Timeout in milliseconds for visibility wait.

Deleting a Topic
await topicService.deleteTopic({
  topicId: existingTopicId,
  currentAdminKey: adminPrivateKey,
  waitForChangesVisibility: true,
  waitForChangesVisibilityTimeoutMs: 60000,
});
Parameters:

topicId (required): The ID of the topic to delete.

currentAdminKey (required): Private key of the current admin authorizing the deletion.

waitForChangesVisibility (optional): Wait until deletion is confirmed visible in the mirror node.

waitForChangesVisibilityTimeoutMs (optional): Timeout in milliseconds for visibility wait.

Fetching Topic Info
const topicInfo = await topicService.getTopicInfo({
  topicId: topicId,
});

console.log("Topic info:", topicInfo);
Parameters:

topicId (required): The ID of the topic to retrieve info for.

Returns an object with the topic information, including memo, admin and submit keys (in string format), auto-renew period, auto-renew account, and expiration time if present.

# HcsMessageService Guide
The @hiero-did-sdk/hcs package provides the HcsMessageService — a dedicated service for submitting messages to and retrieving messages from Hedera Consensus Service (HCS) topics.

Overview
HcsMessageService enables developers to:

Submit messages to HCS topics with optional signing and visibility confirmation.

Retrieve and stream messages from topics efficiently, with cache support.

Handle chunked messages and maintain message ordering and uniqueness.

Use underlying Hedera SDK client or mirror node REST API for fetching messages.

Initialization
constructor(client: Client, cache?: CacheConfig | Cache | HcsCacheService)
Create a new HcsMessageService instance.

client: Hedera SDK client instance for HCS operations.

cache: Optional cache configuration or cache service instance to improve message retrieval efficiency.

Basic Usage
Submitting a Message
const messageService = new HcsMessageService(client, cache);

const result = await messageService.submitMessage({
  topicId: '0.0.1234',
  message: 'Hello Hedera Consensus Service!',
  submitKey: submitPrivateKey, // Optional signing key
  waitForChangesVisibility: true, // Wait until message visible on mirror node
  waitForChangesVisibilityTimeoutMs: 60000, // Wait timeout in milliseconds
});

console.log("Message submitted:", result);
Parameters:

topicId (string, required): The identifier of the topic to submit the message to.

message (string, required): The message content.

submitKey (PrivateKey, optional): Private key to sign the submission transaction.

waitForChangesVisibility (boolean, optional): Whether to wait until the message is confirmed visible on the mirror node.

waitForChangesVisibilityTimeoutMs (number, optional): Timeout in milliseconds to wait for visibility confirmation.

Returns an object containing:

nodeId: ID of the node that processed the transaction.

transactionId: The transaction ID.

transactionHash: Cryptographic hash of the transaction.

Retrieving Topic Messages
const messages = await messageService.getTopicMessages({
  topicId: '0.0.1234',
  maxWaitSeconds: 10, // Optional max wait time while polling for new messages
  toDate: new Date(), // Optional upper bound for messages
  limit: 100, // Optional limit on number of messages returned
});

console.log("Retrieved messages:", messages);
Parameters:

topicId (string, required): The topic ID to retrieve messages from.

maxWaitSeconds (number, optional): Maximum wait time in seconds when polling.

toDate (Date, optional): Retrieve messages up to this timestamp.

limit (number, optional): Maximum number of messages to retrieve.

Returns an array of objects each containing:

consensusTime (Date): The consensus timestamp of the message.

contents (Uint8Array): The raw message content as bytes.

# HcsFileService Guide
The @hiero-did-sdk/hcs package provides the HcsFileService — a service for managing file storage on Hedera Consensus Service (HCS) topics using the HCS-1 standard, which supports chunked file uploads with compression.

Overview
HcsFileService allows developers to:

Submit files (potentially large, chunked, and compressed) to Hedera topics.

Resolve and reconstruct files previously submitted to HCS topics.

Handle automatic compression and decompression using Zstandard.

Verify file integrity through memo-based checksum validation.

Integrate with caching to optimize file retrieval.

Initialization
constructor(client: Client, cache?: CacheConfig | Cache | HcsCacheService)
Instantiate a new HcsFileService.

client: Hedera SDK client instance used for network operations.

cache: Optional cache config or instance to support caching resolved files.

Basic Usage
Submitting a File
const fileService = new HcsFileService(client, cache);

const topicId = await fileService.submitFile({
  payload: Buffer.from('Large file content here'),
  submitKey: submitPrivateKey, // Signing key for transactions
  waitForChangesVisibility: true, // Wait until file is visible on the network
  waitForChangesVisibilityTimeoutMs: 60000 // Milliseconds to wait for visibility confirmation
});

console.log("File submitted to topic:", topicId);
Parameters:

payload (Buffer, required): The file content to submit.

submitKey (PrivateKey, required): Key to sign each chunk submission transaction.

waitForChangesVisibility (boolean, optional): Wait for full file visibility after submission.

waitForChangesVisibilityTimeoutMs (number, optional): Timeout in milliseconds to wait.

Returns the Hedera topic ID (string) where the file was submitted.

Resolving a File
const fileBuffer = await fileService.resolveFile({
  topicId: "0.0.1234"
});

console.log("Resolved file contents:", fileBuffer.toString());
Parameters:

topicId (string, required): The topic ID where the file was stored.

Returns:

A Buffer containing the fully decompressed and reconstructed file content.

Throws an error if the file cannot be found or integrity verification fails.

Details
Files are split into chunks respecting Hedera transaction size limits.

Chunk messages are compressed using Zstandard and encoded in base64 before submission.

The topic memo encodes the SHA-256 hash of the file and compression details for validation.

During resolution, chunks are fetched in order, base64 decoded, decompressed, and concatenated.

Cache service is used when available, to speed up repeated retrievals.

# Publisher Class
The Publisher is a core component within the Hiero DID SDK. It streamlines interactions with the distributed ledger by providing a standardized way to submit, execute, and pay for transactions. This ensures that DID-related operations are reliably processed and recorded on the network. The Publisher interface promotes interoperability and simplifies the development of DID applications, abstracting away the complexities of direct ledger interactions.

Features
Transaction Submission: Submits transactions to the Hedera network for DID operations.

Transaction Execution: Executes transactions on the Hedera network, ensuring reliable processing.

Network Interaction: Provides a streamlined interface for interacting with the Hedera network.

Network Detection: Automatically detects the Hedera network environment (mainnet, testnet).

Error Handling: Includes robust error handling for transaction failures and network issues.

Extensibility: Designed for extensibility to support future Hedera network features.

TypeScript Support: Built with TypeScript to enhance developer experience and type safety.

Using the Publisher
Submitting a Transaction
This example demonstrates how to submit a simple transaction using the Publisher:

import { Publisher } from "@hiero-did-sdk/publisher-internal";
import { Client, PrivateKey, TransferTransaction } from "@hashgraph/sdk";

async function main() {
  // Configure the Hedera client
  const client = Client.forTestnet();
  const privateKey = PrivateKey.fromString("your-private-key-here");
  client.setOperator("your-account-id-here", privateKey);

  // Create a new Publisher instance
  const publisher = new Publisher(client);

  // Create a simple transfer transaction (replace with your actual transaction)
  const transaction = new TransferTransaction()
    .addHbarTransfer("your-account-id-here", -1) // Sending 1 HBAR
    .addHbarTransfer("0.0.3", 1); // To account 0.0.3

  // Submit the transaction
  try {
    const receipt = await publisher.publish(transaction);
    console.log(`Transaction Receipt: ${JSON.stringify(receipt, null, 2)}`);
  } catch (error) {
    console.error("Error submitting transaction:", error);
  }
}

main();

# HederaAnoncredsRegistry Guide
The @hiero-did-sdk/anoncreds package provides the HederaAnoncredsRegistry — a service to manage AnonCreds schemas, credential definitions, revocation registries, and revocation status lists on the Hedera Consensus Service (HCS) ledger, enabling decentralized issuance and verification of zero-knowledge proof based credentials.

Overview
HederaAnoncredsRegistry enables developers to:

Register and retrieve credential schemas defining sets of attributes.

Register and resolve credential definitions linking schemas to issuers with cryptographic material.

Register and resolve revocation registries and their definitions to manage credential revocation state.

Register and fetch revocation status lists reflecting issued and revoked credentials over time.

Use Hedera HCS topics as a scalable Verifiable Data Registry following AnonCreds specifications.

Package Architecture
The service integrates with the underlying HederaHcsService for interacting with the ledger, leveraging submission and retrieval of files and messages encoded as AnonCreds objects.

Initialization
constructor(config: HederaAnoncredsRegistryConfiguration)
Create a new instance of the HederaAnoncredsRegistry.

Parameters
config (required): Configuration object for the registry, including network and client settings.

Basic Usage
Registering a Schema
const registry = new HederaAnoncredsRegistry(config);

const schema = {
  name: "EmployeeCredential",
  issuerId: issuerDid,
  attrNames: ["name", "employeeId", "department"],
  version: "1.0"
};

const registerSchemaResult = await registry.registerSchema({
  networkName: "testnet",
  issuerKeyDer: PrivateKey.generate().toStringDer(),
  schema,
});

console.log("Schema registration result:", registerSchemaResult);
Parameters:

networkName (optional): The Hedera network name to use.

issuerKeyDer (required, string): The issuer private key in the DER format.

schema (required): An object describing the credential schema including name, issuer DID, attribute names, and version.

Returns a result object describing registration state and metadata.

Getting a Schema
const resolvedSchema = await registry.getSchema(schemaId);

console.log("Resolved schema:", resolvedSchema);
Parameters:

schemaId (required): The schema identifier to resolve on ledger.

Returns the schema object and associated metadata.

Registering a Credential Definition
const credDef = {
  schemaId: schemaId,
  issuerId: issuerDid,
  value: cryptographicPublicKeys,
  tag: "tag1"
};

const registerCredDefResult = await registry.registerCredentialDefinition({
  networkName: "testnet",
  issuerKeyDer: PrivateKey.generate().toStringDer(),
  credentialDefinition: credDef,
  options: { supportRevocation: true }
});

console.log("Credential Definition registration result:", registerCredDefResult);
Parameters:

networkName (optional): Hedera network name.

issuerKeyDer (required, string): The issuer private key in the DER format.

credentialDefinition (required): An object defining the credential definition, linking schema and issuer with cryptographic parameters.

options (optional): Metadata options such as revocation support flag.

Returns a result object with registration state and metadata.

Getting a Credential Definition
const resolvedCredDef = await registry.getCredentialDefinition(credentialDefinitionId);

console.log("Resolved Credential Definition:", resolvedCredDef);
Parameters:

credentialDefinitionId (required): The credential definition ID to retrieve.

Returns the credential definition and metadata.

Registering a Revocation Registry Definition
const revRegDef = {
  issuerId: issuerDid,
  maxCredNum: 1000,
  tailsLocation: "https://example.com/tails",
  // other revocation registry fields
};

const registerRevRegResult = await registry.registerRevocationRegistryDefinition({
  networkName: "testnet",
  issuerKeyDer: PrivateKey.generate().toStringDer(),
  revocationRegistryDefinition: revRegDef,
});

console.log("Revocation Registry registration result:", registerRevRegResult);
Parameters:

networkName (optional): Hedera network name.

issuerKeyDer (required, string): The issuer private key in the DER format.

revocationRegistryDefinition (required): Object defining revocation registry parameters.

Returns registration state and metadata.

Getting a Revocation Registry Definition
const resolvedRevRegDef = await registry.getRevocationRegistryDefinition(revocationRegistryDefinitionId);

console.log("Resolved Revocation Registry Definition:", resolvedRevRegDef);
Parameters:

revocationRegistryDefinitionId (required): The ID of the revocation registry definition.

Returns the definition and resolution metadata.

Registering a Revocation Status List
const revStatusList = {
  revRegDefId: revocationRegistryDefinitionId,
  revocationList: [0, 1, 0, 0, 1],  // status array: 0-active, 1-revoked
  currentAccumulator: "...",
  timestamp: Date.now(),
};

const registerStatusListResult = await registry.registerRevocationStatusList({
  networkName: "testnet",
  issuerKeyDer: PrivateKey.generate().toStringDer(),
  revocationStatusList: revStatusList,
});

console.log("Revocation Status List registration result:", registerStatusListResult);
Parameters:

networkName (optional): Hedera network name.

issuerKeyDer (required, string): The issuer private key in the DER format.

revocationStatusList (required): Revocation status list object without timestamp.

Returns the registration state and metadata.

Getting a Revocation Status List
const resolvedStatusList = await registry.getRevocationStatusList(revocationRegistryId, timestamp);

console.log("Resolved Revocation Status List:", resolvedStatusList);
Parameters:

revocationRegistryId (required): ID of the revocation registry.

timestamp (required): UNIX timestamp to resolve the status list at.

Returns the revocation status list and resolution metadata.

# Core Guide
The Core component is the foundation of the Hiero DID SDK. It provides essential interfaces, utilities, and validation tools for working with Decentralized Identifiers (DIDs) on the Hedera network.

Key Features
Interfaces
The core component defines several key interfaces that are used throughout the Hiero DID SDK:

DIDDocument: Represents a DID Document, which contains information about a DID, such as its public keys and services.

Signer: Defines the methods for signing and verifying data using a DID’s private key.

Publisher: Defines the methods for submitting transactions to the Hedera network.

Verifier: Defines the methods for verifying the signatures of DID operations.

DIDMessage: Represents a message used for DID operations, such as creating, updating, or deactivating a DID.

PublicKey: An interface for representing public keys.

Network: An interface for defining Hedera network configurations.

VerificationMethodProperties: An interface for defining verification method properties.

DIDError: A custom error class for all SDK-related errors.

Utilities
The core component also provides a range of utility classes and functions for working with DIDs and keys:

Transforming keys: Convert keys between different formats (bytes, base58, multibase, Hedera PublicKey).

Multibase encoding: Encode and decode data using the multibase encoding format.

CBOR encoding: Encode and decode data using the Concise Binary Object Representation (CBOR) format.

Public key validation: Validate Ed25519 public keys.

DID Validation
The core component exports the isHederaDID function, which uses regular expressions to validate Hedera DIDs, ensuring they adhere to the DID specification:

Checks for correct DID format, including the did:hedera prefix, network, public key, and topic ID.

Validates the network identifier against allowed values (mainnet, testnet).

Uses a regular expression to validate the base58-encoded public key.

Usage Examples
Validating a Hedera DID
The isHederaDID function is used to validate Hedera DIDs. It checks the format of the DID, including the network identifier, public key, and topic ID. You can use isHederaDIDUrl to validate a DID URL, which includes a fragment identifier.

This example demonstrates how to use the isHederaDID function to validate a Hedera DID:

import { isHederaDID } from "@hiero-did-sdk/core";

const did = "did:hedera:testnet:z6Mkhj..."; // Replace with the DID you want to validate

if (isHederaDID(did)) {
  console.log(`${did} is a valid Hedera DID`);
} else {
  console.log(`${did} is not a valid Hedera DID`);
}
This example demonstrates how to use the isHederaDIDUrl function to validate a DID URL:

import { isHederaDIDUrl } from "@hiero-did-sdk/core";

const did = "did:hedera:testnet:z6Mkhj...#some-fragment"; // Replace with the DID URL you want to validate

if (isHederaDIDUrl(did)) {
  console.log(`${did} is a valid Hedera DID`);
} else {
  console.log(`${did} is not a valid Hedera DID`);
}
Validating a Ed25519 Public Key
The isEd25519PublicKey function is used to validate Ed25519 public keys. It only checks the length of the key. You can pass a multibase-encoded key or raw bytes to the function.

This example demonstrates how to use the isEd25519PublicKey function to validate an Ed25519 public key:

import { isEd25519PublicKey } from "@hiero-did-sdk/core";

const publicKey = "z6Mkhj..."; // Replace with the public key you want to validate

if (isEd25519PublicKey(publicKey)) {
  console.log(`${publicKey} is a valid Ed25519 public key`);
} else {
  console.log(`${publicKey} is not a valid Ed25519 public key`);
}
Transforming Keys
KeysUtility provides a range of functions for transforming keys between different formats. Currently, the utility supports the following key formats:

Bytes: Raw bytes of the key.

Base58: Base58-encoded key.

Multibase: Multibase-encoded key.

Hedera PublicKey: Hedera SDK PublicKey object.

DER String: DER-encoded key.

This example shows how to use the KeysUtility to transform keys from a Hedera PublicKey to different formats:

import { KeysUtility } from "@hiero-did-sdk/core";
import { PublicKey } from "@hashgraph/sdk";

// Load a key from a Hedera PublicKey
const keyUtil = KeysUtility.fromPublicKey(publicKey);

// Transform the key to different formats
const publicKeyMultibase = keyUtil.toMultibase();
const publicKeyBase58 = keyUtil.toBase58();
const publicKeyBytes = keyUtil.toBytes();
Multibase Encoding
The core package provides a MultibaseCodec class for encoding and decoding multibase strings. Multibase is a self-describing encoding format that allows you to encode data in different base encodings (e.g., base58, base64, base32).

This example demonstrates how to use the MultibaseCodec class to encode and decode multibase strings:

import { MultibaseCodec } from "@hiero-did-sdk/core";

const encodedString = MultibaseCodec.encode(Buffer.from("Hello, world!"), "base58btc");

const decodedString = MultibaseCodec.decode(encodedString);
CBOR Encoding
The CborCodec class is provided for encoding and decoding data using the Concise Binary Object Representation (CBOR) format. CBOR is a binary data serialization format that is more compact than JSON and is used to encode structured data.

This example demonstrates how to use the CborCodec class to encode and decode data using the CBOR format:

import { CborCodec } from "@hiero-did-sdk/core";

const encodedBytes = CborCodec.encode(JSON.stringify({ id: 'did:hedera:...' }));

const decodedObjectInBytes = CborCodec.decode(encodedBytes);

# Cache Guide
The @hiero-did-sdk/core package provides the Cache interface and implementations for efficient caching of key-value data, improving performance and reducing redundant operations by storing and retrieving data with optional expiration.

Overview
Use the Cache service to:

Store key-value pairs with optional expiration times.

Retrieve cached values by key, taking expiration into account.

Remove specific cache entries or clear the entire cache.

Perform cleanup of expired cache entries proactively.

Implement custom cache providers or use the built-in in-memory LRU cache.

Initialization
You can initialize a cache by:

Providing an implementation of the Cache interface (custom or built-in), or

Using the built-in LRUMemoryCache by specifying max size.

Example of creating an LRU memory cache:

import { LRUMemoryCache } from '@hiero-did-sdk/core';

const cache = new LRUMemoryCache(5000); // max 5000 entries
Parameters:

maxSize (number, optional): Maximum number of entries before evicting the least recently used item. Defaults to 10,000.

Basic Usage
The Cache interface defines the following methods:

Getting a value
const cachedValue = await cache.get('my-key');
if (cachedValue !== null) {
  console.log('Found cached value:', cachedValue);
} else {
  console.log('Cache miss');
}
Parameters:

key (string): The cache key.

Returns:

A promise resolving to the cached value or null if not present or expired.

Setting a value
await cache.set('my-key', { some: 'data' }, 3600); // expires in 1 hour
Parameters:

key (string): The cache key.

value: The value to store.

expiresInSeconds (number, optional): Time-to-live for the entry in seconds.

Returns:

A promise that resolves when the value is stored.

Removing a value
await cache.remove('my-key');
Parameters:

key (string): The cache key to remove.

Returns:

A promise that resolves once removal completes.

Clearing cache
await cache.clear();
Clears all cached entries.

Returns:

A promise that resolves when the cache is cleared.

Cleanup expired entries
await cache.cleanupExpired();
Removes all expired cache entries.

Returns:

A promise that resolves when cleanup is done.

# HederaClientService Guide
The @hiero-did-sdk/client package provides the HederaClientService — a flexible service to manage Hedera SDK clients across multiple Hedera networks (mainnet, testnet, previewnet, local-node, and custom networks), simplifying client creation and operation execution with proper lifecycle management.

Overview
Use the HederaClientService to:

Manage connections to one or more Hedera networks with unique configurations.

Obtain configured Hedera SDK Client instances associated with a specific network.

Perform operations on the Hedera network using the client with automatic connection management.

Ensure operator credentials are correctly set per network.

Consistently apply transaction fee limits on clients.

Initialization
Create an instance of HederaClientService by providing configuration describing one or more Hedera networks:

const config = {
  networks: [
    {
      network: 'testnet',          // Hedera public network or a custom network object
      operatorId: '0.0.1234',      // Operator account ID as string
      operatorKey: 'privateKeyString', // Operator private key as string
    },
    {
      network: {
        name: 'custom-network',
        nodes: {
          '0.testnet.hedera.com:50211': '0.0.3',
        },
        mirrorNodes: ['https://mirror.customnet.com'],
      },
      operatorId: '0.0.5678',
      operatorKey: 'privateKeyString2',
    },
  ],
};

const clientService = new HederaClientService(config);
Parameters:

networks (array of objects): Array of network configurations. Each network must have a unique name (for custom networks, this is the name property). Each config must specify operatorId and operatorKey strings.

Throws an error if:

No networks are provided.

Network names are not unique.

Basic Usage
Obtaining a Client
const client = clientService.getClient('testnet');
Parameters:

networkName (optional string): Name of the network for which to get the client. If omitted and only one network is configured, returns that client. Throws if multiple networks are configured and no network name is provided.

Returns a Hedera SDK Client instance configured with operator keys and settings.

Running Operations with a Client
await clientService.withClient({ networkName: 'custom-network' }, async (client) => {
  // Use the client instance for queries or transactions here
  const accountInfo = await client.getAccountInfo('0.0.1234');
  console.log(accountInfo);
});
Parameters:

props: An object optionally containing networkName to specify which client to use.

operation: An async callback function accepting the Client instance.

Returns:

The result of the asynchronous operation.

Behavior:

Acquires client for the given network.

Executes the operation.

Closes the client connection automatically after the operation completes.

# Crypto Library Guide
The @hiero-did-sdk/crypto package provides a simple utility class Crypto for calculating SHA-256 hashes. It supports multiple input types and works seamlessly in both Node.js and React Native environments by automatically selecting the appropriate crypto backend.

Overview
Use the Crypto library to:

Compute SHA-256 hashes of data inputs (string, Buffer, Uint8Array, ArrayBuffer).

Automatically select the compatible crypto module depending on the runtime environment.

Obtain hexadecimal string hashes for use in decentralized identity and cryptographic operations.

Initialization
No explicit initialization is required. The library detects and uses the appropriate crypto module internally when hashing.

Basic Usage
import { Crypto } from '@hiero-did-sdk/crypto';

const input = 'Hello, World!';

const hashHex = Crypto.sha256(input);

console.log('SHA-256 hash:', hashHex);
Parameters:

input (string | Buffer | Uint8Array | ArrayBuffer) — data to hash.

Returns:

string — hex-encoded SHA-256 hash.

Throws an error if no compatible crypto module is found during runtime.

# Lifecycle Guide
The Lifecycle component is the foundation of the Hiero DID SDK. Tt provides a powerful and flexible system for orchestrating complex asynchronous operations related to Decentralized Identifiers (DIDs).

Overview
The Lifecycle Management component simplifies the development of robust and reliable DID-related applications by streamlining the process of defining, managing, and executing sequences of asynchronous steps. It provides features such as:

Step-by-Step Execution: Define a clear sequence of asynchronous steps for DID operations.

Callback Integration: Incorporate custom callback functions at any point in the lifecycle.

Signature Handling: Include signature generation and verification steps seamlessly.

Pause/Resume Functionality: Introduce pauses for manual intervention or external interactions, and resume execution when ready.

Error Handling: Implement robust error handling with catch steps to gracefully handle exceptions.

Flexible Builder Pattern: Provides a fluent API for building and configuring lifecycles with ease.

These features enable developers to create complex DID workflows while maintaining a clear and organized structure.

Using the Lifecycle Management Component
The core of the Lifecycle Management component is the LifecycleBuilder class. It provides a fluent API for defining the steps involved in a DID operation. Here’s a basic example of how to use the LifecycleBuilder:

import { LifecycleBuilder, LifecycleRunner } from "@hiero-did-sdk/lifecycle";

const lifecycle = new LifecycleBuilder()
  .callback('label1', async (message: Message, publisher: Publisher) => {
    const topicId = await fetchTopicId();
    message.setTopicId(topicId);
  })
  .signWithSigner('label2') // Sign the message
  .callback('label3', async (message: Message, publisher: Publisher) => {
    const payload = message.getPayload();
    await publisher.submit(payload);
  })
  .catch('label3', (error) => {
    // Handle errors gracefully
    console.error("Lifecycle error:", error);
  });

const runner = new LifecycleRunner(lifecycle);
const state = await runner.process(message, {
  // Provide necessary context (e.g., signer, publisher)
  publisher,
  signer,
});
This example demonstrates a simple lifecycle with three steps:

An asynchronous callback function that fetches some data and sets it in the message.

A signing step using signWithSigner.

Another asynchronous callback function that submits the data using a publisher.

The catch method is used to handle any errors that occur during the lifecycle execution.

The LifecycleRunner class is responsible for executing the lifecycle. The process method starts the execution and returns a RunnerState object, which contains information about the current state of the lifecycle.

Pausing Execution
You can introduce pauses in the lifecycle to allow for manual intervention or waiting for external events. Here’s an example of how to add a pause step:

const lifecycle = new LifecycleBuilder()
  .callback('label1', async (message: Message, publisher: Publisher) => {
    // Perform some asynchronous operation
  })
  .pause('pause1') // Pause execution
  .callback('label2', async (message: Message, publisher: Publisher) => {
    // Perform another operation after the pause
  });

const runner = new LifecycleRunner(lifecycle);
const state = await runner.process(message, {
  publisher,
  signer,
});

// Do something before resuming execution

// Resume execution
const finalState = await runner.resume(state, {
  publisher,
  signer,
});
In this example, the pause method is used to introduce a pause in the lifecycle. The process method starts the execution, and the resume method resumes the execution after the pause. The resume method requires the RunnerState object returned by the process method and the necessary context to continue the execution (eg. publisher, signer).

Providing signature
You can add a signature step to the lifecycle to sign the message by yourself. Signature must be provided as an option in lifecycle runner. Here’s an example of how to add a signature step:

const lifecycle = new LifecycleBuilder()
  .callback('label1', async (message: Message, publisher: Publisher) => {
    // Perform some asynchronous operation
  })
  .pause('pause1') // Pause execution
  .signature('signature1') // Add signature to the message;

const runner = new LifecycleRunner(lifecycle);
const state = await runner.process(message, {
  publisher,
});

// Extract bytes from the message and sign it

// Resume execution with signature
const finalState = await runner.resume(state, {
  publisher,
  args: {
    signature: signatureBytes,
  },
});
The signature is provided as an option in the resume method. The args object contains the signature bytes that will be used to sign the message. In this case a Signer class is not required.

Error Handling
The catch method is used to handle errors that occur during the lifecycle execution. You can define custom error handling logic to gracefully handle exceptions. Here’s an example of how to use the catch method:

const lifecycle = new LifecycleBuilder()
  .callback('label1', async (message: Message, publisher: Publisher) => {
    throw new Error("Something went wrong");
  })
  .catch('error-handler', (error) => {
    // Handle errors gracefully
    console.error("Lifecycle error:", error);
  });

const runner = new LifecycleRunner(lifecycle);
const state = await runner.process(message, {
  publisher,
  signer,
});

# Messages Guide
The Messages component is the foundation of the Hiero DID SDK. It provides a comprehensive set of classes for constructing and handling DID Messages, which facilitate various DID operations on the Hedera network.

Overview
DID Messages are a standardized format for exchanging information about Decentralized Identifiers (DIDs). They are used to perform various DID operations, such as:

DID Creation: Registering a new DID on the Hedera network.

DID Update: Modifying an existing DID document.

DID Deactivation: Revoking a DID.

The DID Messages component provides a set of classes that represent these different DID operations. These classes make it easy to construct and process DID Messages, ensuring that they are correctly formatted and comply with the DID specification.

DID Message Classes
The following are the main DID Message classes provided by the component:

DIDOwnerMessage: Used for creating and managing DID ownership.

DIDAddVerificationMethodMessage: Used for adding verification methods to a DID Document.

DIDRemoveVerificationMethodMessage: Used for removing verification methods from a DID Document.

DIDAddServiceMessage: Used for adding service endpoints to a DID Document.

DIDRemoveServiceMessage: Used for removing service endpoints from a DID Document.

DIDDeactivateMessage: Used for deactivating a DID.

Each class has properties and methods specific to the DID operation it represents. For example, the DIDOwnerMessage class has properties for the DID’s public key and initial DID Document.

Usage Examples
Creating a DID Owner Message
import { DIDOwnerMessage } from "@hiero-did-sdk/messages";

const message = new DIDOwnerMessage({
  publicKey: "your-public-key-multibase",
  network: "testnet",
  topicId: "0.0.12345",
});

// Serialize the message to a byte array
const messageBytes = message.toBytes();

// ... later, deserialize the message
const deserializedMessage = DIDOwnerMessage.fromBytes(messageBytes);
Adding a Verification Method
import { DIDAddVerificationMethodMessage } from "@hiero-did-sdk/messages";

const message = new DIDAddVerificationMethodMessage({
  did: "did:hedera:testnet:...",
  controller: "did:hedera:testnet:...",
  property: "verificationMethod",
  publicKeyMultibase: "z...",
  id: "#key-1",
});
Removing a Verification Method
import { DIDRemoveVerificationMethodMessage } from "@hiero-did-sdk/messages";

const message = new DIDRemoveVerificationMethodMessage({
  did: "did:hedera:testnet:...",
  property: "verificationMethod",
  id: "#key-1",
});
Adding a Service
import { DIDAddServiceMessage } from "@hiero-did-sdk/messages";

const message = new DIDAddServiceMessage({
  did: "did:hedera:testnet:...",
  id: "#service-1",
  type: "ExampleService",
  serviceEndpoint: "https://example.com/service",
});
Removing a Service
import { DIDRemoveServiceMessage } from "@hiero-did-sdk/messages";

const message = new DIDRemoveServiceMessage({
  did: "did:hedera:testnet:...",
  id: "#service-1",
});
Deactivating a DID
import { DIDDeactivateMessage } from "@hiero-did-sdk/messages";

const message = new DIDDeactivateMessage({
  did: "did:hedera:testnet:..."
});

# Zstd Library Guide
The @hiero-did-sdk/zstd package provides the Zstd class — a simple and efficient interface for compressing and decompressing data using the Zstandard (zstd) compression algorithm, with runtime adaptability for Node.js and React Native environments.

Overview
Use the Zstd library to:

Compress binary data into smaller size using the fast and powerful Zstandard algorithm.

Decompress previously compressed zstd data back to original form.

Automatically select a compatible compression module depending on runtime environment (Node.js native or React Native polyfill).

Support Uint8Array binary inputs and outputs for seamless integration with modern JavaScript/TypeScript applications.

Zstandard is a lossless compression algorithm known for offering excellent compression ratios at high speed. It supports a wide range of compression levels and is suitable for real-time compression scenarios.

Initialization
No explicit initialization is required. At runtime, Zstd attempts to load:

The Node.js zstd-napi native add-on module for high-performance compression/decompression.

If unavailable, a React Native compatible package react-native-zstd with internal data conversions to reconcile differences.

If no compatible module is found, an error is thrown prompting installation of one of these dependencies.

Basic Usage
import { Zstd } from '@hiero-did-sdk/zstd';

const inputData = new Uint8Array([/* binary data */]);

// Compress data
const compressedData = Zstd.compress(inputData);

// Decompress data
const originalData = Zstd.decompress(compressedData);

console.log('Original and decompressed data are equal:',
  inputData.length === originalData.length && inputData.every((val, i) => val === originalData[i])
);
Parameters:

inputData (Uint8Array, required): The raw binary data to compress or the compressed data to decompress.

Returns:

Uint8Array containing compressed bytes for compress.

Uint8Array containing decompressed original data for decompress.

Throws:

Error if no compatible zstd module is found.

Details
Compression is performed as a single zstd frame in memory.

The underlying native or polyfill module handles the actual compression logic.

For React Native, data format conversion (e.g. base64, buffers) is applied internally to match differing APIs.

# resolveDID API Reference
This document provides a concise API reference for the resolveDID function within the Hedera DID SDK for JavaScript.

Function Signature
function resolveDID(
  did: string,
  accept?: DIDResolutionAccept,
  options?: ResolveDIDOptions,
): Promise<DIDDocument | JsonLdDIDDocument | DIDResolution | Uint8Array>;
Parameters
The function accepts the following parameters:

did: (Required) The DID string of the Decentralized Identifier to resolve.

accept: (Optional) Specifies the desired format for the DID Document resolution.

options: (Optional) Specifies the options for the DID Document resolution.

did Parameter
Name    Type    Description
did

string

The DID string of the Decentralized Identifier to resolve.

accept Parameter
Name    Type    Description
accept?

Accept

Specifies the desired format for the DID Document resolution. See Accept type for allowed values.

options Parameter
It is an object that contains the following properties:

Name    Type    Description
options?

ResolveDIDOptions

Specifies the options for the DID Document resolution. See ResolveDIDOptions type for allowed values.

Data Types
Accept type
Name    Type    Description
Accept

string

A string literal representing the desired format for DID Document resolution. It must be one of the following:

* application/did+ld+json * application/did+json * application/ld+json;profile="https://w3id.org/did-resolution" * application/did+cbor

ResolveDIDOptions type
Name    Type    Description
verifier?

Verifier

Specifies the verifier to use for verifying the DID Document signature. See Verifier for more details.

topicReader?

TopicReader

Specifies the TopicReader to use for reading messages from the Hedera network. Default is HederaClientTopicReader.

Return Value
Upon successful execution, the function returns a Promise that resolves to either a DIDDocument object or a DIDResolutionResponse object, depending on the value of the accept parameter.

Name    Type    Description
DID Document

DIDDocument

Returned if accept is application/did+json or application/did+json. Contains the resolved DID Document. See a full running example for JSON examples in the source code.

LD DID Document

JsonLdDIDDocument

Returned if accept is application/did+ld+json. Contains the resolved DID Document in JSON-LD format. See a full running example for JSON-LD examples in the source code.

DID Resolution Response

DIDResolutionResponse

Returned if accept is application/ld+json;profile="https://w3id.org/did-resolution". Contains the resolved DID Document and additional metadata. See a full running example in the source code.

CBOR Response

Uint8Array

Returned if accept is application/did+cbor. Contains the resolved DID Document in CBOR format. See a full running link: example in the source code.

Errors
The following exceptions may arise during the execution of the resolveDID function:

Exception code    Description
invalidDid

Unsupported DID method or invalid DID.

notFound

The DID document was not found.

internalError

Cannot verify signature without a public key or a verifier.

internalError

No public key found in DIDOwner event.

representationNotSupported

Unsupported representation format.

Function Implementation
The Hiero DID SDK provides a resolveDID function within its resolver package. For further details, refer to the @hiero-did-sdk-js/resolver package documentation.

# DidDocumentBuilder API Reference
This document provides a detailed API reference for the DidDocumentBuilder class — a builder for creating, updating, and resolving DID Documents from raw DID-related messages, typically consumed from Hedera Consensus Service topics.

Class: DidDocumentBuilder
A builder class to construct Decentralized Identifier (DID) Documents by parsing, verifying, and managing DID-related events from a series of messages.

constructor
constructor(messages: string[])
Creates a new instance of DidDocumentBuilder.

Parameters
messages (string[], required): Array of raw topic messages containing DID content, typically JSON strings representing DID events.

forDID
forDID(did: string): DidDocumentBuilder
Specifies the DID identifier for which the Document will be built.

Parameters
did (string, required): The DID string (must be a valid Hedera DID).

Throws
Throws DIDError if the given DID is not a valid Hedera DID.

Returns
The current DidDocumentBuilder instance for chaining.

withVerifier
withVerifier(verifier: Verifier): DidDocumentBuilder
Associates a verifier instance for cryptographic verification of DID messages.

Parameters
verifier (Verifier, required): An instance capable of verifying message signatures.

Returns
The current DidDocumentBuilder instance for chaining.

build
async build(): Promise<DidDocumentBuilder>
Processes all stored DID-related messages, verifying signatures and handling DID operations (create, update, revoke), building internal DID Document state.

Throws
Throws DIDError if no DID is specified before building (i.e., forDID was not called).

Throws DIDError if the DID document does not exist (no valid DIDOwner creation event found).

Returns
A promise that resolves to the current DidDocumentBuilder instance after building.

toDidDocument
toDidDocument(): DIDDocument
Generates the resolved DID Document JSON object according to the internal state built from messages.

Returns
A DIDDocument object representing the constructed DID Document.

If the DID is deactivated, returns a minimal document without verification or service entries.

toJsonLdDIDDocument
toJsonLdDIDDocument(): JsonLdDIDDocument
Returns the DID Document in JSON-LD format compliant with W3C DID specifications, including standard @context fields.

Returns
A JsonLdDIDDocument including @context and the resolved DID Document properties.

toResolution
toResolution(): DIDResolution
Returns a full DID Resolution result, including the DID Document, document metadata, and resolution metadata.

Returns
A DIDResolution object with the following properties:

didDocument: The DID Document in JSON-LD format.

didDocumentMetadata: Metadata about creation, update times, and deactivation status.

didResolutionMetadata: Metadata describing content type and resolution profile.

toDidDocumentCbor
toDidDocumentCbor(): Uint8Array
Encodes the resolved DID Document as CBOR bytes using the CBOR codec.

Returns
A Uint8Array containing the CBOR-encoded DID Document.

from
static from(messages: string[]): DidDocumentBuilder
Static factory method to create a new DidDocumentBuilder instance from an array of topic messages.

Parameters
messages (string[], required): Array of raw DID-related messages to initialize the builder.

Returns
A new instance of DidDocumentBuilder.

# dereferenceDID API Reference
This document provides a concise API reference for the dereferenceDID function within the Hedera DID SDK for JavaScript.

Function Signature
function dereferenceDID(
  didUrl: string,
  accept?: DIDResolutionAccept,
  options?: DereferenceDIDOptions,
): Promise<
  | Service
  | VerificationMethod
  | ServiceEndpoint
  | JsonLdVerificationMethod
  | JsonLdService
  | DIDDereferenceResolution
  | Uint8Array
>;
Parameters
The function accepts the following parameters:

didUrl: (Required) The DID URL to dereference.

accept: (Optional) Specifies the desired format for the DID fragment resolution.

options: (Optional) The options to use when dereferencing the DID URL.

didUrl Parameter
Name    Type    Description
didUrl

string

The DID URL string of the Decentralized Identifier to dereference.

accept Parameter
Name    Type    Description
accept?

Accept

Specifies the desired format for the DID fragment resolution. See Accept type for allowed values.

options Parameter
Name    Type    Description
options?

DereferenceDIDOptions

The options to use when dereferencing the DID URL. See DereferenceDIDOptions type for more details.

Data Types
Accept type
Name    Type    Description
Accept

string

A string literal representing the desired format for DID Document resolution. It must be one of the following:

* application/did+ld+json * application/did+json * application/ld+json;profile="https://w3id.org/did-resolution" * application/did+cbor

DereferenceDIDOptions type
Name    Type    Description
verifier?

Verifier

Specifies the verifier to use for verifying the DID Document signature. See Verifier for more details.

topicReader?

TopicReader

Specifies the TopicReader to use for reading messages from the Hedera network. Default is HederaClientTopicReader.

Return Value
Upon successful execution, the function returns a Promise that resolves to either a Service, VerificationMethod, or DIDDereferenceResolution object, depending on the provided didUrl and accept values.

Name    Type    Description
Service

Service

Returned if DID URL has a service fragment or service parameter was provided.

VerificationMethod

VerificationMethod

Returned if DID URL has a verificationMethod fragment.

ServiceEndpoint

ServiceEndpoint

Returned if DID URL has dereference to a service endpoint.

DIDDereferenceResolution

DIDDereferenceResolution

Returned if accept is application/ld+json;profile="https://w3id.org/did-resolution". It contains the dereferenced fragment and additional metadata.

CBOR Response

Uint8Array

Returned if accept is application/did+cbor. It contains the CBOR-encoded dereferenced fragment.

Errors
The following exceptions may arise during the execution of the dereferenceDID function:

Exception code    Description
invalidDidUrl

Unsupported DID method or invalid DID URL.

invalidDidUrl

Unsupported DID URL parameters.

invalidDidUrl

HL, versionTime, and versionId params are not supported.

notFound

The DID document was not found.

notFound

Fragment not found in DID document.

notFound

Query not found in DID document.

internalError

Cannot verify signature without a public key or a verifier.

internalError

No public key found in DIDOwner event.

representationNotSupported

Unsupported representation format.

representationNotSupported

Multiple service endpoints are not supported.

representationNotSupported

This service endpoint type is not supported.

Function Implementation
The Hiero DID SDK provides a dereferenceDID function within its resolver package. For further details, refer to the @hiero-did-sdk-js/resolver package documentation.

# DIDDereferenceBuilder API Reference
This document provides a detailed API reference for the DIDDereferenceBuilder class — a utility to dereference fragments or queries from a DID Resolution result, returning relevant pieces of a DID Document in various formats.

Class: DIDDereferenceBuilder
A builder class responsible for dereferencing parts (fragments or query parameters) of a DID Document, based on the DID Resolution object.

withFragment
withFragment(fragment?: string): this
Sets a fragment identifier (the part after # in a DID URL) to dereference within the DID Document.

Parameters
fragment (string, optional): The fragment identifier to dereference.

Returns
The current instance for method chaining.

withParams
withParams(params: Record<string, string>): this
Sets query parameters (key-value pairs after ? in a DID URL) to dereference within the DID Document.

Parameters
params (object, required): A record/map of query parameters for dereferencing.

Returns
The current instance for method chaining.

toJson
toJson(): Service | VerificationMethod | ServiceEndpoint
Dereferences the specified fragment or query parameters from the DID Document, returning the corresponding JSON content.

Behavior
If a fragment is set, attempts to find the matching element (Service or VerificationMethod) in the DID Document by ID.

If query parameters are set, attempts to resolve service endpoints based on parameter keys.

If neither fragment nor valid params are set, throws an error.

Throws
DIDError with code 'notFound' if the fragment or query target is not found in the DID Document.

DIDError with code 'invalidDidUrl' if unsupported or invalid URL parameters are present.

DIDError with code 'representationNotSupported' if the service endpoint’s representation is unsupported (e.g., multiple endpoints or non-string endpoints).

Returns
The dereferenced JSON object, which can be a:

Service object

VerificationMethod object

ServiceEndpoint string

toJsonLd
toJsonLd(): JsonLdService | JsonLdVerificationMethod | ServiceEndpoint
Returns the dereferenced JSON content, wrapped as JSON-LD with @context from the DID Document.

Returns
A JSON-LD wrapped object including:

@context: The original DID Document contexts.

Other properties: The dereferenced JSON content.

toResolution
toResolution(): DIDDereferenceResolution
Builds a full DID Dereference Resolution object containing dereferenced content along with metadata.

Returns
An object containing:

contentStream: The dereferenced JSON-LD content.

dereferencingMetadata: Metadata of the DID Document (from the original DID Resolution).

contentMetadata: Resolution metadata from the original DID Resolution.

toCbor
toCbor(): Uint8Array
Encodes the dereferenced JSON content as CBOR format.

Returns
A Uint8Array containing the CBOR encoded dereferenced content.

fromResolution
static fromResolution(resolution: DIDResolution)
Static factory method to create a new DIDDereferenceBuilder from a DID Resolution object.

Parameters
resolution (DIDResolution, required): The DID Resolution to dereference.

Returns
A new DIDDereferenceBuilder instance initialized with the given resolution.

# TopicReader API Reference
This document provides a concise API reference for the TopicReader class within the Hedera DID SDK for JavaScript. This class is responsible for reading messages from the Hedera network topic.

Class Diagram
The class diagram below illustrates the core methods of the TopicReader interface for interacting with the Hedera network.

topic reader class diagram
Methods
fetchAllToDate
fetchAllToDate(topicId: string, network: Network): Promise<TopicReaderMessage[]>
Fetches all messages from a topic from the start to the end of the topic.

Parameters
topicId: The ID of the topic to fetch messages from.

network: The Hedera network to use.

Returns
An array of messages from the topic.

fetchFrom
fetchFrom(topicId: string, network: Network, options: TopicReaderOptions): Promise<TopicReaderMessage[]>
Fetches messages from a topic from a specific start time to an end time.

Parameters
topicId: The ID of the topic to fetch messages from.

network: The Hedera network to use.

options: The options for the fetch. See TopicReaderOptions for more details.

Returns
An array of messages from the topic.

Data Types
TopicReaderOptions
Name    Type    Description
from

number

The start time of the fetch in seconds. Default is 0.

to

number

The end time of the fetch in seconds. Default is the current time.

Class Implementation
The Hiero DID SDK provides the TopicReader class interface and implementations within its resolver package. For further details, refer to the @hiero-did-sdk-js/resolver package documentation.

# createDID API Reference
This document provides a concise API reference for the createDID function within the Hedera DID SDK for JavaScript.

Function Signature
The createDID function can be invoked with providers alone to generate a DID with default settings, or with both providers and options to customize the DID creation process.

function createDID(providers: Providers): Promise<CreateDIDResult>;
function createDID(
  options: CreateDIDOptions,
  providers: Providers
): Promise<CreateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Optional) An object enabling customization of the DID creation procedure.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

Providers

An object containing a Hedera Client, a cryptographic Signer, and a transaction Publisher (refer to Providers Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

CreateDIDOptions

An object specifying configuration options for DID creation (refer to CreateDIDOptions Type for details).

Data Types
This section elaborates on the data types employed within the providers and options parameters.

Providers Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the Providers type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

signer?

Signer

An instance of a Signer. If not provided, a private key must be specified in the options parameter to sign the DID creation message; otherwise, an exception will be thrown.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

CreateDIDOptions Type
The table below provides a detailed description of the CreateDIDOptions type.

Name    Type    Description
controller?

string

A DID string representing the entity controlling the newly created DID. If not specified, the generated DID will be self-managed. See a full running example in the source code.

topicId?

string

The ID of the Hedera Topic associated with the DID. If omitted, a new topic will be automatically created. See a full running example in the source code.

privateKey?

string | PrivateKey

A private key (in DER format) or a PrivateKey object used to generate a Signer for signing the DID creation message. If neither this parameter nor signer (in the providers parameter) is specified, a new key pair is generated and the corresponding private key is returned.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader. If not provided, a default TopicReaderHederaClient will be used.

Return Value
Upon successful execution, the function returns a Promise that resolves to a CreateDIDResult object.

The table below describes the structure of the CreateDIDResult type.

Name    Type    Description
did

string

The DID string of the newly created Decentralized Identifier.

didDocument

DIDDocument

The DID Document associated with the newly created DID.

privateKey?

PrivateKey

A PrivateKey object. This key is used internally to generate a Signer for the DID creation process. It is returned only if neither a signer (in the providers parameter) nor this privateKey was explicitly provided.

Errors
The following table enumerates the exceptions that may arise during the execution of the createDID function.

Exception code    Description
invalidArgument

Required providers are missing.

invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidDid

Controller is not a valid Hedera DID.

internalError

DID already exists on the network

internalError

Failed to create topic.

internalError

Failed to create the DID.

internalError

Message awaiter timeout reached. Messages not found.

Function Implementation
The Hiero DID SDK provides a createDID function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# generateCreateDIDRequest API Reference
This document provides a concise API reference for the generateCreateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function generates a request to create a new Decentralized Identifier (DID) on the Hedera network using the Client Managed Secret Mode.

The generateCreateDIDRequest function is invoked with providers and options parameters. The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter enables customization of the DID creation procedure and passing required public key.

function generateCreateDIDRequest(
  options: GenerateCreateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<CreateDIDRequest>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object containing a public key for DID root key and enabling customization of the DID creation procedure.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

GenerateCreateDIDRequestOptions

An object specifying configuration options for DID creation request (refer to GenerateCreateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a CreateDIDRequest object.

The table below describes the structure of the CreateDIDRequest type.

Name    Type    Description
state

RunnerState<DIDOwnerMessage>

The current state of the DID creation process. Enables resuming the process after signing the request.

signingRequest

SigningRequest

The request to be signed by the client. Contains the serialized payload of the DID creation transaction and metadata (refer to SigningRequest Type for details).

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

GenerateCreateDIDRequestOptions Type
The table below provides a detailed description of the GenerateCreateDIDRequestOptions type.

Name    Type    Description
multibasePublicKey

string

A public key encoded in multibase format. This key is used as the root key for the newly created DID.

controller?

string

A DID string representing the entity controlling the newly created DID. If not specified, the generated DID will be self-managed. See a full running example in the source code.

topicId?

string

The ID of the Hedera Topic associated with the DID. If omitted, a new topic will be automatically created. See a full running example in the source code.

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

SigningRequest Type
The table below provides a detailed description of the SigningRequest type.

Name    Type    Description
payload

object

An object containing the payload of the DID message to be signed.

serializedPayload

Uint8Array

A serialized bytes representation of the DID message payload. Actual bytes to be signed.

multibasePublicKey

string

The public key of the corresponding private key required to sign the request.

alg

string

The algorithm used for signing the request. Currently, only Ed25519 is supported.

Errors
The following table enumerates the exceptions that may arise during the execution of the generateCreateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hiero SDK Client must be configured with a network.

invalidArgument

Hiero SDK Client must be configured with an operator account.

invalidDid

Controller is not a valid Hedera DID.

internalError

DID already exists on the network.

internalError

Failed to create topic.

Function Implementation
The Hiero DID SDK provides a generateCreateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# submitCreateDIDRequest API Reference
This document provides a concise API reference for the submitCreateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function resume the creation flow of a new Decentralized Identifier (DID) and publish it on the Hedera network using the Client Managed Secret Mode.

The submitCreateDIDRequest function is invoked with options and providers.` The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter takes current state of the DID creation process and the signature of the signing request.

function submitCreateDIDRequest(
  options: SubmitCreateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<CreateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object specifying configuration options for the DID creation request along with the current state of the DID creation process and the signature of the signing request.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

SubmitCreateDIDRequestOptions

An object specifying configuration options for DID creation request (refer to SubmitCreateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a CreateDIDResult object.

The table below describes the structure of the CreateDIDResult type.

Name    Type    Description
did

string

The DID string of the newly created Decentralized Identifier.

didDocument

DIDDocument

The DID Document associated with the newly created DID.

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

SubmitCreateDIDRequestOptions Type
The table below provides a detailed description of the SubmitCreateDIDRequestOptions type.

Name    Type    Description
state

RunnerState<DIDOwnerMessage>

The state parameter is a RunnerState object that encapsulates the current state of the DID creation process. It is generated by the generateCreateDIDRequest function.

signature

Uint8Array

The signature parameter is a Uint8Array containing the signature of the signing request. The signing request is generated by the generateCreateDIDRequest function.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

Errors
The following table enumerates the exceptions that may arise during the execution of the submitCreateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Signature and verifier are required for the signature step.

internalError

Message awaiter timeout reached. Messages not found.

internalError

Failed to create the DID.

Function Implementation
The Hiero DID SDK provides a submitCreateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# updateDID API Reference
This document provides a concise API reference for the updateDID function within the Hedera DID SDK for JavaScript.

Function Signature
The updateDID function allows you to update an existing DID document by providing the DID and an object specifying the desired modifications.

function updateDID(
  options: UpdateDIDOptions,
  providers: Providers
): Promise<UpdateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object containing the DID to update and the update operations to apply.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

Providers

An object containing a Hedera Client, a cryptographic Signer, and a transaction Publisher (refer to Providers Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
did

string

The DID string of the Decentralized Identifier to update.

updates

DIDUpdateOperation | DIDUpdateOperation[]

A DIDUpdateOperation type or an array of DIDUpdateOperation`s (refer to DIDUpdateOperation Type for details). Each `DIDUpdateOperation represents a specific modification to the DID Document. If an array is provided, the operations will be executed in the order they are provided.

privateKey?

string | PrivateKey`

A private key (in DER format) or a PrivateKey object used to generate a Signer for signing the DID update message.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

Data Types
This section elaborates on the data types employed within the providers parameter.

Providers Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the Providers type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

signer?

Signer

An instance of a Signer. If not provided, a private key must be specified in the options parameter to sign the DID creation message; otherwise, an exception will be thrown.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

DIDUpdateOperation Type
This type represents the different operations you can perform to update a DID Document. Each operation modifies the DID Document in a specific way, such as adding a verification method, removing a service, etc.

AddVerificationMethodOperation Type
Adds a new verification method to the DID Document.

Name    Type    Description
operation

'add-verification-method'

A constant string representing the operation type.

id

string

A unique identifier for the verification method. Must start with # and be unique within the DID Document, e.g., #key-1.

property

VerificationMethodProperties

A string representing the verification method or relationship property to add. Possible values are: verificationMethod, authentication, assertionMethod, keyAgreement, capabilityInvocation, capabilityDelegation.

controller?

string

The DID that controls the verification method. If not provided, the DID of the DID Document is used.

publicKeyMultibase?

string

The public key in multibase format to add. Optional when adding verification relationship as an alias to an existing verification method. In that case id must be the same as the existing verification method. Otherwise is required. See a full running example in the source code.

AddServiceOperation Type
Adds a new service endpoint to the DID Document.

Name    Type    Description
operation

'add-service'

A constant string representing the operation type.

id

string

A unique identifier for the service. Must start with # and be unique within the DID Document, e.g., #service-1.

type

string

The type of service to add.

serviceEndpoint

string

The service endpoint to add.

RemoveVerificationMethodOperation Type
Removes an existing verification method from the DID Document.

Name    Type    Description
operation

'remove-verification-method'

A constant string representing the operation type.

id

string

A unique identifier for the verification method or relationship to remove. Must start with #, e.g., #key-1.

RemoveServiceOperation Type
Removes an existing service endpoint from the DID Document.

Name    Type    Description
operation

'remove-service'

A constant string representing the operation type.

id

string

A unique identifier for the service to remove. Must start with #, e.g., #service-1.

Return Value
Upon successful execution, the function returns a Promise that resolves to a UpdateDIDResult object.

Name    Type    Description
did

string

The updated DID string of the Decentralized Identifier.

didDocument

DIDDocument

The updated DID Document associated with the Decentralized Identifier.

Errors
The following table enumerates the exceptions that may arise during the execution of the updateDID function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Signer or private key is required to perform the operation.

invalidArgument

Verification method ID does not exist. Nothing to remove.

invalidArgument

Cannot remove a service using remove-verification-method operation.

invalidArgument

Service id already exists.

invalidArgument

The service endpoint must be a valid URI.

invalidArgument

The ID must be a valid property ID.

invalidArgument

The fragment ID # is already in use for another verification method.

invalidDid

The DID must be a valid Hedera DID.

invalidDid

The controller must be a valid Hedera DID.

notFound

The DID document was not found.

invalidPublicKey

The public key is required for verification methods

invalidPublicKeyLength

Invalid length for the public key.

internalError

Message awaiter timeout reached. Messages not found.

invalidSignature

The signature is invalid. Provided signer does not match the DID signer.

Function Implementation
The Hiero DID SDK provides a updateDID function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# generateUpdateDIDRequest API Reference
This document provides a concise API reference for the generateUpdateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function generates a request to update a Decentralized Identifier (DID) on the Hedera network using the Client Managed Secret Mode.

The generateUpdateDIDRequest function is invoked with providers and options parameters. The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter enables customization of the DID update procedure and passing required public key.

function generateUpdateDIDRequest(
  options: GenerateUpdateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<UpdateDIDRequest>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object containing a public key for DID root key and enabling customization of the DID update procedure.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

GenerateUpdateDIDRequestOptions

An object specifying configuration options for DID update request (refer to GenerateUpdateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a UpdateDIDRequest object.

The table below describes the structure of the UpdateDIDRequest type.

Name    Type    Description
states

RunnerState<DIDMessage>[]

An array of current states of the DID update process. Each state represents a single operation in the DID update process.

signingRequests

Record<string, SigningRequest>

A map of signing requests to be signed by the client. Each request is associated with a unique key and represents a single operation in the DID update process.

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

GenerateUpdateDIDRequestOptions Type
The table below provides a detailed description of the GenerateUpdateDIDRequestOptions type.

Name    Type    Description
did

string

The DID string of the Decentralized Identifier to update.

updates

DIDUpdateOperation | DIDUpdateOperation[]

A DIDUpdateOperation type or an array of DIDUpdateOperation`s (refer to DIDUpdateOperation Type for details). Each `DIDUpdateOperation represents a specific modification to the DID Document. If an array is provided, the operations will be executed in the order they are provided.

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

SigningRequest Type
The table below provides a detailed description of the SigningRequest type.

Name    Type    Description
payload

object

An object containing the payload of the DID message to be signed.

serializedPayload

Uint8Array

A serialized bytes representation of the DID message payload. Actual bytes to be signed.

multibasePublicKey

string

The public key of the corresponding private key required to sign the request.

alg

string

The algorithm used for signing the request. Currently, only Ed25519 is supported.

DIDUpdateOperation Type
This type represents the different operations you can perform to update a DID Document. Each operation modifies the DID Document in a specific way, such as adding a verification method, removing a service, etc.

AddVerificationMethodOperation Type
Adds a new verification method to the DID Document.

Name    Type    Description
operation

'add-verification-method'

A constant string representing the operation type.

id

string

A unique identifier for the verification method. Must start with # and be unique within the DID Document, e.g., #key-1.

property

VerificationMethodProperties

A string representing the verification method or relationship property to add. Possible values are: verificationMethod, authentication, assertionMethod, keyAgreement, capabilityInvocation, capabilityDelegation.

controller?

string

The DID that controls the verification method. If not provided, the DID of the DID Document is used.

publicKeyMultibase?

string

The public key in multibase format to add. Optional when adding verification relationship as an alias to an existing verification method. In that case id must be the same as the existing verification method. Otherwise is required. See a full running example in the source code.

AddServiceOperation Type
Adds a new service endpoint to the DID Document.

Name    Type    Description
operation

'add-service'

A constant string representing the operation type.

id

string

A unique identifier for the service. Must start with # and be unique within the DID Document, e.g., #service-1.

type

string

The type of service to add.

serviceEndpoint

string

The service endpoint to add.

RemoveVerificationMethodOperation Type
Removes an existing verification method from the DID Document.

Name    Type    Description
operation

'remove-verification-method'

A constant string representing the operation type.

id

string

A unique identifier for the verification method or relationship to remove. Must start with #, e.g., #key-1.

RemoveServiceOperation Type
Removes an existing service endpoint from the DID Document.

Name    Type    Description
operation

'remove-service'

A constant string representing the operation type.

id

string

A unique identifier for the service to remove. Must start with #, e.g., #service-1.

Errors
The following table enumerates the exceptions that may arise during the execution of the generateUpdateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Verification method ID does not exist. Nothing to remove.

invalidArgument

Cannot remove a service using remove-verification-method operation.

invalidArgument

Service id already exists.

invalidArgument

The service endpoint must be a valid URI.

invalidArgument

The ID must be a valid property ID.

invalidArgument

The fragment ID # is already in use for another verification method.

invalidDid

The DID must be a valid Hedera DID.

invalidDid

The controller must be a valid Hedera DID.

notFound

The DID document was not found.

invalidPublicKey

The public key is required for verification methods

invalidPublicKeyLength

Invalid length for the public key.

internalError

DID root key not found in a DID Document.

Function Implementation
The Hiero DID SDK provides a generateUpdateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# submitUpdateDIDRequest API Reference
This document provides a concise API reference for the submitUpdateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function resume the update flow of a Decentralized Identifier (DID) and publish update on the Hedera network using the Client Managed Secret Mode.

The submitUpdateDIDRequest function is invoked with options and providers.` The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter takes current state of the DID update process and the signature of the signing request.

function submitUpdateDIDRequest(
  options: SubmitUpdateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<UpdateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object specifying configuration options for the DID update request along with the current state of the DID update process and the signature of the signing request.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

CommonRegistrarOptions

An object specifying configuration options for DID deactivation request (refer to SubmitUpdateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a UpdateDIDResult object.

The table below describes the structure of the UpdateDIDResult type.

Name    Type    Description
did

string

The DID string of the updated Decentralized Identifier.

didDocument

DIDDocument

The updated DID Document associated with the DID.

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

SubmitUpdateDIDRequestOptions Type
The table below provides a detailed description of the SubmitUpdateDIDRequestOptions type.

Name    Type    Description
states

RunnerState<DIDMessage>[]

The state parameter is an array of RunnerState objects that encapsulate the current state of the DID update process. Each RunnerState represents a single operation in the DID update process. This parameter is generated by the generateUpdateDIDRequest function. Note that the RunnerState objects must be in the correct order and must be generated sequentially.

signatures

Record<string, Uint8Array>

The signatures parameter is an object containing the signatures of the signing requests. The keys of the object are unique identifiers for each RunnerState object, and the values are Uint8Array objects containing the signatures. The signatures must be generated using the private key associated with the DID root key. The signing request is generated by the generateUpdateDIDRequest function.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

Errors
The following table enumerates the exceptions that may arise during the execution of the submitUpdateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Signature and verifier are required for the signature step.

invalidArgument

No states provided.

invalidArgument

Number of states and signatures do not match.

invalidArgument

Signature for # not found.

notFound

The DID document was not found.

internalError

Invalid state of the operation.

internalError

Message awaiter timeout reached. Messages not found.

Function Implementation
The Hiero DID SDK provides a submitUpdateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# DIDUpdateBuilder API Reference
This document provides a concise API reference for the DIDUpdateBuilder class within the Hedera DID SDK for JavaScript. The DIDUpdateBuilder class provides a fluent interface to build a DID update operation that can be used to update a DID Document.

Class Diagram
The following class diagram provides a visual representation of the relationships between key classes and interfaces involved in the DIDUpdateBuilder class.

did update builder class diagram
Methods
addAuthenticationMethod
public addAuthenticationMethod(methodOrId: VerificationMethod | string): DIDUpdateBuilder {}
Adds an authentication method to the DID document. If a verification method with the same ID already exists, it will be replaced. A authentication method is a public key that can be used to authenticate the DID subject.

You can provide ID of the existing verification method or the VerificationMethod object itself. Using the ID is useful when you want to use the same verification method in multiple places in the DID document as a reference.

Parameters
methodOrId: The VerificationMethod object or the identifier of the verification method as a source.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeAuthenticationMethod
public removeAuthenticationMethod(methodId: string): DIDUpdateBuilder {}
Removes an authentication method from the DID document by its identifier.

Parameters
methodId: The identifier of the authentication method to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

addAssertionMethod
public addAssertionMethod(methodOrId: VerificationMethod | string): DIDUpdateBuilder {}
Adds an assertion method to the DID document. If a verification method with the same ID already exists, it will be replaced. A assertion method is a public key that can be used to express claims, such as for the purposes of issuing a Verifiable Credential.

You can provide ID of the existing verification method or the VerificationMethod object itself. Using the ID is useful when you want to use the same verification method in multiple places in the DID document as a reference.

Parameters
methodOrId: The VerificationMethod object or the identifier of the verification method as a source.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeAssertionMethod
public removeAssertionMethod(methodId: string): DIDUpdateBuilder {}
Removes an assertion method from the DID document by its identifier.

Parameters
methodId: The identifier of the assertion method to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

addKeyAgreementMethod
public addKeyAgreementMethod(methodOrId: VerificationMethod | string): DIDUpdateBuilder {}
Adds a key agreement method to the DID document. If a verification method with the same ID already exists, it will be replaced. A key agreement method is a public key that can be used to derive a shared secret for secure communication.

You can provide ID of the existing verification method or the VerificationMethod object itself. Using the ID is useful when you want to use the same verification method in multiple places in the DID document as a reference.

Parameters
methodOrId: The VerificationMethod object or the identifier of the verification method as a source.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeKeyAgreementMethod
public removeKeyAgreementMethod(methodId: string): DIDUpdateBuilder {}
Removes a key agreement method from the DID document by its identifier.

Parameters
methodId: The identifier of the key agreement method to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

addCapabilityInvocationMethod
public addCapabilityInvocationMethod(methodOrId: VerificationMethod | string): DIDUpdateBuilder {}
Adds a capability invocation method to the DID document. If a verification method with the same ID already exists, it will be replaced. A capability invocation method is a public key that can be used to invoke a cryptographic capability, such as the authorization to update the DID Document.

You can provide ID of the existing verification method or the VerificationMethod object itself. Using the ID is useful when you want to use the same verification method in multiple places in the DID document as a reference.

Parameters
methodOrId: The VerificationMethod object or the identifier of the verification method as a source.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeCapabilityInvocationMethod
public removeCapabilityInvocationMethod(methodId: string): DIDUpdateBuilder {}
Removes a capability invocation method from the DID document by its identifier.

Parameters
methodId: The identifier of the capability invocation method to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

addCapabilityDelegationMethod
public addCapabilityDelegationMethod(methodOrId: VerificationMethod | string): DIDUpdateBuilder {}
Adds a capability delegation method to the DID document. If a verification method with the same ID already exists, it will be replaced. A capability delegation method is a public key that can be used to delegate authority to another party.

You can provide ID of the existing verification method or the VerificationMethod object itself. Using the ID is useful when you want to use the same verification method in multiple places in the DID document as a reference.

Parameters
methodOrId: The VerificationMethod object or the identifier of the verification method as a source.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeCapabilityDelegationMethod
public removeCapabilityDelegationMethod(methodId: string): DIDUpdateBuilder {}
Removes a capability delegation method from the DID document by its identifier.

Parameters
methodId: The identifier of the capability delegation method to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

addService
public addService(service: Service): DIDUpdateBuilder {}
Adds a service to the DID document. If a service with the same ID already exists, it will be replaced.

Parameters
service: The Service object to be added.

Returns
The current DIDUpdateBuilder instance for method chaining.

removeService
public removeService(serviceId: string): DIDUpdateBuilder {}
Removes a service from the DID document by its identifier.

Parameters
serviceId: The identifier of the service to be removed.

Returns
The current DIDUpdateBuilder instance for method chaining.

build
public build(): Array<DIDUpdateOperation> {}
Builds the DID update operation based on the added verification methods, services, and other changes.

Returns
A list of DIDUpdateOperation objects representing the changes to the DID document.

Related Types
These types are used as parameters or return values in the DIDUpdateBuilder methods:

VerificationMethod Type
Name    Type    Description
id

string

The identifier of the verification method, e.g., #key-1.

controller

string?

The DID that controls the verification method. Default is DID itself.

publicKeyMultibase?

string

The public key in multibase format. Required when creating a new verification method.

Service Type
Name    Type    Description
id

string

The identifier of the service, e.g., #service-1.

type

string

The type of service, e.g., MessagingService.

serviceEndpoint

string

The service endpoint URL.

Class Implementation
The Hiero DID SDK provides a DIDUpdateBuilder class within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# deactivateDID API Reference
This document provides a concise API reference for the deactivateDID function within the Hedera DID SDK for JavaScript.

Function Signature
The deactivateDID function allows you to deactivate an existing DID.

function deactivateDID(
  options: DeactivateDIDOptions,
  providers: Providers
): Promise<DeactivateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object containing the DID to deactivate.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

Providers

An object containing a Hedera Client, a cryptographic Signer, and a transaction Publisher (refer to Providers Type for details).

options Parameter
Name    Type    Description
did

string

The DID string of the Decentralized Identifier to deactivate.

privateKey?

string | PrivateKey`

A private key (in DER format) or a PrivateKey object used to generate a Signer for signing the DID deactivate message. If neither this parameter nor signer (in the providers parameter) is specified, a new key pair is generated.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

Data Types
This section elaborates on the data types employed within the providers parameter.

Providers Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the Providers type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

signer?

Signer

An instance of a Signer. If not provided, a private key must be specified in the options parameter to sign the DID creation message; otherwise, an exception will be thrown.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

Return Value
Upon successful execution, the function returns a Promise that resolves to a DeactivateDIDResult object.

Name    Type    Description
did

string

The deactivated DID.

didDocument

DIDDocument

An empty DID Document that represents a deactivated DID.

Errors
The following table enumerates the exceptions that may arise during the execution of the deactivateDID function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Signer or private key is required to perform the operation.

invalidDid

The DID must be a valid Hedera DID.

notFound

The DID document was not found.

internalError

Failed to deactivate the DID.

internalError

Message awaiter timeout reached. Messages not found.

invalidSignature

The signature is invalid. Provided signer does not match the DID signer.

Function Implementation
The Hiero DID SDK provides a deactivateDID function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# generateDeactivateDIDRequest API Reference
This document provides a concise API reference for the generateDeactivateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function generates a request to deactivate a Decentralized Identifier (DID) on the Hedera network using the Client Managed Secret Mode.

The generateDeactivateDIDRequest function is invoked with providers and options parameters. The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter provides relevant configuration options for the DID deactivation request.

function generateDeactivateDIDRequest(
  options: GenerateDeactivateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<DeactivateDIDRequest>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object specifying configuration options for the DID deactivation request.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

GenerateDeactivateDIDRequestOptions

An object specifying configuration options for the DID deactivation request. (refer to GenerateDeactivateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a DeactivateDIDRequest object.

The table below describes the structure of the DeactivateDIDRequest type.

Name    Type    Description
state

RunnerState<DIDDeactivateMessage>

The current state of the DID deactivation process. Enables resuming the process after signing the request.

signingRequest

SigningRequest

The request to be signed by the client. Contains the serialized payload of the DID deactivation transaction and metadata (refer to SigningRequest Type for details).

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

GenerateDeactivateDIDRequestOptions Type
The table below provides a detailed description of the GenerateDeactivateDIDRequestOptions type.

Name    Type    Description
did

string

The DID string of the Decentralized Identifier to deactivate.

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

SigningRequest Type
The table below provides a detailed description of the SigningRequest type.

Name    Type    Description
payload

object

An object containing the payload of the DID message to be signed.

serializedPayload

Uint8Array

A serialized bytes representation of the DID message payload. Actual bytes to be signed.

multibasePublicKey

string

The public key of the corresponding private key required to sign the request.

alg

string

The algorithm used for signing the request. Currently, only Ed25519 is supported.

Errors
The following table enumerates the exceptions that may arise during the execution of the generateDeactivateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidDid

The DID must be a valid Hedera DID.

notFound

The DID document was not found.

internalError

DID root key not found in a DID Document.

Function Implementation
The Hiero DID SDK provides a generateDeactivateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# submitDeactivateDIDRequest API Reference
This document provides a concise API reference for the submitDeactivateDIDRequest function within the Hedera DID SDK for JavaScript.

Function Signature
This function resume the deactivation flow of a Decentralized Identifier (DID) and publish update on the Hedera network using the Client Managed Secret Mode.

The submitDeactivateDIDRequest function is invoked with options and providers.` The providers parameter encapsulates configuration parameters for interacting with the Hedera network, while the options parameter takes current state of the DID deactivation process and the signature of the signing request.

function submitDeactivateDIDRequest(
  options: SubmitDeactivateDIDRequestOptions,
  providers: PublisherProviders,
): Promise<DeactivateDIDResult>;
Parameters
The function accepts the following parameters:

providers: (Required) An object encapsulating configuration parameters for interacting with the Hedera network.

options: (Required) An object specifying configuration options for the DID deactivate request along with the current state of the DID deactivation process and the signature of the signing request.

providers Parameter
The table below details the structure of the providers parameter.

Name    Type    Description
providers

PublisherProviders

An object containing a Hedera Client or a transaction Publisher (refer to PublisherProviders Type for details).

options Parameter
The table below details the structure of the options parameter.

Name    Type    Description
options

CommonRegistrarOptions

An object specifying configuration options for DID deactivation request (refer to SubmitDeactivateDIDRequestOptions Type for details).

Return Value
Upon successful execution, the function returns a Promise that resolves to a DeactivateDIDResult object.

The table below describes the structure of the DeactivateDIDResult type.

Name    Type    Description
did

string

The DID string of the deactivated Decentralized Identifier.

didDocument

DIDDocument

The updated DID Document associated with the deactivated DID.

Data Types
This section elaborates on the data types employed within the providers and options parameters.

PublisherProviders Type
To utilize this type, at least one of the following must be defined: client or publisher. If both are provided, publisher takes precedence.

The table below provides a detailed description of the PublisherProviders type.

Name    Type    Description
clientOptions?

ClientOptions

Configuration options for instantiating a Hedera Client. See a full running example in the source code.

client?

Client

An instance of a Hedera Client. See a full running example in the source code.

publisher?

Publisher

An instance of a Publisher responsible for submitting the DID creation transaction to the Hedera network.

SubmitDeactivateDIDRequestOptions Type
The table below provides a detailed description of the SubmitDeactivateDIDRequestOptions type.

Name    Type    Description
state

RunnerState<DIDDeactivateMessage>

The state parameter is a RunnerState object that encapsulates the current state of the DID deactivation process. It is generated by the generateDeactivateDIDRequest function.

signature

Uint8Array

The signature parameter is a Uint8Array containing the signature of the signing request. The signing request is generated by the generateDeactivateDIDRequest function.

waitForDIDVisibility?

boolean

Whether to wait for the DID to be visible on the network. The DID registration transaction may be confirmed before the DID is actually accessible and usable on the network. This option ensures that the function waits until the DID is fully propagated and discoverable. If set to false, the function will return as soon as the registration transaction is confirmed, which may be faster but could lead to errors if you immediately try to use the DID.

Defaults to true.

visibilityTimeoutMs?

number

The maximum time (in milliseconds) to wait for the DID to be visible on the network. This option is only relevant if waitForDIDVisibility is set to true. If the DID is not visible within this timeout period, the function will throw an error. Defaults to 120000 milliseconds (2 minutes).

topicReader?

TopicReader

An instance of a TopicReader responsible for reading messages from the Hedera network topic.

Errors
The following table enumerates the exceptions that may arise during the execution of the submitDeactivateDIDRequest function.

Exception code    Description
invalidArgument

Providers must contain client options or client or publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

invalidArgument

Signature and verifier are required for the signature step.

internalError

Message awaiter timeout reached. Messages not found.

internalError

Failed to deactivate the DID.

Function Implementation
The Hiero DID SDK provides a submitDeactivateDIDRequest function within its registrar package. For further details, refer to the @hiero-did-sdk-js/registrar package documentation.

# Signer API Reference
This document provides a concise API reference for the Signer class within the Hedera DID SDK for JavaScript. This class is responsible for generating key pairs, signing data, and verifying signatures.

Class Diagram
The class diagram below illustrates the core methods of the Signer interface for interacting with cryptographic keys.

signer class diagram
Constructor
constructor
constructor(privateKeyOrDer: string | PrivateKey)
Initializes a new Signer instance.

Parameters
privateKeyOrDer: (Required) A private key class instance or a private key in DER format.

Static Methods
generate
static generate(): Signer
Generates a new key pair and returns a Signer instance with the new private key.

Returns
The new Signer instance.

Methods
publicKey
publicKey(): string
Returns the public key associated with the Signer instance in DER format.

Returns
The public key in DER format.

sign
sign(message: Uint8Array): Uint8Array
Signs the given message using the private key and returns the signature.

Parameters
message: The message to be signed.

Returns
The signature of the message.

verify
verify(message: Uint8Array, signature: Uint8Array): boolean
Verifies the given signature against the message and public key.

Parameters
message: The message that was signed.

signature: The signature to be verified.

Returns
true if the signature is valid, false otherwise.

Errors
Exception code    Description
invalidArgument

Invalid private key format. Expected DER.

invalidArgument

Invalid private key type. Expected ED25519.

Class Implementation
The Hiero DID SDK provides the Signer class within its signer-internal package. For further details, refer to the @hiero-did-sdk-js/signer-internal package documentation.

# Verifier API Reference
This document provides a concise API reference for the Verifier class within the Hedera DID SDK for JavaScript. This class is responsible for verifying signatures.

Class Diagram
The class diagram below illustrates the core methods of the Verifier interface for interacting with cryptographic keys.

verifier class diagram
Constructor
constructor
constructor(publicKey: PublicKey)
Initializes a new Verifier instance.

Parameters
publicKey: (Required) A public key class instance.

Static Methods
fromMultibase
static fromMultibase(multibase: string): Verifier
Initializes a new Verifier instance from a multibase-encoded public key.

Returns
The new Verifier instance.

fromBase58
static fromBase58(base58: string): Verifier
Initializes a new Verifier instance from a base58-encoded public key.

Returns
The new Verifier instance.

Methods
publicKey
publicKey(): string
Returns the public key associated with the Verifier instance in DER format.

Returns
The public key in DER format.

verify
verify(message: Uint8Array, signature: Uint8Array): boolean
Verifies the given signature against the message and public key.

Parameters
message: The message that was signed.

signature: The signature to be verified.

Returns
true if the signature is valid, false otherwise.

Errors
Exception code    Description
invalidArgument

Invalid public key type. Expected ED25519.

Class Implementation
The Hiero DID SDK provides the Verifier class within its verifier-internal package. For further details, refer to the @hiero-did-sdk-js/verifier-internal package documentation.

# HashiCorp Vault Signer API Reference
This document provides a concise API reference for the Vault Signer class within the Hedera DID SDK for JavaScript. This class is responsible for signing data, and verifying signatures using HashiCorp Vault as the key store.

Class Diagram
The class diagram below illustrates the core methods of the Vault Signer interface for interacting with cryptographic keys stored in HashiCorp Vault.

vault signer class diagram
Constructor
constructor
constructor(options: SignerOptions)
Initializes a new Signer instance.

Parameters
options: (Required) An object containing the necessary options to create a Signer instance (refer to SignerOptions Type for details).

Methods
publicKey
publicKey(): string
Returns the public key associated with the Signer instance in DER format.

Returns
The public key in DER format.

sign
sign(message: Uint8Array): Uint8Array
Signs the given message using the private key stored in HashiCorp Vault and returns the signature.

Parameters
message: The message to be signed.

Returns
The signature of the message.

verify
verify(message: Uint8Array, signature: Uint8Array): boolean
Verifies the given signature using the public key stored in HashiCorp Vault.

Parameters
message: The message that was signed.

signature: The signature to be verified.

Returns
true if the signature is valid, false otherwise.

Data Types
This section elaborates on the data types employed within the Signer class.

SignerOptions Type
The SignerOptions type is an object that contains the necessary options to create a Signer instance.

Name    Type    Description
clientApi

VaultApi

An internal API object that interacts with HashiCorp Vault.

keyName

string

A unique identifier for the key stored in HashiCorp Vault.

Errors
Exception code    Description
internalError

When a Vault API call fails. Message contains the error details.

Class Implementation
The Hiero DID SDK provides the Vault Signer class within its signer-hashicorp-vault package. For further details, refer to the @hiero-did-sdk-js/signer-hashicorp-vault package documentation.

# HashiCorp Vault Signer Factory API Reference
This document provides a concise API reference for the VaultSignerFactory class within the Hedera DID SDK for JavaScript. The VaultSignerFactory class is responsible for creating Vault Signer instances and authenticating with HashiCorp Vault to securely manage cryptographic keys.

Class Diagram
The class diagram below illustrates the core methods of the Vault VaultSignerFactory interface for interacting with HashiCorp Vault.

vault signer factory class diagram
Static Methods
loginWithToken
static loginWithToken(
    options: VaultLoginWithTokenOptions,
): Promise<VaultSignerFactory>
Creates a new VaultSignerFactory instance by authenticating with HashiCorp Vault using an access token.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using an access token (refer to VaultLoginWithTokenOptions Type for details).

Returns
The new VaultSignerFactory instance.

loginWithUsernameAndPassword
static loginWithUsernameAndPassword(
  options: VaultLoginWithUsernameAndPasswordOptions,
): Promise<VaultSignerFactory>
Creates a new VaultSignerFactory instance by authenticating with HashiCorp Vault using a username and password.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using a username and password (refer to VaultLoginWithUsernameAndPasswordOptions Type for details).

Returns
The new VaultSignerFactory instance.

loginWithAppRole
static async loginWithAppRole(
  options: VaultLoginWithAppRoleOptions,
): Promise<VaultSignerFactory>
Creates a new VaultSignerFactory instance by authenticating with HashiCorp Vault using an AppRole.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using an AppRole (refer to VaultLoginWithAppRoleOptions Type for details).

Returns
The new VaultSignerFactory instance.

Methods
forKey
forKey(keyName: string): Promise<Signer>
Returns a Vault Signer instance for the specified key stored in HashiCorp Vault.

Parameters
keyName: The unique identifier for the key stored in HashiCorp Vault.

Returns
A Signer instance for the specified key.

forNewKey
forNewKey(keyName: string): Promise<Signer>
Creates a new Ed25519 key pair in HashiCorp Vault and returns a Vault Signer instance for the new key.

Parameters
keyName: The unique identifier for the new key to be stored in HashiCorp Vault.

Returns
A Signer instance for the specified key.

Data Types
This section elaborates on the data types employed within the VaultSignerFactory class.

VaultLoginWithTokenOptions Type
The VaultLoginWithTokenOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using an access token.

Name    Type    Description
token

string

The access token used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

VaultLoginWithUsernameAndPasswordOptions Type
The VaultLoginWithUsernameAndPasswordOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using a username and password.

Name    Type    Description
username

string

The username used to authenticate with HashiCorp Vault.

password

string

The password used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

VaultLoginWithAppRoleOptions Type
The VaultLoginWithAppRoleOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using an AppRole.

Name    Type    Description
roleId

string

The ID of the AppRole used to authenticate with HashiCorp Vault.

secretId

string

The secret ID of the AppRole used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

Errors
Exception code    Description
invalidArgument

Specified key does not exist or cannot be accessed.

internalError

Vault authentication failed.

Class Implementation
The Hiero DID SDK provides the VaultSignerFactory class within its signer-hashicorp-vault package. For further details, refer to the @hiero-did-sdk-js/signer-hashicorp-vault package documentation.

# HashiCorp Vault Verifier API Reference
This document provides a concise API reference for the Vault Verifier class within the Hedera DID SDK for JavaScript. This class is responsible for verifying signatures using HashiCorp Vault as the key store.

Class Diagram
The class diagram below illustrates the core methods of the Vault Verifier interface for interacting with cryptographic keys stored in HashiCorp Vault.

vault verifier class diagram
Constructor
constructor
constructor(options: VerifierOptions)
Initializes a new Verifier instance.

Parameters
options: (Required) An object containing the necessary options to create a Verifier instance (refer to VerifierOptions Type for details).

Methods
publicKey
publicKey(): string
Returns the public key associated with the Verifier instance in DER format.

Returns
The public key in DER format.

verify
verify(message: Uint8Array, signature: Uint8Array): boolean
Verifies the given signature using the public key stored in HashiCorp Vault.

Parameters
message: The message that was signed.

signature: The signature to be verified.

Returns
true if the signature is valid, false otherwise.

Data Types
This section elaborates on the data types employed within the Verifier class.

VerifierOptions Type
The VerifierOptions type is an object that contains the necessary options to create a Verifier instance.

Name    Type    Description
clientApi

VaultApi

An internal API object that interacts with HashiCorp Vault.

keyName

string

A unique identifier for the key stored in HashiCorp Vault.

Errors
Exception code    Description
internalError

When a Vault API call fails. Message contains the error details.

Class Implementation
The Hiero DID SDK provides the Vault Verifier class within its verifier-hashicorp-vault package. For further details, refer to the @hiero-did-sdk-js/verifier-hashicorp-vault package documentation.

# HashiCorp Vault Verifier Factory API Reference
This document provides a concise API reference for the VaultVerifierFactory class within the Hedera DID SDK for JavaScript. The VaultVerifierFactory class is responsible for creating Vault Verifier instances and authenticating with HashiCorp Vault to securely manage cryptographic keys.

Class Diagram
The class diagram below illustrates the core methods of the Vault VaultVerifierFactory interface for interacting with HashiCorp Vault.

vault verifier factory class diagram
Static Methods
loginWithToken
static loginWithToken(
    options: VaultLoginWithTokenOptions,
): Promise<VaultVerifierFactory>
Creates a new VaultVerifierFactory instance by authenticating with HashiCorp Vault using an access token.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using an access token (refer to VaultLoginWithTokenOptions Type for details).

Returns
The new VaultVerifierFactory instance.

loginWithUsernameAndPassword
static loginWithUsernameAndPassword(
  options: VaultLoginWithUsernameAndPasswordOptions,
): Promise<VaultVerifierFactory>
Creates a new VaultVerifierFactory instance by authenticating with HashiCorp Vault using a username and password.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using a username and password (refer to VaultLoginWithUsernameAndPasswordOptions Type for details).

Returns
The new VaultVerifierFactory instance.

loginWithAppRole
static async loginWithAppRole(
  options: VaultLoginWithAppRoleOptions,
): Promise<VaultVerifierFactory>
Creates a new VaultVerifierFactory instance by authenticating with HashiCorp Vault using an AppRole.

Parameters
options: An object containing the necessary options to authenticate with HashiCorp Vault using an AppRole (refer to VaultLoginWithAppRoleOptions Type for details).

Returns
The new VaultVerifierFactory instance.

Methods
forKey
forKey(keyName: string): Promise<Verifier>
Returns a Vault Verifier instance for the specified key stored in HashiCorp Vault.

Parameters
keyName: The unique identifier for the key stored in HashiCorp Vault.

Returns
A Verifier instance for the specified key.

Data Types
This section elaborates on the data types employed within the VaultVerifierFactory class.

VaultLoginWithTokenOptions Type
The VaultLoginWithTokenOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using an access token.

Name    Type    Description
token

string

The access token used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

VaultLoginWithUsernameAndPasswordOptions Type
The VaultLoginWithUsernameAndPasswordOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using a username and password.

Name    Type    Description
username

string

The username used to authenticate with HashiCorp Vault.

password

string

The password used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

VaultLoginWithAppRoleOptions Type
The VaultLoginWithAppRoleOptions type is an object that contains the necessary options to authenticate with HashiCorp Vault using an AppRole.

Name    Type    Description
roleId

string

The ID of the AppRole used to authenticate with HashiCorp Vault.

secretId

string

The secret ID of the AppRole used to authenticate with HashiCorp Vault.

url

string | URL

The URL of the HashiCorp Vault server.

transitPath?

string

The path for the transit secret engine. Default is transit.

Errors
Exception code    Description
invalidArgument

Specified key does not exist or cannot be accessed.

internalError

Vault authentication failed.

Class Implementation
The Hiero DID SDK provides the VaultVerifierFactory class within its verifier-hashicorp-vault package. For further details, refer to the @hiero-did-sdk-js/verifier-hashicorp-vault package documentation.

# HederaHcsService API Reference
This document provides a concise API reference for the HederaHcsService class — a service for working with Hedera Consensus Service (HCS). It enables creation, update, deletion of topics, message submission, and file handling.

Constructor
constructor
constructor(config: HederaHcsServiceConfiguration)
Creates an instance of HederaHcsService.

Parameters
config (required): Service configuration including Hedera client settings and optional cache configuration.

Methods
createTopic
async createTopic(props?: CreateTopicProps & NetworkName): Promise<TopicInfo>
Creates a new HCS topic.

Parameters
props (optional): Properties for creating a topic, combined with a network name.

CreateTopicProps parameters:
topicMemo (optional, string): Memo associated with the topic.

submitKey (optional, PrivateKey): Key used to submit messages.

adminKey (optional, PrivateKey): Key to administer (update or delete) the topic.

autoRenewPeriod (optional, Duration | Long | number): Auto-renewal period for the topic.

autoRenewAccountId (optional, AccountId | string): Account ID responsible for auto-renewal payments.

autoRenewAccountKey (optional, PrivateKey): Private key of the auto-renew account.

waitForChangesVisibility (optional, boolean): If true, waits for consensus/gossip visibility after creation.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds for changes visibility.

Returns
The created TopicInfo.

updateTopic
async updateTopic(props: UpdateTopicProps & NetworkName): Promise<TopicInfo>
Updates an existing HCS topic.

Parameters
props: Properties for updating a topic, combined with a network name.

UpdateTopicProps parameters:
topicId (required, string): ID of the topic to update.

currentAdminKey (required, PrivateKey): Current admin key authorizing the update.

expirationTime (optional, Timestamp | Date): New expiration time to set.

All properties from CreateTopicProps are also available for update (e.g., topicMemo, submitKey, adminKey, etc.).

Returns
The updated TopicInfo.

deleteTopic
async deleteTopic(props: DeleteTopicProps & NetworkName): Promise<boolean>
Deletes a topic.

Parameters
props: Properties for deleting a topic, combined with a network name.

DeleteTopicProps parameters:
topicId (required, string): ID of the topic to delete.

currentAdminKey (required, PrivateKey): Current admin key authorizing the deletion.

waitForChangesVisibility (optional, boolean): Waits for deletion visibility confirmation if true.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds during which to wait for visibility.

Returns
true if deletion was successful.

getTopicInfo
async getTopicInfo(props: GetTopicInfoProps & NetworkName): Promise<TopicInfo>
Retrieves information about a topic.

Parameters
props: Properties for topic info request, combined with a network name.

GetTopicInfoProps parameters:
topicId (required, string): ID of the topic to retrieve information about.

Returns
The TopicInfo object.

submitMessage
async submitMessage(props: SubmitMessageProps & NetworkName): Promise<SubmitMessageResult>
Submits a message to a topic.

Parameters
props: Properties for message submission, combined with a network name.

SubmitMessageProps parameters:
topicId (required, string): The topic ID to submit the message.

message (required, string): Message content.

submitKey (optional, PrivateKey): Authorized key for message submission.

waitForChangesVisibility (optional, boolean): Wait for consensus/gossip visibility if true.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds to wait for visibility.

Returns
SubmitMessageResult containing nodeId, transactionId, and transactionHash.

getTopicMessages
async getTopicMessages(props: GetTopicMessagesProps & NetworkName): Promise<TopicMessageData[]>
Retrieves messages from a topic.

Parameters
props: Parameters to query topic messages, combined with a network name.

GetTopicMessagesProps parameters:
topicId (required, string): The topic ID to fetch messages from.

maxWaitSeconds (optional, number): Max seconds to wait when polling for new messages.

toDate (optional, Date): Upper time boundary for fetching messages.

limit (optional, number): Maximum number of messages to retrieve.

Returns
An array of TopicMessageData.

submitFile
async submitFile(props: SubmitFileProps & NetworkName): Promise<string>
Submits a file split into topic messages.

Parameters
props: File submission parameters combined with a network name.

SubmitFileProps parameters:
payload (required, Buffer): Binary content of the file.

submitKey (required, PrivateKey): Key to sign each chunk submission transaction.

waitForChangesVisibility (optional, boolean): Wait for consensus/gossip visibility if true.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds to wait for visibility.

Returns
Topic ID created for the file.

resolveFile
async resolveFile(props: ResolveFileProps & NetworkName): Promise<Buffer>
Reconstructs a file from topic messages.

Parameters
props: Parameters identifying the file topic, combined with a network name.

ResolveFileProps parameters:
topicId (required, string): Topic ID containing the file chunks.

Returns
Buffer with the file contents.

# HcsTopicService API Reference
This document provides a detailed API reference for the HcsTopicService class — a service for managing Hedera Consensus Service (HCS) topics, including creating, updating, deleting topics, and retrieving topic info.

Сonstructor
constructor
constructor(client: Client, cache?: CacheConfig | Cache | HcsCacheService)
Creates a new instance of HcsTopicService.

Parameters
client (required): Hedera SDK client instance used for HCS operations.

cache (optional): Cache configuration, cache instance, or an existing HcsCacheService.

Methods
createTopic
async createTopic(props?: CreateTopicProps): Promise<string>
Creates a new HCS topic.

Parameters
props (optional): Properties to configure topic creation.

CreateTopicProps fields:
topicMemo (optional, string): Memo or description for the topic.

submitKey (optional, PrivateKey): Private key required to submit messages.

adminKey (optional, PrivateKey): Private key required for administrative actions on the topic.

autoRenewPeriod (optional, Duration | Long | number): Duration for auto-renewal.

autoRenewAccountId (optional, AccountId | string): Account ID responsible for auto-renew payments.

autoRenewAccountKey (optional, PrivateKey): Private key of the auto-renew account (required if autoRenewAccountId is set).

waitForChangesVisibility (optional, boolean): If true, waits until the topic is visible in the mirror node.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds to wait for changes visibility.

Returns
A promise resolving to the created topic ID as a string.

Throws
Error if autoRenewAccountId is provided without autoRenewAccountKey.

Error if the topic creation transaction fails.

updateTopic
async updateTopic(props: UpdateTopicProps): Promise<void>
Updates an existing HCS topic.

Parameters
props (required): Properties for updating the topic.

UpdateTopicProps fields:
topicId (required, string): The ID of the topic to update.

currentAdminKey (required, PrivateKey): Current admin key authorizing the update.

topicMemo (optional, string): New memo for the topic (set empty string to clear).

submitKey (optional, PrivateKey): New submit key.

adminKey (optional, PrivateKey): New admin key.

autoRenewPeriod (optional, Duration | Long | number): New auto-renewal period (default fallback to 90 days if null).

autoRenewAccountId (optional, AccountId | string): New auto-renew account ID.

autoRenewAccountKey (optional, PrivateKey): Private key of the auto-renew account (required if autoRenewAccountId is provided).

expirationTime (optional, Timestamp | Date): New expiration time.

waitForChangesVisibility (optional, boolean): If true, wait until updated topic info is visible in mirror node.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds for visibility wait.

Returns
A promise resolving when the topic update completes.

Throws
Error if autoRenewAccountId is set without autoRenewAccountKey.

Error if the update transaction fails.

deleteTopic
async deleteTopic(props: DeleteTopicProps): Promise<void>
Deletes an HCS topic.

Parameters
props (required): Properties for deleting the topic.

DeleteTopicProps fields:
topicId (required, string): ID of the topic to delete.

currentAdminKey (required, PrivateKey): Current admin key authorizing the deletion.

waitForChangesVisibility (optional, boolean): Wait until deletion is confirmed visible in mirror node.

waitForChangesVisibilityTimeoutMs (optional, number): Timeout in milliseconds to wait for visibility.

Returns
A promise resolving when deletion is complete.

Throws
Error if the deletion transaction fails.

getTopicInfo
async getTopicInfo(props: GetTopicInfoProps): Promise<TopicInfo>
Retrieves information about a topic, utilizing cache if available.

Parameters
props (required): Properties to specify the topic info to retrieve.

GetTopicInfoProps fields:
topicId (required, string): ID of the topic.

Returns
A promise resolving to TopicInfo.

Throws
Error if topic info retrieval fails.

# HcsMessageService API Reference
This document provides a detailed API reference for the HcsMessageService class — a service for submitting and querying messages in Hedera Consensus Service (HCS) topics.

Constructor
constructor
constructor(client: Client, cache?: CacheConfig | Cache | HcsCacheService)
Creates a new instance of HcsMessageService.

Parameters
client (required): Hedera SDK client instance used for HCS operations.

cache (optional): Cache configuration, cache instance, or an existing HcsCacheService.

Methods
submitMessage
async submitMessage(props: SubmitMessageProps): Promise<SubmitMessageResult>
Submits a message to an HCS topic.

Parameters
props (required): Properties for submitting the message.

SubmitMessageProps fields:
topicId (string, required): The ID of the topic to which the message will be submitted.

message (string, required): The message content to submit.

submitKey (PrivateKey, optional): Private key used to sign the submission transaction.

waitForChangesVisibility (boolean, optional): If true, waits until the message becomes visible/confirmed in the topic.

waitForChangesVisibilityTimeoutMs (number, optional): Timeout in milliseconds to wait for visibility confirmation.

Returns
A promise resolving to a SubmitMessageResult object.

SubmitMessageResult fields:
nodeId (string): The ID of the node that processed the transaction.

transactionId (string): The ID of the transaction.

transactionHash (Uint8Array): The cryptographic hash of the transaction.

Throws
Error if the message submission transaction fails.

getTopicMessages
async getTopicMessages(props: GetTopicMessagesProps): Promise<TopicMessageData[]>
Retrieves messages from an HCS topic.

Parameters
props (required): Properties to configure the message retrieval.

GetTopicMessagesProps fields:
topicId (string, required): The ID of the topic to fetch messages from.

maxWaitSeconds (number, optional): Maximum number of seconds to wait for new messages during polling.

toDate (Date, optional): Upper time bound (inclusive) for message retrieval.

limit (number, optional): Maximum number of messages to retrieve.

Returns
A promise resolving to an array of TopicMessageData.

TopicMessageData fields:
consensusTime (Date): The consensus timestamp when the message was agreed upon.

contents (Uint8Array): The raw content of the message.

# HcsFileService API Reference
This document provides a detailed API reference for the HcsFileService class — a service for submitting and resolving Hedera Consensus Service (HCS) files following the HCS-1 standard.

Constructor
constructor
constructor(client: Client, cache?: CacheConfig | Cache | HcsCacheService)
Creates a new instance of HcsFileService.

Parameters
client (required): Hedera SDK client instance used for HCS operations.

cache (optional): Cache configuration, cache instance, or an existing HcsCacheService.

Methods
submitFile
async submitFile(props: SubmitFileProps): Promise<string>
Submits an HCS-1 formatted file to Hedera Consensus Service.

Parameters
props (required): Properties for submitting a file.

SubmitFileProps fields:
payload (Buffer, required): The file content as a binary buffer.

submitKey (PrivateKey, required): Private key used to sign transaction submissions.

waitForChangesVisibility (boolean, optional): If true, waits until the submitted file is fully visible on the network.

waitForChangesVisibilityTimeoutMs (number, optional): Timeout in milliseconds to wait for visibility confirmation.

Returns
A promise resolving to the topic ID string where the file was submitted.

Throws
Error if an issue occurs during file submission.

resolveFile
async resolveFile(props: ResolveFileProps): Promise<Buffer>
Resolves an HCS-1 file from a Hedera topic ID, using cache if available.

Parameters
props (required): Properties for resolving a file.

ResolveFileProps fields:
topicId (string, required): The topic ID where the file was submitted.

Returns
A promise resolving to a Buffer containing the reconstructed file content.

Throws
Error if the file cannot be resolved.

ResolveFileProps fields:
topicId (string, required): The topic ID where the file was submitted.

Returns
A promise resolving to a Buffer containing the reconstructed file content.

Throws
Error if the topic memo is invalid or does not comply with HCS-1 standard.

Error if the topic contains an admin key (which is not allowed).

Error if the resolved file’s checksum does not match the expected hash.

# HcsCacheService API Reference
This document provides a detailed API reference for the HcsCacheService class — a service responsible for caching Hedera Consensus Service (HCS) topic information, messages, and files.

Constructor
constructor
constructor(configOrCache: CacheConfig | Cache)
Creates a new instance of HcsCacheService.

Parameters
configOrCache (required): Either a cache configuration object specifying cache size, or an existing cache instance implementing the Cache interface.

Methods
getTopicInfo
public getTopicInfo(client: Client, topicId: string): Promise<TopicInfo | null>
Retrieves cached topic information for a given client and topic ID.

Parameters
client (required): Hedera SDK client instance associated with the request.

topicId (required): The ID of the HCS topic.

Returns
A promise resolving to the cached TopicInfo if present, or null if not cached.

setTopicInfo
public setTopicInfo(client: Client, topicId: string, topicInfo: TopicInfo): Promise<void>
Stores topic information in the cache.

Parameters
client (required): Hedera SDK client instance associated with the cache entry.

topicId (required): The ID of the HCS topic.

topicInfo (required): The TopicInfo object to cache.

Returns
A promise that resolves when the data is cached.

removeTopicInfo
public async removeTopicInfo(client: Client, topicId: string): Promise<void>
Removes cached topic information and associated messages for a topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic to remove from cache.

Returns
A promise that resolves when the cache entries have been removed.

getTopicMessages
public getTopicMessages(client: Client, topicId: string): Promise<TopicMessageData[] | null>
Retrieves cached messages for a given topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

Returns
A promise resolving to an array of cached TopicMessageData, or null if no cached messages exist.

setTopicMessages
public async setTopicMessages(client: Client, topicId: string, messages: TopicMessageData[]): Promise<void>
Stores an array of topic messages in the cache and removes any cached file for the topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

messages (required): Array of TopicMessageData to cache.

Returns
A promise that resolves when the messages have been cached and related cached files are cleared.

removeTopicMessages
public async removeTopicMessages(client: Client, topicId: string): Promise<void>
Removes cached messages and cached file for a given topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

Returns
A promise that resolves when the cached messages and file for the topic have been removed.

getTopicFile
public getTopicFile(client: Client, topicId: string): Promise<Buffer | null>
Retrieves a cached file buffer for a topic, if available.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

Returns
A promise resolving to the cached file Buffer, or null if none exists.

setTopicFile
public setTopicFile(client: Client, topicId: string, file: Buffer): Promise<void>
Stores a file buffer in the cache for a given topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

file (required): The file contents as a Buffer.

Returns
A promise that resolves when the file has been cached.

removeTopicFile
public removeTopicFile(client: Client, topicId: string): Promise<void>
Removes a cached file for a given topic.

Parameters
client (required): Hedera SDK client instance.

topicId (required): The ID of the HCS topic.

Returns
A promise that resolves when the cached file has been removed.

# Publisher API Reference
This document provides a concise API reference for the Publisher class within the Hedera DID SDK for JavaScript. This class is responsible for submitting transactions to the Hedera network.

Class Diagram
The class diagram below illustrates the core methods of the Publisher interface for interacting with the Hedera network.

publisher class diagram
Constructor
constructor
constructor(client: Client)
Initializes a new Publisher instance.

Parameters
client: A Hedera Client instance configured to interact with the Hedera network.

Methods
publish
publish(transaction: Transaction): Promise<TransactionReceipt>
Submits the given transaction to the Hedera network.

Parameters
transaction: The transaction to be submitted.

Returns
A promise that resolves to the TransactionReceipt of the submitted transaction.

network
network(): string
Returns the name of the Hedera network the Publisher is configured to use (e.g., "mainnet", "testnet").

Returns
The name of the Hedera network.

publicKey
publicKey(): PublicKey
Returns the public key of the operator account associated with the Hedera Client.

Returns
The public key of the operator account.

Errors
Exception code    Description
invalidArgument

Hashgraph SDK Client is required to create a Publisher.

invalidArgument

Hashgraph SDK Client must be configured with a network.

invalidArgument

Hashgraph SDK Client must be configured with an operator account.

internalError

Unknown network, ledger ID: #.

Class Implementation
The Hiero DID SDK provides the Publisher class within its publisher-internal package. For further details, refer to the @hiero-did-sdk-js/publisher-internal package documentation.

# HederaAnoncredsRegistry API Reference
This document provides a detailed API reference for the HederaAnoncredsRegistry class — a service for managing Anoncreds schemas, credential definitions, and revocation registries on Hedera Consensus Service (HCS).

Type Aliases
NetworkName
Represents an optional network name.

Parameters
networkName (optional, string): The Hedera network name to use for operations.

Class: HederaAnoncredsRegistry
constructor
constructor(config: HederaAnoncredsRegistryConfiguration)
Creates a new instance of HederaAnoncredsRegistry.

Parameters
config (required): Configuration object for initializing underlying HCS service.

registerSchema
async registerSchema(options: RegisterSchemaOptions & NetworkName): Promise<RegisterSchemaReturn>
Registers a schema in the network registry.

Parameters
options (required): Options for registering the schema.

Fields of RegisterSchemaOptions & NetworkName:
networkName (optional, string): Network name to use.

issuerKeyDer (required, string): The issuer private key in the DER format.

schema (required, Anoncreds schema object): The schema to register.

Returns
A promise resolving to a RegisterSchemaReturn object that includes the registration state and metadata.

getSchema
async getSchema(schemaId: string): Promise<GetSchemaReturn>
Retrieves a schema definition from the registry by its identifier.

Parameters
schemaId (required, string): The schema definition identifier to resolve.

Returns
A promise resolving to a GetSchemaReturn object with the schema and resolution metadata.

registerCredentialDefinition
async registerCredentialDefinition(options: RegisterCredentialDefinitionOptions & NetworkName): Promise<RegisterCredentialDefinitionReturn>
Registers a credential definition in the registry.

Parameters
options (required): Credential definition registration options.

Fields of RegisterCredentialDefinitionOptions & NetworkName:
networkName (optional, string): Network name to use.

issuerKeyDer (required, string): The issuer private key in the DER format.

credentialDefinition (required, Anoncreds credential definition): The credential definition to register.

options (optional): Additional metadata options such as supportRevocation flag.

Returns
A promise resolving to a RegisterCredentialDefinitionReturn containing the registration state and metadata.

getCredentialDefinition
async getCredentialDefinition(credentialDefinitionId: string): Promise<GetCredentialDefinitionReturn>
Retrieves a credential definition from the registry by identifier.

Parameters
credentialDefinitionId (required, string): The credential definition identifier to resolve.

Returns
A promise resolving to a GetCredentialDefinitionReturn with the credential definition and resolution metadata.

registerRevocationRegistryDefinition
async registerRevocationRegistryDefinition(options: RegisterRevocationRegistryDefinitionOptions & NetworkName): Promise<RegisterRevocationRegistryDefinitionReturn>
Registers a revocation registry definition in the registry.

Parameters
options (required): Options for registering the revocation registry definition.

Fields of RegisterRevocationRegistryDefinitionOptions & NetworkName:
networkName (optional, string): Network name to use.

issuerKeyDer (required, string): The issuer private key in the DER format.

revocationRegistryDefinition (required, Anoncreds revocation registry definition): The registry definition to register.

Returns
A promise resolving to a RegisterRevocationRegistryDefinitionReturn describing registration state and metadata.

getRevocationRegistryDefinition
async getRevocationRegistryDefinition(revocationRegistryDefinitionId: string): Promise<GetRevocationRegistryDefinitionReturn>
Retrieves a revocation registry definition from the registry by its identifier.

Parameters
revocationRegistryDefinitionId (required, string): The revocation registry definition ID to resolve.

Returns
A promise resolving to a GetRevocationRegistryDefinitionReturn with the registry definition and resolution metadata.

registerRevocationStatusList
async registerRevocationStatusList(options: RegisterRevocationStatusListOptions & NetworkName): Promise<RegisterRevocationStatusListReturn>
Registers a revocation status list in the registry.

Parameters
options (required): Options for revocation status list registration.

Fields of RegisterRevocationStatusListOptions & NetworkName:
networkName (optional, string): Network name to use.

issuerKeyDer (required, string): The issuer private key in the DER format.

revocationStatusList (required, Anoncreds revocation status list without timestamp): The revocation status list to register.

Returns
A promise resolving to a RegisterRevocationStatusListReturn describing the registration state and metadata.

getRevocationStatusList
async getRevocationStatusList(revocationRegistryId: string, timestamp: number): Promise<GetRevocationStatusListReturn>
Retrieves a revocation status list as of a specific timestamp.

Parameters
revocationRegistryId (required, string): The revocation registry ID.

timestamp (required, number): The UNIX timestamp to resolve the status list for.

Returns
A promise resolving to a GetRevocationStatusListReturn.

# Core API Reference
This document provides a concise API reference for the core interfaces, utilities, and functions within the Hedera DID SDK for JavaScript.

Interfaces
DIDDocument
Represents a DID Document, which contains information about a DID, such as its public keys and services.

Interface Diagram
did document interface diagram
Properties
Name    Type    Description
id

string

The DID string of the Decentralized Identifier.

controller

string

The DID that controls the DID document.

verificationMethod

VerificationMethod[]

An array of verification methods associated with the DID.

authentication?

(VerificationMethod | string)[]

An optional array of verification method IDs or verification methods that can be used for authentication.

assertionMethod?

(VerificationMethod | string)[]

An optional array of verification method IDs or verification methods that can be used for assertion.

keyAgreement?

(VerificationMethod | string)[]

An optional array of verification method IDs or verification methods that can be used for key agreement.

capabilityInvocation?

(VerificationMethod | string)[]

An optional array of verification method IDs or verification methods that can be used for capability invocation.

capabilityDelegation?

(VerificationMethod | string)[]

An optional array of verification method IDs or verification methods that can be used for capability delegation.

service?

Service[]

An optional array of services associated with the DID.

Signer
Defines the methods for signing and verifying data using a DID’s private key. It supports only ED25519 signatures.

Interface Diagram
signer interface diagram
Properties
Name    Type    Description
sign

(message: Uint8Array) ⇒ Promise<Uint8Array> | Uint8Array

Asynchronously signs the provided message using the signer’s private key and returns a Promise that resolves to the signature.

publicKey

() ⇒ Promise<PublicKeyInDer> | PublicKeyInDer

Asynchronously retrieves the public key associated with the signer in DER format.

verify

(message: Uint8Array, signature: Uint8Array) ⇒ Promise<boolean> | boolean

Asynchronously verifies the given signature against the provided message using the signer’s public key, returning a Promise that resolves to true if the signature is valid, false otherwise.

Verifier
Defines the methods for verifying the signatures of DID operations. It supports only ED25519 signatures. Can be used to verify the signatures when having only the public key.

Interface Diagram
verifier interface diagram
Properties
Name    Type    Description
publicKey

() ⇒ Promise<PublicKeyInDer> | PublicKeyInDer

Asynchronously retrieves the public key associated with the signer in DER format.

verify

(message: Uint8Array, signature: Uint8Array) ⇒ Promise<boolean> | boolean

Asynchronously verifies the given signature against the provided message using the signer’s public key, returning a Promise that resolves to true if the signature is valid, false otherwise.

Publisher
Defines the methods for submitting transactions to the Hedera network.

Interface Diagram
publisher interface diagram
Properties
Name    Type    Description
network

() ⇒ Network

Returns the name of the Hedera network used by the publisher, eg. "mainnet" or "testnet".

publicKey

() ⇒ PublicKey

Returns the public key of the account used by the publisher.

publish

(transaction: Transaction) ⇒ Promise<TransactionReceipt> | TransactionReceipt

Asynchronously submits the provided transaction to the network, executes it, and returns a Promise that resolves to a result object containing the outcome of the transaction.

DIDMessage
Represents a message used for DID operations, such as creating, updating, or deactivating a DID. It’s an abstract class that can be extended to create specific DID operation messages.

Interface Diagram
did message interface diagram
Properties
Name    Type    Description
signature?

Uint8Array

The signature of the DID message.

operation?

DIDMessageOperation

The DID operation to be performed, eg. "create", "update", "revoke".

did

string

The DID string of the Decentralized Identifier.

message

object

The message object containing the data to be signed according to the DID operation and Hedera DID specification.

topicId

string

The topic ID where the DID message will be published.

messageBytes

Uint8Array

A byte array representation of the message object. This is used for signing the message.

payload

string

Gets the payload of the DID message that will be published to the Hedera network. it contains the message object and the signature.

Methods
Name    Type    Description
signWith

signWith(signer: Signer): Promise<void>

Signs the DID message using the provided signer.

setSignature

setSignature(signature: Uint8Array, verifier: Verifier): Promise<void>

Sets the signature of the DID message and verifies it using the provided verifier.

toBytes

toBytes(): string

Converts the DID message to a byte array in a base64-encoded string format.

static fromBytes

static fromBytes(bytes: string): DIDMessage

A static method that creates a DID message from a byte array in a base64-encoded string format.

DIDError
A custom error class for all SDK-related errors. It extends the JavaScript Error class and provides additional properties for error handling.

Interface Diagram
diderror interface diagram
Properties
Name    Type    Description
isDIDError

boolean

Always true to indicate that the error is a DID-related error.

code

ErrorCodes

The error code that identifies the type of error.

description

string

A human-readable description of the error. Provides additional information about the error.

ErrorCodes
A enumerated type for defining error codes used by the DIDError class.

type ErrorCodes =
  | 'invalidDid'
  | 'invalidDidUrl'
  | 'methodNotSupported'
  | 'representationNotSupported'
  | 'invalidPublicKey'
  | 'invalidPublicKeyLength'
  | 'invalidPublicKeyType'
  | 'unsupportedPublicKeyType'
  | 'internalError'
  | 'notFound'
  | 'invalidSignature'
  | 'invalidMultibase'
  | 'invalidArgument';
Network
A enumerated type for defining Hedera network configurations. It specifies the network of the Hedera DID document.

Interface
type Network = 'mainnet' | 'testnet' | 'previewnet' | 'local-node';
VerificationMethodProperties
A enumerated type for defining verification method properties. It specifies the properties of a verification method, such as authentication, assertionMethod, keyAgreement, capabilityInvocation, and capabilityDelegation.

Interface
type VerificationMethodProperties =
  | 'verificationMethod'
  | 'authentication'
  | 'assertionMethod'
  | 'keyAgreement'
  | 'capabilityInvocation'
  | 'capabilityDelegation';
Utilities
KeysUtility
Provides methods for generating, transforming, and validating cryptographic keys.

Class Diagram
keys utility class diagram
Properties
Name    Type    Description
toMultibase

(algorithm: MultibaseAlgorithm) ⇒ string

Converts the key to multibase format using the specified algorithm.

toBase58

() ⇒ string

Converts the key to a base58-encoded string.

toBytes

() ⇒ Uint8Array

Converts the key to a byte array.

toPublicKey

() ⇒ PublicKey

Converts the key to a Hedera PublicKey.

fromPublicKey

static (publicKey: PublicKey) ⇒ KeysUtility

Creates a new KeysUtility instance from a Hedera PublicKey.

fromDerString

static (der: string) ⇒ KeysUtility

Creates a new KeysUtility instance from a DER-encoded public key.

fromBytes

static (bytes: Uint8Array) ⇒ KeysUtility

Creates a new KeysUtility instance from a byte array.

fromBase58

static (base58String: string) ⇒ KeysUtility

Creates a new KeysUtility instance from a base58-encoded public key.

fromMultibase

static (multibase: string) ⇒ KeysUtility

Creates a new KeysUtility instance from a multibase-encoded public key.

MultibaseCodec
Provides methods for encoding and decoding data using the multibase encoding format. Supported algorithms: base16, base16upper, base32, base32upper, base58btc, base64, base64url, base64urlpad.

Class Diagram
multibase utility class diagram
Properties
Name    Type    Description
decode

static (data: string) ⇒ Uint8Array

Decodes a multibase-encoded string to a byte array.

encode

static (data: Uint8Array, algorithm: MultibaseAlgorithm) ⇒ string

Encodes a byte array to a multibase-encoded string using the specified algorithm. Default algorithm is base58btc.

CborCodec
Provides methods for encoding and decoding data using the CBOR encoding format. It allows to encode data to bytes or hex strings and decode bytes or hex strings to data.

Class Diagram
cbor utility class diagram
Properties
Name    Type    Description
decode

static (data: Uint8Array | string) ⇒ Uint8Array

Decodes a CBOR-encoded byte array or hex string to a byte array.

encode

static (data: Uint8Array | string | object) ⇒ Uint8Array

Encodes a byte array, hex string, or object to a CBOR-encoded byte array.

encodeHex

static (data: Uint8Array | string | object) ⇒ string

Encodes a byte array, hex string, or object to a CBOR-encoded hex string.

Validation
isHederaDID
Checks if a given string is a valid Hedera DID. Returns true if the string is a valid DID, false otherwise.

Function Signature
function isHederaDID(did: string): boolean;
isHederaDIDUrl
Checks if a given string is a valid Hedera DID URL. Returns true if the string is a valid DID URL, false otherwise.

Function Signature
function isHederaDIDUrl(didUrl: string): boolean;
isEd25519PublicKey
Checks if a given byte array or multibase string is a valid ED25519 public key. Returns true if the byte array or multibase string is a valid ED25519 public key, false otherwise. It only check the length of the key.

Function Signature
function isEd25519PublicKey(bytes: Uint8Array): boolean;

function isEd25519PublicKey(multibase: string): boolean;
Component Implementation
The Hiero DID SDK provides the core interfaces, utilities, and validation tools within its core package. For further details, refer to the @hiero-did-sdk-js/core package documentation.

# Cache API Reference
This document provides a detailed API reference for the LRUMemoryCache class — an in-memory Least Recently Used (LRU) cache implementation of the Cache interface.

Interfaces
Cache
Interface defining the contract for a cache implementation.

Methods
get<CacheValue>(key: string): Promise<CacheValue | null>

set<CacheValue>(key: string, value: CacheValue, expiresInSeconds?: number): Promise<void>

remove(key: string): Promise<void>

clear(): Promise<void>

cleanupExpired(): Promise<void>

getAll<CacheValue>(): Promise<KeyValue<CacheValue>[]>

KeyValue<CacheValue>
Represents a cache entry key and its associated value.

Parameters
key (string): The cache key.

value (CacheValue): The cached value.

CacheEntry<CacheValue>
Represents an internal cache entry with its value and optional expiration timestamp.

Parameters
value (CacheValue): The cached value.

expiresAt (optional, number): Timestamp in milliseconds when the cache entry expires.

Class: LRUMemoryCache
Implements an in-memory LRU cache with a configurable maximum size. Least recently used items are evicted when the cache reaches its limit.

constructor
constructor(maxSize: number = 10000)
Creates a new instance of LRUMemoryCache.

Parameters
maxSize (optional, number): Maximum number of entries the cache can hold. Defaults to 10000.

get
get<CacheValue>(key: string): Promise<CacheValue | null>
Retrieves a value from the cache by its key. If the item is found, it is refreshed to be the most recently used. Returns null if the item does not exist or is expired.

Parameters
key (string, required): The cache key to retrieve.

Returns
A promise resolving to the cached value or null if absent or expired.

set
set<CacheValue>(key: string, value: CacheValue, expiresInSeconds?: number): Promise<void>
Adds a value to the cache associated with the given key. If the cache is full, the least recently used item is evicted. Optionally, an expiration time can be set.

Parameters
key (string, required): The cache key.

value (CacheValue, required): The value to cache.

expiresInSeconds (number, optional): Number of seconds before the cache entry expires.

Returns
A promise that resolves when the value has been cached.

remove
remove(key: string): Promise<void>
Removes the cache entry for the specified key.

Parameters
key (string, required): The cache key to remove.

Returns
A promise resolving when the entry is removed.

clear
clear(): Promise<void>
Clears all entries from the cache.

Returns
A promise resolving when the cache has been cleared.

cleanupExpired
cleanupExpired(): Promise<void>
Removes all expired entries from the cache.

Returns
A promise resolving when expired entries have been cleaned up.

getAll
getAll<CacheValue>(): Promise<KeyValue<CacheValue>[]>
Retrieves all cache entries as an array of key-value pairs.

Returns
A promise resolving to an array of KeyValue objects representing all cached entries.

# HederaClientService API Reference
This document provides a detailed API reference for the HederaClientService class — a service to manage Hedera SDK clients with support for multiple Hedera networks (mainnet, testnet, previewnet, local-node, and custom networks).

Constants
HEDERA_NETWORKS
export const HEDERA_NETWORKS = ['mainnet', 'testnet', 'previewnet', 'local-node'] as const;
List of predefined Hedera public network names supported by the SDK.

Types and Interfaces
NetworkName
An object to optionally specify a network name when performing operations.

Parameters
networkName (optional, string): The name of the Hedera network to use for the operation. If omitted and there is only one configured network, that network will be used by default.

HederaNetwork
A union type representing the allowed Hedera public networks.

Values
'mainnet': The main Hedera public network.

'testnet': The Hedera test network for testing and development.

'previewnet': A preview network for early access features.

'local-node': A local Hedera node network, typically used for local testing.

HederaCustomNetwork
Defines a configuration for a custom Hedera network.

Parameters
name (string): Unique identifier for the custom network.

nodes (object): A map where keys are node account IDs or names and values are node addresses (string or AccountId).

mirrorNodes (optional, string | string[]): One or more mirror node URLs for the custom network.

NetworkConfig
Configuration for connecting to a Hedera network.

Parameters
network (HederaNetwork | HederaCustomNetwork): Either a predefined Hedera public network name or a custom network configuration.

operatorId (string): The account ID of the operator (payer of transactions) on the Hedera network.

operatorKey (string): The private key corresponding to the operator account, used for signing transactions.

HederaClientConfiguration
Top-level configuration for initializing HederaClientService.

Parameters
networks (array of NetworkConfig): Array of network configurations supported by the client service. This array must contain at least one network, and each network must have a unique name.

Note
The uniqueness of network names is validated during initialization.

Each network config defines important credentials and endpoints for connecting and signing on Hedera.

Class: HederaClientService
Manages Hedera SDK clients for one or more networks, providing convenience methods to obtain clients and run operations with automatic lifecycle management.

constructor
constructor(config: HederaClientConfiguration)
Creates a new instance of HederaClientService with the specified configuration.

Parameters
config (required): Configuration object specifying one or more Hedera networks via an array of NetworkConfig.

Must contain at least one network configuration.

Network names must be unique across all entries.

Throws
Throws an error if no networks are provided.

Throws an error if there are duplicate network names.

getClient
public getClient(networkName?: string): Client
Retrieves a Hedera Client instance for the specified network.

Parameters
networkName (optional, string): The name of the network to get the client for.

If omitted and only one network is configured, the single configured network is used.

If omitted but multiple networks are configured, an error is thrown.

The network name must match either a known public Hedera network or a custom network name.

Returns
A configured Hedera Client instance for the network.

Throws
Throws an error if the specified network name is unknown.

Details
For known public networks (mainnet, testnet, previewnet, local-node), a preconfigured client is created via Client.forName.

For custom networks, the client is created from the custom configuration including nodes, mirror nodes, and operator credentials.

The default max transaction fee is set to 2 HBAR for all clients.

withClient
public async withClient<T>(props: NetworkName, operation: (client: Client) => Promise<T>): Promise<T>
Convenience method to execute an asynchronous operation that requires a Hedera client.

Parameters
props (required): An object optionally including networkName specifying which network client to use.

operation (required): A callback function that receives the Hedera Client instance and returns a Promise<T>.

Returns
A promise resolving to the result of the operation.

Behavior
Obtains a client with getClient using the provided networkName.

Executes the operation callback with the client.

Ensures the client connection is properly closed after the operation completes.

# Crypto API Reference
This document provides a concise API reference for the Crypto class and its related interfaces, which provide cryptographic hashing functionality, specifically SHA-256 hashing, with compatibility across Node.js and React Native environments.

Types and Interfaces
HashInput
Input data types supported for hashing.

Values
string

Buffer

Uint8Array

ArrayBuffer

CryptoModule
Interface representing a cryptographic module capable of creating hash instances or providing a direct SHA256 method.

Properties
createHash? (optional method): Function accepting an algorithm name and returning a Hash instance.

SHA256? (optional method): Convenience method accepting HashInput and returning an object with a toString() method to get the hash string.

Hash
Interface representing a hash computation instance.

Methods
update(data: HashInput): Hash Updates the hash with the given data. Returns the Hash instance for chaining.

digest(encoding: 'hex'): string Finalizes the hash computation and returns the digest in the specified encoding format (only 'hex' supported here).

Class: Crypto
sha256
public static sha256(data: HashInput): string
Computes the SHA-256 hash of the given input data.

Parameters
data (required, HashInput): The input data to hash. Supported types include string, Buffer, Uint8Array, and ArrayBuffer.

Returns
A hexadecimal string representing the SHA-256 hash of the input data.

Throws
Throws an error if no compatible crypto module can be found in the current environment.

Details
Internally uses the first available crypto module in the following order:

Node.js built-in crypto module.

react-native-quick-crypto module (for React Native).

Converts various input types to a Node.js Buffer before hashing.

Internal Functions (not part of public API)
getAvailableCryptoModule
function getAvailableCryptoModule(): CryptoModule
Selects and returns a compatible cryptographic module available in the runtime environment.

Returns
The first compatible CryptoModule found (crypto for Node.js or react-native-quick-crypto for React Native).

Throws
Throws an error if no compatible crypto module is found, prompting the user to install required polyfills.

convertInputToBuffer
function convertInputToBuffer(data: HashInput): Buffer
Converts the input data of various supported types into a Node.js Buffer.

Parameters
data (required, HashInput): The input data to convert.

Returns
A Buffer instance representing the input data in UTF-8 encoding (for strings) or raw bytes (for binary types).

# Lifecycle API Reference
This document provides a concise API reference for the Lifecycle Management component within the Hedera DID SDK for JavaScript.

Classes
LifecycleBuilder
The LifecycleBuilder class provides a fluent interface for defining the steps involved in a DID operation.

Class Diagram
lifecycle builder class diagram
Properties
length
public length: number
Gets the number of steps in the lifecycle.

catchStep
public catchStep?: CatchStep
Gets the catch step in the lifecycle that handles errors. undefined if no catch step is defined.

Methods
callback
callback(label: string, callback: (message: Message, publisher: Publisher) => Promise<void> | void): LifecycleBuilder
Adds a callback step to the lifecycle.

Parameters
label: A unique identifier for the callback step.

callback: A function that will be executed asynchronously. It receives a Message object and a Publisher object as parameters, which provides access to data and utilities within the lifecycle.

Returns
The LifecycleBuilder instance for method chaining.

signature
signature(label: string): LifecycleBuilder
Adds a signature step to the lifecycle. This step is used to add signature to the message using the provided signature as an option in lifecycle runner.

Parameters
label: A unique identifier for the signature step.

Returns
The LifecycleBuilder instance for method chaining.

signWithSigner
signWithSigner(label: string): LifecycleBuilder
Adds a signing step with a Signer class to the lifecycle. This step uses the Signer provided in the lifecycle runner to sign the data.

Parameters
label: A unique identifier for the sign with signer step.

Returns
The LifecycleBuilder instance for method chaining.

pause
pause(label: string): LifecycleBuilder
Adds a pause step to the lifecycle. This allows for manual intervention or waiting for external events before continuing the execution.

Parameters
label: A unique identifier for the pause step.

Returns
The LifecycleBuilder instance for method chaining.

catch
catch(label: string, callback: (error: unknown) => void | Promise<void>): LifecycleBuilder
Adds a catch step to the lifecycle. This step is used to handle errors that occur during the execution of previous steps.

Parameters
label: A unique identifier for the catch step.

callback: A function that will be executed if an error occurs. It receives the error object as a parameter.

Returns
The LifecycleBuilder instance for method chaining.

getByIndex
getByIndex(stepIndex: number): Steps<Message>
Gets the step at the specified index in the lifecycle.

Parameters
stepIndex: A number representing the index of the step to retrieve.

Returns
A Steps<Message> object representing the step at the specified index.

Errors
The following exceptions may arise during the execution of the getByIndex function:

Exception code    Description
internalError

Step index out of bounds.

getByLabel
getByLabel(stepLabel: string): Steps<Message>
Gets the step with the specified label in the lifecycle.

Parameters
stepLabel: A string representing the label of the step to retrieve.

Returns
A Steps<Message> object representing the step with the specified label.

Errors
The following exceptions may arise during the execution of the getByLabel function:

Exception code    Description
internalError

Step with label # does not exist.

getIndexByLabel
getIndexByLabel(stepLabel: string): number
Gets the index of the step with the specified label in the lifecycle.

Parameters
stepLabel: A string representing the label of the step to retrieve.

Returns
A number representing the index of the step with the specified label.

Errors
The following exceptions may arise during the execution of the getByLabel function:

Exception code    Description
internalError

Step with label # does not exist.

LifecycleRunner
The LifecycleRunner class is responsible for executing a Lifecycle.

Class Diagram
lifecycle runner class diagram
Methods
constructor
constructor(builder: LifecycleBuilder<Message>): LifecycleRunner
Initializes a new LifecycleRunner instance.

Parameters
builder: A LifecycleBuilder object representing the lifecycle steps.

Returns
A new LifecycleRunner instance.

process
process(
  message: Message,
  options: LifecycleRunnerOptions,
): Promise<RunnerState<Message>>
Starts the execution of the lifecycle.

Parameters
message: The initial message to be processed by the lifecycle.

options: A LifecycleRunnerOptions object providing additional options for the lifecycle runner, like the Publisher and Signer instances.

Returns
A Promise that resolves to a LifecycleState object, which contains information about the current state of the lifecycle and processed message.

Errors
The following exceptions may arise during the execution of the process function:

Exception code    Description
invalidArgument

Signature and verifier are required for the signature step.

invalidArgument

Signer is missing, but required.

resume
resume(
  state: RunnerState<Message>,
  options: LifecycleRunnerOptions,
): Promise<RunnerState<Message>>
Resumes the execution of a paused lifecycle.

Parameters
state: The RunnerState object representing the paused state of the lifecycle.

context: A LifecycleRunnerOptions object providing additional options for the lifecycle runner, like the Publisher and Signer instances.

Returns
A Promise that resolves to a RunnerState object, which contains information about the current state of the lifecycle.

Errors
The following exceptions may arise during the execution of the resume function:

Exception code    Description
invalidArgument

Signature and verifier are required for the signature step.

invalidArgument

Signer is missing, but required.

onComplete
onComplete(label: string, callback: (message: Message,) => void | Promise<void>): void
Registers a callback to be executed when the lifecycle step with the specified label is completed.

Parameters
label: The label of the lifecycle step.

callback: A function to be executed when the step is completed.

Component Implementation
The Hiero DID SDK provides the Lifecycle Management classes and interfaces within its lifecycle package. For further details, refer to the @hiero-did-sdk-js/lifecycle package documentation.

# Messages API Reference
This document provides a concise API reference for the Messages component within the Hedera DID SDK for JavaScript.

Message Classes
DIDMessage
Represents an abstract DID Message. All other DID Message classes inherit from this class. It streamlines common functionality for DID Messages, such as signing and verifying messages.

Class Diagram
did message class diagram
Properties
Name    Type    Description
signature

Uint8Array

The signature of the DID Message.

operation

DIDMessageOperation

The operation of the DID Message, such as "create", "update", or "revoke".

did

string

The DID string of the Decentralized Identifier.

message

object

The message object. It varies depending on the operation and message type. Includes the encoded event and other message-specific data.

topicId

string

The ID of the Hedera topic associated with the DID.

messageBytes

Uint8Array

The byte array of the message. It is used for signing and verifying the message.

payload

string

The actual content of the message that is published to the Hedera topic. It contains the message and the signature in a base64-encoded string. It may throw an error if the message is not signed.

Methods
signWith
signWith(signer: Signer): Promise<void>
Signs the DID Message with the provided signer.

Parameters
signer: The signer object used to sign the DID Message.

setSignature
setSignature(
  signature: Uint8Array,
  verifier: Verifier,
): Promise<void>
Sets the signature of the DID Message and verifies the signature with the provided verifier.

Parameters
signature: The signature to set.

verifier: The verifier object used to verify the signature.

Errors
The following exceptions may arise during the execution of the setSignature function:

Exception code    Description
invalidSignature

The signature is invalid.

toBytes
abstract toBytes(): string
Serializes the DID Message into a byte array in base64 format.

Returns
The serialized DID Message as a base64-encoded string.

fromBytes
static abstract fromBytes(bytes: string): DIDMessage
Deserializes a DID Message from a byte array in base64 format.

Parameters
bytes: The byte array containing the serialized DID Message.

Returns
The deserialized DID Message object.

DIDOwnerMessage
Represents a DID Owner message, used for creating and managing DID ownership.

This class encapsulate the DIDOwner event payload from Hiero DID Method Specification.

Class Diagram
did owner message class diagram
Properties
Name    Type    Description
publicKey

PublicKey

The public key of the DID owner, in the form of a PublicKey object.

timestamp

Date

The timestamp of the DID Owner message creation.

network

Network

The network on which the DID Owner message is created.

controller

string

The DID that controls the DID owner.

Methods
setTopicId
setTopicId(topicId: string): void;
Sets the topic ID of the Hedera topic associated with the DID Owner message. It also performs the verification of the topic ID.

Parameters
topicId: The ID of the Hedera topic associated with the DID Owner message.

setController
setController(controller: string): void;
Sets the controller of the DID Owner message. It also performs the verification of the format of the provided DID.

Parameters
controller: The DID that controls the DID owner.

setNetwork
setNetwork(network: Network): void;
Sets the network on which the DID Owner message is created.

Parameters
network: The network on which the DID Owner message is created.

DIDAddVerificationMethodMessage
Represents a DID Add Verification Method message, used for adding verification methods or a verification relationship to a DID Document.

Verification relationships are used to associate a verification method with a specific property in the DID Document, such as "assertionMethod" or "authentication".

This class encapsulate the VerificationMethod and VerificationRelationship event payload from Hedera DID Method Specification.

Class Diagram
did add verification method message class diagram
Properties
Name    Type    Description
controller

string

The DID that controls the verification method.

property

VerificationMethodProperties

The property to which the verification method will be added (e.g., "verificationMethod", "authentication").

publicKeyMultibase

string

The multibase-encoded public key of the verification method.

id

string

The identifier of the verification method (e.g., "#key-1").

timestamp

string

The timestamp of the DID Add Verification Method message creation.

DIDRemoveVerificationMethodMessage
Represents a DID Remove Verification Method message, used for removing verification methods or a verification relationship from a DID Document.

This class encapsulate the VerificationMethod and VerificationRelationship event payload from Hedera DID Method Specification.

Class Diagram
did remove verification method message class diagram
Properties
Name    Type    Description
property

string

The property from which the verification method will be removed (e.g., "verificationMethod", "authentication").

id

string

The identifier of the verification method to be removed (e.g., "#key-1").

timestamp

Date

The timestamp of the DID Remove Verification Method message creation.

DIDAddServiceMessage
Represents a DID Add Service message, used for adding a service to a DID Document.

This class encapsulate the Service event payload from Hedera DID Method Specification.

Class Diagram
did add service message class diagram
Properties
Name    Type    Description
type

string

The type of the service.

serviceEndpoint

string

The service endpoint URL.

id

string

The identifier of the service (e.g., "#srv-1").

timestamp

string

The timestamp of the DID Add Service message creation.

DIDRemoveServiceMessage
Represents a DID Remove Service message, used for removing a service from a DID Document.

This class encapsulate the Service event payload from Hedera DID Method Specification.

Class Diagram
did remove service message class diagram
Properties
Name    Type    Description
id

string

The identifier of the service (e.g., "#srv-1") to be removed.

timestamp

string

The timestamp of the DID Remove Service message creation.

DIDDeactivateMessage
Represents a DID Deactivate message, used for deactivating a DID.

Class Diagram
did deactivate message class diagram
Properties
Name    Type    Description
did

string

The DID string of the Decentralized Identifier to deactivate.

timestamp

Date

The timestamp of the DID Deactivate message creation.

Component Implementation
The Hiero DID SDK provides the DID Message classes within its messages package. For further details, refer to the @hiero-did-sdk-js/messages package documentation.

# Zstd API Reference
This document provides a concise API reference for the Zstd class and the related ZstdModule interface, which provide compression and decompression functionality using the Zstandard (zstd) algorithm, with support for both Node.js and React Native environments.

Interfaces
ZstdModule
Interface representing a Zstandard compression module.

Methods
compress(data: Uint8Array): Uint8Array Compresses the given data and returns the compressed bytes.

decompress(data: Uint8Array): Uint8Array Decompresses the given compressed data and returns the original bytes.

Class: Zstd
Provides static methods for compressing and decompressing binary data using zstd compression, automatically selecting an appropriate implementation based on the runtime environment.

compress
public static compress(data: Uint8Array): Uint8Array
Compresses input data using Zstandard compression.

Parameters
data (required, Uint8Array): The raw input data to compress.

Returns
A Uint8Array containing the compressed data.

Throws
Throws an error if no compatible zstd module is available in the environment.

Details
Internally selects either the native Node.js zstd-napi module or the React Native react-native-zstd module.

For React Native, performs necessary data conversions to align the APIs.

decompress
public static decompress(data: Uint8Array): Uint8Array
Decompresses input data previously compressed with Zstandard.

Parameters
data (required, Uint8Array): The compressed input data to decompress.

Returns
A Uint8Array containing the decompressed original data.

Throws
Throws an error if no compatible zstd module is available in the environment.

Details
Uses the first available zstd module in the environment as with compress.

Handles required data conversions for React Native implementations.

Internal Functions (not part of public API)
getAvailableZstdModule
function getAvailableZstdModule(): ZstdModule
Determines and returns a compatible Zstandard compression module available in the current runtime.

Returns
A ZstdModule instance capable of compressing and decompressing data.

Throws
Throws an error if neither the Node.js zstd-napi package nor the React Native react-native-zstd package is found, with instructions for installation.

Details
Tries Node.js native binding zstd-napi first.

If unavailable, tries React Native binding react-native-zstd, adapting API usage with data conversion.

# Packages Guide
This document provides an overview of the npm packages that comprise the Hiero DID SDK.

Essential Packages
These packages provide the essential building blocks for working with DIDs on Hedera.

Package Name    Description
@hiero-did-sdk/resolver

Provides the functionality to resolve Decentralized Identifiers (DIDs) to their corresponding DID Documents.

@hiero-did-sdk/registrar

Provides the functionality to create and manage DIDs on the Hedera network.

@hiero-did-sdk/signer-internal

Provides the functionality for secure key generation and signing operations for DIDs.

@hiero-did-sdk/publisher-internal

Provides the functionality to submit and execute transactions related to DID operations on the Hedera network.

@hiero-did-sdk/verifier-internal

Provides the functionality for verifying signatures on DID messages.

@hiero-did-sdk/signer-hashicorp-vault

Provides the functionality for secure key generation and signing operations using HashiCorp Vault.

@hiero-did-sdk/verifier-hashicorp-vault

Provides the functionality for verifying signatures using HashiCorp Vault.

@hiero-did-sdk/hcs

Provides a comprehensive interface for interacting with Hedera Consensus Service (HCS) within the Hiero DID SDK JS.

@hiero-did-sdk/anoncreds

Provides implementation of Hedera AnonCreds Registry, following Hedera AnonCreds Method specification.

Advanced Packages
These packages offer more specialized functionalities for advanced use cases.

Package Name    Description
@hiero-did-sdk/core

Provides essential interfaces, utilities, and validation tools for working with DIDs.

@hiero-did-sdk/messages

Provides a set of classes for constructing and handling DID messages.

@hiero-did-sdk/lifecycle

Enables management of complex asynchronous operations within DID-related applications.

@hiero-did-sdk/cache

Provides caching utilities for the Hiero DID SDK JS.

@hiero-did-sdk/client

Provides a flexible and configurable approach to managing Hedera SDK Clients with different network configurations.

@hiero-did-sdk/crypto

Provides cryptographic utilities for the Hiero DID SDK JS.

@hiero-did-sdk/zstd

Provides Zstandard (Zstd) compression utilities for the Hiero DID SDK JS.
