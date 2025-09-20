-- UBeU Identity Platform - Complete PostgreSQL Database Schema
-- This schema includes all models for the comprehensive identity platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===========================================
-- CORE IDENTITY MODELS
-- ===========================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    wallet_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    primary_did VARCHAR(255) NOT NULL,
    hcs_topic_id VARCHAR(255) NOT NULL,
    hedera_account_id VARCHAR(255),
    ub_auth_token_id VARCHAR(255),
    domain_nft_id VARCHAR(255),
    recovery_methods JSONB,
    CONSTRAINT users_email_unique UNIQUE (email),
    CONSTRAINT users_wallet_unique UNIQUE (wallet_address)
);

-- DIDs table
CREATE TABLE dids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    did TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    context VARCHAR(50) DEFAULT 'personal' CHECK (context IN ('personal', 'professional', 'educational')),
    hcs_topic_id VARCHAR(255) NOT NULL,
    document_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT dids_did_unique UNIQUE (did)
);

-- Domains table
CREATE TABLE domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) DEFAULT 'iam' CHECK (type IN ('iam', 'eth', 'sol', 'btc')),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    did_id UUID NOT NULL REFERENCES dids(id),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT domains_name_unique UNIQUE (name)
);

-- Allowances table
CREATE TABLE allowances (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    annual_limit DECIMAL(10,2) DEFAULT 200.00, -- $2.00 in cents
    spent_this_year DECIMAL(10,2) DEFAULT 0.00,
    last_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    renewal_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Subscriptions table
CREATE TABLE subscriptions (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    plan VARCHAR(20) DEFAULT 'basic' CHECK (plan IN ('basic', 'premium')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE
);

-- Account mappings table
CREATE TABLE account_mappings (
    native_account_id VARCHAR(255) PRIMARY KEY, -- 0xABC... or wallet address
    hedera_account_id VARCHAR(255),
    did_ids TEXT[],
    domains TEXT[],
    all_aliases TEXT[],
    primary_alias VARCHAR(255),
    verification_data JSONB,
    domain_aliases JSONB,
    metadata JSONB,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallet linking table
CREATE TABLE wallet_linking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_wallet_address VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    linking_signature TEXT,
    link_type VARCHAR(30) DEFAULT 'additional_wallet' CHECK (link_type IN ('wallet_migration', 'domain_export', 'recovery_method', 'additional_wallet')),
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ENTERPRISE INTEGRATION MODELS
-- ===========================================

-- SAML Providers table
CREATE TABLE saml_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    entity_id VARCHAR(255) NOT NULL,
    sso_url TEXT NOT NULL,
    slo_url TEXT,
    certificate TEXT NOT NULL,
    private_key TEXT,
    config JSONB,
    active BOOLEAN DEFAULT TRUE,
    organization_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT saml_providers_entity_id_unique UNIQUE (entity_id)
);

-- OAuth Clients table
CREATE TABLE oauth_clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(255) NOT NULL,
    client_secret TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    redirect_uris TEXT[] NOT NULL,
    scopes TEXT[] NOT NULL,
    grant_types TEXT[],
    response_types TEXT[],
    active BOOLEAN DEFAULT TRUE,
    organization_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT oauth_clients_client_id_unique UNIQUE (client_id)
);

-- OAuth Tokens table
CREATE TABLE oauth_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id VARCHAR(255) NOT NULL,
    user_id UUID NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    scopes TEXT[] NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    refresh_expires_at TIMESTAMP WITH TIME ZONE,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SCIM Users table
CREATE TABLE scim_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id VARCHAR(255),
    user_name VARCHAR(255) NOT NULL,
    name JSONB NOT NULL,
    display_name VARCHAR(255),
    nick_name VARCHAR(255),
    profile_url TEXT,
    title VARCHAR(255),
    user_type VARCHAR(255),
    preferred_language VARCHAR(10),
    locale VARCHAR(20),
    timezone VARCHAR(50),
    active BOOLEAN DEFAULT TRUE,
    emails JSONB,
    phone_numbers JSONB,
    addresses JSONB,
    groups TEXT[],
    roles JSONB,
    entitlements JSONB,
    photos JSONB,
    meta JSONB NOT NULL,
    organization_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT scim_users_username_org_unique UNIQUE (user_name, organization_id)
);

