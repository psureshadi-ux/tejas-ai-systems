/**
 * Tejas AI Systems - Master TypeScript Interfaces & Contracts
 */

export type IndustryType = 'healthcare' | 'realestate' | 'general';

export type RoleType = 
  | 'platform_owner' 
  | 'internal_admin' 
  | 'ops_director' 
  | 'tech_director' 
  | 'org_owner' 
  | 'org_manager' 
  | 'org_staff' 
  | 'read_only';

export type AgentLifecycleStatus = 
  | 'DRAFT' 
  | 'TESTING' 
  | 'AWAITING_APPROVAL' 
  | 'ACTIVE' 
  | 'PAUSED' 
  | 'FAILED';

export type LeadStage = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'DEMO_BOOKED' 
  | 'PROPOSAL_SENT' 
  | 'NEGOTIATION' 
  | 'WON' 
  | 'LOST';

export type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: IndustryType;
  city: string;
  address?: string;
  contact_phone?: string;
  contact_email?: string;
  status: 'active' | 'suspended' | 'trial';
  created_at: string;
}

export interface Lead {
  id: string;
  organization_id?: string;
  name: string;
  business_name?: string;
  phone: string;
  email?: string;
  city: string;
  area?: string;
  industry: IndustryType;
  lead_source: string;
  stage: LeadStage;
  budget?: string;
  notes?: string;
  prototype_slug?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  organization_id: string;
  lead_id?: string;
  appointment_type: 'clinic_opd' | 'real_estate_site_visit' | 'agency_demo';
  customer_name: string;
  customer_phone: string;
  scheduled_time: string;
  status: AppointmentStatus;
  calendar_event_id?: string;
  notes?: string;
  created_at: string;
}

export interface Agent {
  id: string;
  organization_id: string;
  template_id?: string;
  name: string;
  purpose: string;
  status: AgentLifecycleStatus;
  active_version: number;
  system_instructions: string;
  operating_hours: string;
  created_at: string;
}

export interface SystemException {
  id: string;
  organization_id?: string;
  source: 'whatsapp_webhook' | 'payment_webhook' | 'llm_runtime' | 'calendar_sync';
  severity: 'info' | 'warning' | 'error' | 'critical';
  error_message: string;
  payload?: Record<string, unknown>;
  status: 'unresolved' | 'investigating' | 'resolved' | 'ignored';
  retry_count: number;
  created_at: string;
}

export interface FinancialMetrics {
  mrr_inr: number;
  cash_collected_inr: number;
  active_clients: number;
  active_agents: number;
  direct_provider_costs_inr: number;
  estimated_gross_margin_pct: number;
  pending_proposals: number;
}
