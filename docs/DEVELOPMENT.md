# UBeU Development Setup Guide

## Overview

This guide covers setting up a local development environment for UBeU, including prerequisites, installation, configuration, and development workflows.

## Prerequisites

### System Requirements

- **Operating System**: macOS 12+, Ubuntu 20.04+, or Windows 10+ with WSL2
- **CPU**: 4+ cores recommended
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 20GB free space
- **Network**: Stable internet connection

### Required Software

#### Core Dependencies
```bash
# Node.js 18+ (with npm)
node --version  # Should show v18.x.x or higher
npm --version   # Should show 8.x.x or higher

# Git
git --version   # Should show 2.30+ or higher

# Docker & Docker Compose
docker --version        # Should show 20.10+ or higher
docker-compose --version # Should show 2.0+ or higher
```

#### Database
```bash
# PostgreSQL 15+
psql --version  # Should show 15.x.x or higher

# Redis 7+
redis-cli --version  # Should show 7.x.x or higher
```

#### Development Tools
```bash
# Visual Studio Code (recommended)
code --version

# GitHub CLI (optional)
gh --version
```

## Installation

### 1. Clone the Repository

```bash
# Clone the monorepo
git clone https://github.com/ubeu/ubeu-iaas.git
cd ubeu-iaas

# Initialize submodules if any
git submodule update --init --recursive
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all package dependencies
npm run bootstrap

# Verify installation
npm run health-check
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```bash
# Application
NODE_ENV=development
PORT=3000
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://ubeu:password@localhost:5432/ubeu_dev
REDIS_URL=redis://localhost:6379

# Hedera (Testnet for development)
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=0.0.xxxxx
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...

# Security
JWT_SECRET=your-development-jwt-secret-here
ENCRYPTION_KEY=your-development-encryption-key-here

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Database Setup

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Wait for databases to be ready
sleep 10

# Create database
createdb ubeu_dev

# Run migrations
npm run db:migrate

# Seed development data (optional)
npm run db:seed
```

### 5. Hedera Account Setup

```bash
# Create Hedera testnet account
# Visit: https://portal.hedera.com/
# 1. Create testnet account
# 2. Get account ID and private key
# 3. Add HBAR to account from faucet
# 4. Update .env with credentials
```

## Development Workflow

### Starting the Development Environment

```bash
# Start all services
npm run dev

# Or start individual services
npm run dev:api      # API Gateway
npm run dev:identity # Identity Service
npm run dev:frontend # Frontend Application
```

### Available Scripts

```bash
# Development
npm run dev              # Start all services in development mode
npm run dev:watch        # Start with file watching
npm run dev:debug        # Start with debug mode

# Building
npm run build            # Build all packages
npm run build:api        # Build API only
npm run build:frontend   # Build frontend only

# Testing
npm run test             # Run all tests
npm run test:unit        # Run unit tests
npm run test:integration # Run integration tests
npm run test:e2e         # Run end-to-end tests
npm run test:coverage    # Generate coverage report

# Database
npm run db:migrate       # Run database migrations
npm run db:rollback      # Rollback last migration
npm run db:seed          # Seed database with test data
npm run db:reset         # Reset database (development only)

# Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript type checking

# Deployment
npm run docker:build     # Build Docker images
npm run docker:push      # Push Docker images
npm run deploy:staging   # Deploy to staging
npm run deploy:prod      # Deploy to production
```

## Project Structure

```
ubeu-iaas/
├── packages/
│   ├── api-gateway/           # Main API Gateway
│   │   ├── src/
│   │   │   ├── routes/        # API routes
│   │   │   ├── middleware/    # Express middleware
│   │   │   ├── services/      # Business logic
│   │   │   └── utils/         # Utility functions
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── identity-service/      # Identity management
│   ├── domain-verification-service/  # Domain verification
│   ├── credential-service/    # Credential management
│   ├── treasury-service/      # Billing & payments
│   ├── frontend/              # React application
│   └── sdk/                   # JavaScript SDK
├── docs/                      # Documentation
├── scripts/                   # Build and deployment scripts
├── docker/                    # Docker configurations
├── k8s/                       # Kubernetes manifests
├── .env.example               # Environment template
├── docker-compose.yml         # Local development
├── lerna.json                 # Monorepo configuration
├── package.json               # Root package configuration
└── tsconfig.json              # TypeScript configuration
```

## Development Guidelines

### Code Style

#### TypeScript/JavaScript
```javascript
// Use TypeScript for all new code
interface User {
  id: string;
  email: string;
  createdAt: Date;
}