-- SCIM Groups table
CREATE TABLE scim_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(255) NOT NULL,
    members JSONB,
    meta JSONB NOT NULL,
    organization_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT scim_groups_name_org_unique UNIQUE (display_name, organization_id)
);

-- Webhook Configs table
CREATE TABLE webhook_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    events TEXT[] NOT NULL,
    secret VARCHAR(255),
    headers JSONB,
    retry_policy JSONB NOT NULL,
    filters JSONB,
    active BOOLEAN DEFAULT TRUE,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhook Deliveries table
CREATE TABLE webhook_deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    webhook_id UUID NOT NULL REFERENCES webhook_configs(id) ON DELETE CASCADE,
    event_id VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'failed', 'retrying')),
    attempt_count INTEGER DEFAULT 0,
    max_retries INTEGER NOT NULL,
    next_retry_at TIMESTAMP WITH TIME ZONE,
    last_attempt_at TIMESTAMP WITH TIME ZONE,
    last_error TEXT,
    response_status INTEGER,
    response_body TEXT,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ANALYTICS MODELS
-- ===========================================

-- Analytics Metrics table
CREATE TABLE analytics_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    value DECIMAL(15,6) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    tags JSONB NOT NULL DEFAULT '{}',
    metadata JSONB,
    organization_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Reports table
CREATE TABLE analytics_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('user_activity', 'system_performance', 'security_events', 'business_metrics', 'custom')),
    timeframe JSONB NOT NULL,
    metrics JSONB NOT NULL,
    insights JSONB NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Dashboards table
CREATE TABLE analytics_dashboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    widgets JSONB NOT NULL,
    refresh_interval INTEGER DEFAULT 300,
    owner_id UUID NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- API MANAGEMENT MODELS
-- ===========================================

-- API Endpoints table
CREATE TABLE api_endpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path VARCHAR(500) NOT NULL,
    method VARCHAR(10) NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD')),
    service VARCHAR(100) NOT NULL,
    version VARCHAR(20) DEFAULT 'v1',
    description TEXT NOT NULL,
    parameters JSONB,
    responses JSONB,
    authentication JSONB NOT NULL,
    rate_limit JSONB NOT NULL,
    caching JSONB DEFAULT '{"enabled": false, "ttl": 300}',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT api_endpoints_unique UNIQUE (path, method, version)
);

-- API Keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    owner_id UUID NOT NULL,
    permissions JSONB NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    last_used_at TIMESTAMP WITH TIME ZONE,
    usage JSONB DEFAULT '{"requestsToday": 0, "requestsThisMonth": 0}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT api_keys_key_unique UNIQUE (key)
);

-- API Requests table
CREATE TABLE api_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    method VARCHAR(10) NOT NULL,
    path TEXT NOT NULL,
    headers JSONB NOT NULL,
    query JSONB NOT NULL,
    body JSONB,
    ip INET NOT NULL,
    user_agent TEXT NOT NULL,
    api_key VARCHAR(255),
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    response_time INTEGER,
    status_code INTEGER,
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- THIRD-PARTY INTEGRATION MODELS
-- ===========================================

-- Third-Party Services table
CREATE TABLE third_party_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('email', 'sms', 'push', 'social', 'payment', 'analytics', 'storage', 'custom')),
    provider VARCHAR(100) NOT NULL,
    config JSONB,
    credentials JSONB,
    rate_limits JSONB NOT NULL,
    retry_policy JSONB NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- MONITORING MODELS
-- ===========================================

-- Monitoring Alerts table
CREATE TABLE monitoring_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    condition JSONB NOT NULL,
    channels TEXT[] NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    last_triggered TIMESTAMP WITH TIME ZONE,
    trigger_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monitoring Logs table
CREATE TABLE monitoring_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    level VARCHAR(10) NOT NULL CHECK (level IN ('debug', 'info', 'warn', 'error', 'fatal')),
    service VARCHAR(100) NOT NULL,
    component VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    error JSONB,
    context JSONB NOT NULL DEFAULT '{}',
    user_id UUID,
    request_id VARCHAR(255),
    ip INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- ORGANIZATION/TENANT MODELS
-- ===========================================

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    description TEXT,
    settings JSONB,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
    subscription_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT organizations_domain_unique UNIQUE (domain)
);

-- ===========================================
-- PAYMENT & TREASURY MODELS
-- ===========================================

