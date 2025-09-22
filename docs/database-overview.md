# UBeU Database Overview

## Overview

UBeU uses a PostgreSQL database with Redis caching for optimal performance and reliability. The database is designed for high availability and supports enterprise-scale operations.

## Core Tables

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    primary_did VARCHAR(255) NOT NULL,
    hcs_topic_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP DEFAULT NOW()
);
```

### DID Documents Table
```sql
CREATE TABLE did_documents (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    did_identifier VARCHAR(255) UNIQUE NOT NULL,
    did_type VARCHAR(50) DEFAULT 'personal',
    document_hash VARCHAR(64),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Domains Table
```sql
CREATE TABLE domains (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    domain_type VARCHAR(50),
    blockchain_network VARCHAR(50),
    status VARCHAR(50) DEFAULT 'active',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Credentials Table
```sql
CREATE TABLE credentials (
    id UUID PRIMARY KEY,
    subject_did VARCHAR(255),
    issuer_did VARCHAR(255),
    credential_type VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    issued_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Enterprise Tables

### Enterprise Accounts
```sql
CREATE TABLE enterprise_accounts (
    id UUID PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    parent_domain VARCHAR(255) UNIQUE NOT NULL,
    enterprise_tier VARCHAR(50) DEFAULT 'pro',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
```

### API Keys
```sql
CREATE TABLE enterprise_api_keys (
    id UUID PRIMARY KEY,
    enterprise_id UUID REFERENCES enterprise_accounts(id),
    name VARCHAR(255) NOT NULL,
    permissions JSONB,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Performance Features

- **Indexes**: Optimized for common query patterns
- **Partitioning**: Large tables partitioned by date for performance
- **Caching**: Redis integration for frequently accessed data
- **Replication**: Streaming replication for high availability

## Security

- **Encryption**: AES-256-GCM encryption at rest
- **Access Control**: Row-level security policies
- **Audit Logging**: Comprehensive transaction logging
- **Backup**: Automated daily backups with point-in-time recovery

## Scalability

- **Connection Pooling**: Efficient connection management
- **Read Replicas**: Distributed read operations
- **Sharding**: Future support for horizontal scaling
- **Monitoring**: Real-time performance metrics

---

*Note: Detailed schema documentation is available to verified enterprise partners under NDA. Contact sales@ubeu.io for access.*