// Use async/await for asynchronous operations
async function getUser(userId: string): Promise<User> {
  const user = await userRepository.findById(userId);
  return user;
}

// Use proper error handling
try {
  const result = await someOperation();
  return result;
} catch (error) {
  logger.error('Operation failed:', error);
  throw new CustomError('Operation failed', error);
}
```

#### Naming Conventions
```javascript
// Files and directories: kebab-case
// user-service.ts, api-gateway/

// Classes and types: PascalCase
class UserService {}
interface UserProfile {}

// Functions and variables: camelCase
function getUser() {}
const userId = '123';

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = '/api/v1';
```

### Testing

#### Unit Tests
```typescript
// user.service.test.ts
import { UserService } from '../user.service';
import { mockUserRepository } from '../../test/mocks';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const userId = '123';
      const expectedUser = { id: userId, email: 'test@example.com' };

      mockUserRepository.findById.mockResolvedValue(expectedUser);

      const result = await userService.getUser(userId);

      expect(result).toEqual(expectedUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw error when user not found', async () => {
      const userId = '123';

      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userService.getUser(userId)).rejects.toThrow('User not found');
    });
  });
});
```

#### Integration Tests
```typescript
// user.integration.test.ts
describe('User API Integration', () => {
  let app: FastifyInstance;
  let database: Database;

  beforeAll(async () => {
    app = await buildApp();
    database = await createTestDatabase();
  });

  afterAll(async () => {
    await database.cleanup();
    await app.close();
  });

  describe('POST /api/v1/users', () => {
    it('should create user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };

      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: userData
      });

      expect(response.statusCode).toBe(201);
      const createdUser = JSON.parse(response.payload);
      expect(createdUser.email).toBe(userData.email);
    });
  });
});
```

### Database Development

#### Migrations
```typescript
// 001-create-users-table.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1638360000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
```

#### Seeders
```typescript
// user.seeder.ts
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    // Create specific test users
    await factory(User)().create({
      email: 'admin@ubeu.io',
      role: 'admin'
    });

    // Create random users
    await factory(User)().createMany(10);
  }
}
```

## API Development

### Route Structure
```typescript
// routes/users.ts
import { FastifyInstance } from 'fastify';
import { UserService } from '../services/user.service';

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService();

  // GET /api/v1/users
  fastify.get('/', async (request, reply) => {
    const users = await userService.getAllUsers();
    reply.send({ success: true, data: users });
  });

  // GET /api/v1/users/:id
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await userService.getUser(id);

    if (!user) {
      return reply.code(404).send({
        success: false,
        error: 'User not found'
      });
    }

    reply.send({ success: true, data: user });
  });

  // POST /api/v1/users
  fastify.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const userData = request.body as any;
    const user = await userService.createUser(userData);

    reply.code(201).send({ success: true, data: user });
  });
}
```

### Middleware
```typescript
// middleware/auth.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyJWT } from '../utils/jwt';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.code(401).send({
        success: false,
        error: 'No token provided'
      });
    }

    const decoded = verifyJWT(token);
    request.user = decoded;
  } catch (error) {
    return reply.code(401).send({
      success: false,
      error: 'Invalid token'
    });
  }
}

// middleware/rate-limit.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'api',
  points: 100, // Number of requests
  duration: 60 // Per 60 seconds
});

export async function rateLimit(request: FastifyRequest, reply: FastifyReply) {
  try {
    await rateLimiter.consume(request.ip);
  } catch (rejRes) {
    return reply.code(429).send({
      success: false,
      error: 'Too many requests',
      retryAfter: Math.round(rejRes.msBeforeNext / 1000)
    });
  }
}
```

## Debugging

### VS Code Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug API Gateway",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/packages/api-gateway/src/index.ts",
      "preLaunchTask": "npm: build",
      "outFiles": ["${workspaceFolder}/packages/api-gateway/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "name": "Debug Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/packages/frontend/server.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

### Logging

```typescript
// logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

// Usage
logger.info('User created', { userId: '123', email: 'user@example.com' });
logger.error('Database connection failed', { error: error.message });
```

## Performance Monitoring

### Application Metrics

```typescript
// metrics.ts
import { collectDefaultMetrics, register, Gauge, Counter, Histogram } from 'prom-client';

// Enable default metrics
collectDefaultMetrics();