-- Payment Transactions table
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('fiat', 'crypto')),
    provider VARCHAR(50) NOT NULL,
    amount DECIMAL(15,6) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    usd_amount DECIMAL(15,6),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),
    provider_data JSONB,
    external_id VARCHAR(255),
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Network Spend table
CREATE TABLE network_spend (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tinybars DECIMAL(15,6) NOT NULL,
    usd_cents DECIMAL(10,2) NOT NULL,
    operation VARCHAR(100) NOT NULL,
    metadata JSONB,
    hcs_topic_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- SOCIAL VERIFICATION MODELS
-- ===========================================

-- Social Verifications table
CREATE TABLE social_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    platform_user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    verification_data JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'failed')),
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- CREDENTIAL MODELS
-- ===========================================

-- Credential Schemas table
CREATE TABLE credential_schemas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    schema JSONB NOT NULL,
    issuer_id UUID NOT NULL,
    metadata JSONB,
    active BOOLEAN DEFAULT TRUE,
    hcs_topic_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verifiable Credentials table
CREATE TABLE verifiable_credentials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL,
    issuer_id UUID NOT NULL,
    schema_id UUID NOT NULL REFERENCES credential_schemas(id),
    credential JSONB NOT NULL,
    proof JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
    expires_at TIMESTAMP WITH TIME ZONE,
    revoked_at TIMESTAMP WITH TIME ZONE,
    hcs_topic_id VARCHAR(255) NOT NULL,
    document_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

-- Core indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_dids_user_id ON dids(user_id);
CREATE INDEX idx_dids_did ON dids(did);
CREATE INDEX idx_domains_owner_id ON domains(owner_id);
CREATE INDEX idx_domains_name ON domains(name);
CREATE INDEX idx_domains_status ON domains(verification_status);

-- Enterprise indexes
CREATE INDEX idx_saml_providers_org ON saml_providers(organization_id);
CREATE INDEX idx_oauth_clients_org ON oauth_clients(organization_id);
CREATE INDEX idx_oauth_tokens_user ON oauth_tokens(user_id);
CREATE INDEX idx_oauth_tokens_client ON oauth_tokens(client_id);
CREATE INDEX idx_scim_users_org ON scim_users(organization_id);
CREATE INDEX idx_scim_groups_org ON scim_groups(organization_id);
CREATE INDEX idx_webhook_deliveries_webhook ON webhook_deliveries(webhook_id);
CREATE INDEX idx_webhook_deliveries_status ON webhook_deliveries(status);

-- Analytics indexes
CREATE INDEX idx_analytics_metrics_name ON analytics_metrics(name);
CREATE INDEX idx_analytics_metrics_timestamp ON analytics_metrics(timestamp);
CREATE INDEX idx_analytics_metrics_org ON analytics_metrics(organization_id);
CREATE INDEX idx_analytics_reports_owner ON analytics_reports(owner_id);
CREATE INDEX idx_analytics_dashboards_owner ON analytics_dashboards(owner_id);

-- API Management indexes
CREATE INDEX idx_api_endpoints_path_method ON api_endpoints(path, method);
CREATE INDEX idx_api_keys_owner ON api_keys(owner_id);
CREATE INDEX idx_api_requests_timestamp ON api_requests(timestamp);
CREATE INDEX idx_api_requests_api_key ON api_requests(api_key);
CREATE INDEX idx_api_requests_user ON api_requests(user_id);

-- Monitoring indexes
CREATE INDEX idx_monitoring_logs_timestamp ON monitoring_logs(timestamp);
CREATE INDEX idx_monitoring_logs_level ON monitoring_logs(level);
CREATE INDEX idx_monitoring_logs_service ON monitoring_logs(service);
CREATE INDEX idx_monitoring_alerts_active ON monitoring_alerts(active);

-- Payment indexes
CREATE INDEX idx_payment_transactions_user ON payment_transactions(user_id);
CREATE INDEX idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX idx_payment_transactions_created ON payment_transactions(created_at);
CREATE INDEX idx_network_spend_user ON network_spend(user_id);
CREATE INDEX idx_network_spend_created ON network_spend(created_at);

