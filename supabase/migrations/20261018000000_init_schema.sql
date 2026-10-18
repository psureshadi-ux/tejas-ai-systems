-- ==============================================================================
-- TEJAS AI SYSTEMS - ENTERPRISE MULTI-TENANT DATABASE SCHEMA
-- Migration: 20261018000000_init_schema.sql
-- ==============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table (Aligned with Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    is_platform_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Organizations Table (Tenants)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    industry VARCHAR(50) NOT NULL, -- 'healthcare', 'realestate', 'general'
    city VARCHAR(100) DEFAULT 'Tirupati',
    address TEXT,
    contact_phone VARCHAR(32),
    contact_email VARCHAR(255),
    status VARCHAR(32) DEFAULT 'active', -- 'active', 'suspended', 'trial'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Memberships (RBAC)
CREATE TABLE IF NOT EXISTS organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(32) NOT NULL DEFAULT 'org_staff', -- 'org_owner', 'org_manager', 'org_staff', 'read_only'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 4. Agent Templates
CREATE TABLE IF NOT EXISTS agent_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    industry VARCHAR(64) NOT NULL,
    description TEXT,
    default_prompt TEXT NOT NULL,
    default_tools JSONB DEFAULT '[]'::jsonb,
    version VARCHAR(32) DEFAULT '1.0.0',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Agents
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    template_id UUID REFERENCES agent_templates(id),
    name VARCHAR(128) NOT NULL,
    purpose VARCHAR(255),
    status VARCHAR(32) DEFAULT 'DRAFT', -- 'DRAFT', 'TESTING', 'AWAITING_APPROVAL', 'ACTIVE', 'PAUSED', 'FAILED'
    active_version_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Agent Versions
CREATE TABLE IF NOT EXISTS agent_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    system_instructions TEXT NOT NULL,
    permitted_tools JSONB NOT NULL DEFAULT '[]'::jsonb,
    operating_hours JSONB,
    qualification_fields JSONB,
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Knowledge Documents & Sources
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    source_type VARCHAR(32) NOT NULL, -- 'text', 'faq', 'pdf', 'website'
    file_url TEXT,
    status VARCHAR(32) DEFAULT 'pending', -- 'pending', 'processing', 'indexed', 'failed'
    token_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Knowledge Chunks
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Conversations
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    channel VARCHAR(32) DEFAULT 'web', -- 'web', 'whatsapp', 'voice', 'api'
    external_user_id VARCHAR(128),
    status VARCHAR(32) DEFAULT 'active', -- 'active', 'escalated', 'closed'
    outcome VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_role VARCHAR(32) NOT NULL, -- 'user', 'assistant', 'system', 'human_agent'
    content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Leads & CRM Records
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255),
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255),
    city VARCHAR(100) DEFAULT 'Tirupati',
    area VARCHAR(100),
    industry VARCHAR(64),
    lead_source VARCHAR(64) DEFAULT 'website_demo',
    stage VARCHAR(32) DEFAULT 'NEW', -- 'NEW', 'CONTACTED', 'QUALIFIED', 'DEMO_BOOKED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST'
    budget VARCHAR(64),
    assigned_owner_id UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Appointments & Site Visits
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    appointment_type VARCHAR(64) NOT NULL, -- 'clinic_opd', 'real_estate_site_visit', 'agency_demo'
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    scheduled_time TIMESTAMPTZ NOT NULL,
    status VARCHAR(32) DEFAULT 'scheduled', -- 'scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'
    calendar_event_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Plans & Subscriptions
CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL,
    tier_code VARCHAR(32) UNIQUE NOT NULL, -- 'starter', 'growth', 'premium'
    setup_fee_inr NUMERIC(10, 2) NOT NULL,
    monthly_fee_inr NUMERIC(10, 2) NOT NULL,
    token_allowance INTEGER NOT NULL,
    message_allowance INTEGER NOT NULL,
    max_agents INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    razorpay_subscription_id VARCHAR(128) UNIQUE,
    status VARCHAR(32) DEFAULT 'active', -- 'active', 'past_due', 'cancelled', 'trial'
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    razorpay_payment_id VARCHAR(128) UNIQUE NOT NULL,
    razorpay_order_id VARCHAR(128) NOT NULL,
    amount_inr NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(32) NOT NULL, -- 'captured', 'failed', 'refunded'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Usage Metering
CREATE TABLE IF NOT EXISTS usage_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL, -- 'token_usage', 'whatsapp_message', 'voice_minute'
    quantity INTEGER NOT NULL,
    estimated_cost_inr NUMERIC(10, 4) DEFAULT 0.0000,
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(16) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(32) DEFAULT 'open', -- 'open', 'in_progress', 'resolved', 'closed'
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. System Exceptions Queue (Admin Central Exception Queue)
CREATE TABLE IF NOT EXISTS system_exceptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    source VARCHAR(64) NOT NULL,
    severity VARCHAR(16) DEFAULT 'medium', -- 'info', 'warning', 'error', 'critical'
    error_message TEXT NOT NULL,
    payload JSONB,
    status VARCHAR(32) DEFAULT 'unresolved', -- 'unresolved', 'investigating', 'resolved', 'ignored'
    retry_count INTEGER DEFAULT 0,
    resolved_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    actor_user_id UUID REFERENCES users(id),
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id UUID NOT NULL,
    changes JSONB,
    ip_address VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for High Performance
CREATE INDEX IF NOT EXISTS idx_org_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_leads_org ON leads(organization_id);
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_conversations_org ON conversations(organization_id);
CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_usage_org_time ON usage_events(organization_id, created_at);
CREATE INDEX IF NOT EXISTS idx_exceptions_status ON system_exceptions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