// Custom metrics
export const metrics = {
  // HTTP metrics
  httpRequestTotal: new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
  }),

  // Business metrics
  usersCreatedTotal: new Counter({
    name: 'users_created_total',
    help: 'Total number of users created'
  }),

  // Performance metrics
  requestDuration: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route']
  }),

  // System metrics
  activeConnections: new Gauge({
    name: 'active_connections',
    help: 'Number of active connections'
  })
};
```

### Health Checks

```typescript
// health.ts
import { FastifyInstance } from 'fastify';

export async function healthRoutes(fastify: FastifyInstance) {
  // Readiness probe
  fastify.get('/ready', async (request, reply) => {
    try {
      // Check database connectivity
      await fastify.db.authenticate();

      // Check Redis connectivity
      await fastify.redis.ping();

      // Check Hedera connectivity
      await fastify.hedera.client.ping();

      reply.send({ status: 'ready' });
    } catch (error) {
      reply.code(503).send({ status: 'not ready', error: error.message });
    }
  });

  // Liveness probe
  fastify.get('/health', async (request, reply) => {
    reply.send({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Detailed health check
  fastify.get('/health/detailed', async (request, reply) => {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: await checkDatabaseHealth(),
        redis: await checkRedisHealth(),
        hedera: await checkHederaHealth()
      },
      metrics: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      }
    };

    reply.send(health);
  });
}
```

## Contributing

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes with tests
4. **Run** the test suite: `npm test`
5. **Update** documentation if needed
6. **Commit** your changes: `git commit -m 'Add your feature'`
7. **Push** to your branch: `git push origin feature/your-feature`
8. **Create** a Pull Request

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

**Examples:**
```
feat(auth): add JWT authentication
fix(api): handle null user in getUser endpoint
docs(readme): update installation instructions
```

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Check database logs
tail -f /usr/local/var/log/postgresql.log

# Reset database
npm run db:reset
```

#### Port Conflicts
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

#### Node.js Memory Issues
```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Or add to package.json scripts
"dev": "NODE_OPTIONS='--max-old-space-size=4096' ts-node src/index.ts"
```

#### Docker Issues
```bash
# Clean up Docker
docker system prune -a

# Rebuild containers
docker-compose down
docker-compose up --build

# Check container logs
docker-compose logs -f
```

### Getting Help

- **Documentation**: [docs.ubeu.io](https://docs.ubeu.io)
- **Issues**: [GitHub Issues](https://github.com/ubeu/ubeu-iaas/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ubeu/ubeu-iaas/discussions)
- **Slack**: [UBeU Community](https://ubeu.slack.com)

## Advanced Development

### Custom Scripts

```javascript
// scripts/custom/build-dev.js
const { execSync } = require('child_process');
const fs = require('fs');

function buildDev() {
  console.log('🏗️ Building development environment...');

  // Clean previous builds
  execSync('npm run clean', { stdio: 'inherit' });

  // Build all packages
  execSync('npm run build', { stdio: 'inherit' });

  // Generate API documentation
  execSync('npm run docs:generate', { stdio: 'inherit' });

  // Run tests
  execSync('npm run test', { stdio: 'inherit' });

  console.log('✅ Development build complete!');
}

if (require.main === module) {
  buildDev();
}
```

### Environment-Specific Configuration

```typescript
// config/index.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.APP_NAME || 'UBeU',
    version: process.env.npm_package_version || '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000'),
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production',
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10')
  },

  redis: {
    url: process.env.REDIS_URL,
    ttl: parseInt(process.env.REDIS_TTL || '3600')
  },

  hedera: {
    network: process.env.HEDERA_NETWORK || 'testnet',
    accountId: process.env.HEDERA_ACCOUNT_ID,
    privateKey: process.env.HEDERA_PRIVATE_KEY,
    maxFee: parseInt(process.env.HEDERA_MAX_FEE || '100000000') // 1 HBAR
  },

  security: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    encryptionKey: process.env.ENCRYPTION_KEY,
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12')
  },

  email: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },

  // Environment-specific overrides
  ...(process.env.NODE_ENV === 'production' && {
    logging: {
      level: 'error',
      file: '/var/log/ubeu/app.log'
    }
  }),

  ...(process.env.NODE_ENV === 'development' && {
    logging: {
      level: 'debug',
      console: true
    },
    debug: true
  })
};
```

This comprehensive development setup guide ensures developers can quickly get started with UBeU and follow best practices throughout the development lifecycle.