-- Credential indexes
CREATE INDEX idx_verifiable_credentials_subject ON verifiable_credentials(subject_id);
CREATE INDEX idx_verifiable_credentials_issuer ON verifiable_credentials(issuer_id);
CREATE INDEX idx_verifiable_credentials_schema ON verifiable_credentials(schema_id);
CREATE INDEX idx_verifiable_credentials_status ON verifiable_credentials(status);

-- ===========================================
-- VIEWS FOR COMMON QUERIES
-- ===========================================

-- User activity summary view
CREATE VIEW user_activity_summary AS
SELECT
    u.id,
    u.email,
    u.wallet_address,
    u.status,
    u.created_at,
    COUNT(d.id) as did_count,
    COUNT(dom.id) as domain_count,
    COUNT(vc.id) as credential_count,
    MAX(u.last_login_at) as last_activity
FROM users u
LEFT JOIN dids d ON u.id = d.user_id
LEFT JOIN domains dom ON u.id = dom.owner_id
LEFT JOIN verifiable_credentials vc ON u.id = vc.subject_id
GROUP BY u.id, u.email, u.wallet_address, u.status, u.created_at;

-- API usage summary view
CREATE VIEW api_usage_summary AS
SELECT
    DATE_TRUNC('day', timestamp) as date,
    COUNT(*) as total_requests,
    COUNT(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END) as successful_requests,
    COUNT(CASE WHEN status_code >= 400 THEN 1 END) as error_requests,
    AVG(response_time) as avg_response_time,
    COUNT(DISTINCT ip) as unique_ips,
    COUNT(DISTINCT user_id) as unique_users
FROM api_requests
WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', timestamp)
ORDER BY date DESC;

-- System health view
CREATE VIEW system_health AS
SELECT
    'api_performance' as metric,
    AVG(response_time) as value,
    'ms' as unit
FROM api_requests
WHERE timestamp >= NOW() - INTERVAL '1 hour'
UNION ALL
SELECT
    'error_rate' as metric,
    (COUNT(CASE WHEN status_code >= 400 THEN 1 END)::decimal / COUNT(*)) * 100 as value,
    '%' as unit
FROM api_requests
WHERE timestamp >= NOW() - INTERVAL '1 hour'
UNION ALL
SELECT
    'active_users' as metric,
    COUNT(DISTINCT user_id)::decimal as value,
    'count' as unit
FROM api_requests
WHERE timestamp >= NOW() - INTERVAL '1 hour';

-- ===========================================
-- FUNCTIONS AND TRIGGERS
-- ===========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dids_updated_at BEFORE UPDATE ON dids FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_domains_updated_at BEFORE UPDATE ON domains FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_analytics_reports_updated_at BEFORE UPDATE ON analytics_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_analytics_dashboards_updated_at BEFORE UPDATE ON analytics_dashboards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_endpoints_updated_at BEFORE UPDATE ON api_endpoints FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_third_party_services_updated_at BEFORE UPDATE ON third_party_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_monitoring_alerts_updated_at BEFORE UPDATE ON monitoring_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_verifications_updated_at BEFORE UPDATE ON social_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_credential_schemas_updated_at BEFORE UPDATE ON credential_schemas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_verifiable_credentials_updated_at BEFORE UPDATE ON verifiable_credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to reset API key usage daily
CREATE OR REPLACE FUNCTION reset_api_key_daily_usage()
RETURNS void AS $$
BEGIN
    UPDATE api_keys
    SET usage = jsonb_set(usage, '{requestsToday}', '0')
    WHERE usage->>'requestsToday' != '0';
END;
$$ language 'plpgsql';

-- Function to reset allowance annually
CREATE OR REPLACE FUNCTION reset_allowance_annually()
RETURNS void AS $$
BEGIN
    UPDATE allowances
    SET spent_this_year = 0,
        last_reset = NOW(),
        renewal_date = NOW() + INTERVAL '1 year'
    WHERE renewal_date <= NOW();
END;
$$ language 'plpgsql';

-- ===========================================
-- INITIAL DATA SEEDING
-- ===========================================

-- Insert default organization
INSERT INTO organizations (id, name, domain, description, settings) VALUES
(uuid_generate_v4(), 'UBeU Platform', 'ubeu.io', 'Main UBeU identity platform organization', '{"maxUsers": 10000, "features": ["saml", "oauth", "scim", "analytics"]}');

-- Insert default API endpoints
INSERT INTO api_endpoints (path, method, service, description, authentication, rate_limit) VALUES
('/', 'GET', 'identity-service', 'Health check endpoint', '{"required": false}', '{"requests": 100, "period": "minute"}'),
('/api/v1/users', 'GET', 'identity-service', 'Get user information', '{"required": true, "type": "bearer"}', '{"requests": 1000, "period": "hour"}'),
('/api/v1/domains', 'POST', 'domain-service', 'Register domain', '{"required": true, "type": "bearer"}', '{"requests": 100, "period": "hour"}'),
('/api/v1/credentials', 'POST', 'credential-service', 'Issue credential', '{"required": true, "type": "bearer"}', '{"requests": 500, "period": "hour"}');

-- Insert default monitoring alerts
INSERT INTO monitoring_alerts (name, description, severity, condition, channels) VALUES
('High Error Rate', 'API error rate exceeds 5%', 'high', '{"metric": "api.error_rate", "operator": "gt", "threshold": 5, "duration": 300}', ARRAY['email', 'slack']),
('High Response Time', 'API response time exceeds 2 seconds', 'medium', '{"metric": "api.response_time", "operator": "gt", "threshold": 2000, "duration": 300}', ARRAY['email']),
('Low System Health', 'System health score below 95%', 'critical', '{"metric": "system.health_score", "operator": "lt", "threshold": 95, "duration": 60}', ARRAY['email', 'slack', 'webhook']);

-- ===========================================
-- SECURITY POLICIES (RLS)
-- ===========================================

-- Enable Row Level Security on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dids ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifiable_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies (these would be customized based on your auth system)
-- Note: These are example policies - implement based on your authentication system

-- ===========================================
-- PARTITIONING (for high-volume tables)
-- ===========================================

-- Partition api_requests by month for better performance
-- (This would be implemented for production with high traffic)

-- ===========================================
-- BACKUP AND RECOVERY
-- ===========================================

-- Create backup function
CREATE OR REPLACE FUNCTION create_backup(table_name text)
RETURNS text AS $$
DECLARE
    backup_table_name text;
BEGIN
    backup_table_name := table_name || '_backup_' || to_char(NOW(), 'YYYY_MM_DD_HH24_MI_SS');
    EXECUTE 'CREATE TABLE ' || backup_table_name || ' AS SELECT * FROM ' || table_name;
    RETURN 'Backup created: ' || backup_table_name;
END;
$$ language 'plpgsql';

-- ===========================================
-- COMMENTS FOR DOCUMENTATION
-- ===========================================

COMMENT ON TABLE users IS 'Main user accounts with identity information';
COMMENT ON TABLE dids IS 'Decentralized Identifiers linked to users';
COMMENT ON TABLE domains IS 'Domain registrations and verification status';
COMMENT ON TABLE allowances IS 'Treasury allowances for network fees';
COMMENT ON TABLE subscriptions IS 'User subscription plans and billing';
COMMENT ON TABLE account_mappings IS 'Cross-chain account mappings';
COMMENT ON TABLE saml_providers IS 'SAML identity provider configurations';
COMMENT ON TABLE oauth_clients IS 'OAuth 2.0 client registrations';
COMMENT ON TABLE scim_users IS 'SCIM user provisioning data';
COMMENT ON TABLE webhook_configs IS 'Webhook endpoint configurations';
COMMENT ON TABLE analytics_metrics IS 'Time-series analytics data';
COMMENT ON TABLE api_endpoints IS 'API endpoint definitions and configurations';
COMMENT ON TABLE api_keys IS 'API key management and usage tracking';
COMMENT ON TABLE monitoring_alerts IS 'System monitoring alerts and notifications';
COMMENT ON TABLE payment_transactions IS 'Payment processing transactions';
COMMENT ON TABLE verifiable_credentials IS 'W3C Verifiable Credentials storage';

-- ===========================================
-- FINAL OPTIMIZATIONS
-- ===========================================

-- Analyze all tables for query optimization
ANALYZE;

-- Vacuum for maintenance
VACUUM;

-- Set autovacuum settings for better performance
ALTER TABLE api_requests SET (autovacuum_vacuum_scale_factor = 0.1);
ALTER TABLE monitoring_logs SET (autovacuum_vacuum_scale_factor = 0.1);
ALTER TABLE analytics_metrics SET (autovacuum_vacuum_scale_factor = 0.1);