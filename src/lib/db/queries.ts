import { Lead, Organization, Appointment, SystemException, FinancialMetrics, LeadStage } from "@/types";
import { initialLeads, initialOrganizations } from "./seed-data";
import { isSupabaseConfigured, supabaseAdmin } from "./client";

// In-memory persistent transactional store for development/offline mode
let memoryLeads: Lead[] = [...initialLeads];
let memoryOrganizations: Organization[] = [...initialOrganizations];
let memoryAppointments: Appointment[] = [
  {
    id: "apt-001",
    organization_id: "11111111-1111-1111-1111-111111111111",
    customer_name: "S. Venkat Reddy",
    customer_phone: "+91 94401 23456",
    appointment_type: "clinic_opd",
    scheduled_time: new Date(Date.now() + 86400000).toISOString(),
    status: "confirmed",
    notes: "Evening slot consultation for dental implants.",
    created_at: new Date().toISOString(),
  },
  {
    id: "apt-002",
    organization_id: "33333333-3333-3333-3333-333333333333",
    customer_name: "K. Prasad Rao",
    customer_phone: "+91 98490 87654",
    appointment_type: "real_estate_site_visit",
    scheduled_time: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: "scheduled",
    notes: "Site visit for 3BHK East Facing Villa with complimentary vehicle pickup.",
    created_at: new Date().toISOString(),
  },
];

let memoryExceptions: SystemException[] = [
  {
    id: "exc-001",
    source: "whatsapp_webhook",
    severity: "info",
    error_message: "WhatsApp Business API webhook delivered an opt-in message for +91 98480 XXXXX.",
    status: "resolved",
    retry_count: 0,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

// --- LEADS CRM QUERIES ---

export async function createLead(data: Omit<Lead, "id" | "created_at" | "updated_at">): Promise<Lead> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .insert([data])
      .select()
      .single();
    if (error) throw new Error(`Supabase error creating lead: ${error.message}`);
    return lead as Lead;
  }

  // Deduplication check: check if phone already exists
  const existing = memoryLeads.find((l) => l.phone.replace(/\D/g, "") === data.phone.replace(/\D/g, ""));
  if (existing) {
    existing.stage = data.stage || existing.stage;
    existing.notes = (existing.notes ? existing.notes + " | " : "") + (data.notes || "Updated via inquiry");
    existing.updated_at = new Date().toISOString();
    return existing;
  }

  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  memoryLeads.unshift(newLead);
  return newLead;
}

export async function getLeads(filters?: {
  stage?: LeadStage | 'all';
  industry?: string | 'all';
  search?: string;
  organizationId?: string;
}): Promise<Lead[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    let query = supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false });
    if (filters?.stage && filters.stage !== "all") query = query.eq("stage", filters.stage);
    if (filters?.industry && filters.industry !== "all") query = query.eq("industry", filters.industry);
    if (filters?.organizationId) query = query.eq("organization_id", filters.organizationId);
    if (filters?.search) query = query.ilike("name", `%${filters.search}%`);
    const { data, error } = await query;
    if (error) throw new Error(`Supabase query error: ${error.message}`);
    return (data || []) as Lead[];
  }

  let result = [...memoryLeads];
  if (filters?.stage && filters.stage !== "all") {
    result = result.filter((l) => l.stage === filters.stage);
  }
  if (filters?.industry && filters.industry !== "all") {
    result = result.filter((l) => l.industry === filters.industry);
  }
  if (filters?.organizationId) {
    result = result.filter((l) => l.organization_id === filters.organizationId);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(
      (l) =>
        l.name.toLowerCase().includes(s) ||
        (l.business_name && l.business_name.toLowerCase().includes(s)) ||
        (l.area && l.area.toLowerCase().includes(s))
    );
  }
  return result;
}

export async function updateLeadStage(id: string, stage: LeadStage, notes?: string): Promise<Lead | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const updatePayload: Record<string, unknown> = { stage, updated_at: new Date().toISOString() };
    if (notes) updatePayload.notes = notes;
    const { data, error } = await supabaseAdmin.from("leads").update(updatePayload).eq("id", id).select().single();
    if (error) throw new Error(`Error updating lead: ${error.message}`);
    return data as Lead;
  }

  const lead = memoryLeads.find((l) => l.id === id);
  if (!lead) return null;
  lead.stage = stage;
  if (notes) lead.notes = (lead.notes ? lead.notes + " | " : "") + notes;
  lead.updated_at = new Date().toISOString();
  return lead;
}

// --- APPOINTMENTS QUERIES ---

export async function createAppointment(data: Omit<Appointment, "id" | "created_at">): Promise<Appointment> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: apt, error } = await supabaseAdmin.from("appointments").insert([data]).select().single();
    if (error) throw new Error(`Error creating appointment: ${error.message}`);
    return apt as Appointment;
  }

  const newApt: Appointment = {
    ...data,
    id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  memoryAppointments.unshift(newApt);
  return newApt;
}

export async function getAppointments(organizationId?: string): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    let q = supabaseAdmin.from("appointments").select("*").order("scheduled_time", { ascending: true });
    if (organizationId) q = q.eq("organization_id", organizationId);
    const { data, error } = await q;
    if (error) throw new Error(`Error fetching appointments: ${error.message}`);
    return (data || []) as Appointment[];
  }

  if (organizationId) {
    return memoryAppointments.filter((a) => a.organization_id === organizationId);
  }
  return memoryAppointments;
}

// --- ORGANIZATIONS & TENANTS ---

export async function getOrganizations(): Promise<Organization[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from("organizations").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(`Error fetching organizations: ${error.message}`);
    return (data || []) as Organization[];
  }
  return memoryOrganizations;
}

export async function getOrganizationBySlug(slug: string): Promise<Organization | null> {
  const orgs = await getOrganizations();
  return orgs.find((o) => o.slug === slug) || null;
}

// --- FINANCIAL METRICS (REAL-TIME COMPUTATION) ---

export async function getFinancialMetrics(): Promise<FinancialMetrics> {
  const leads = await getLeads();
  const wonLeads = leads.filter((l) => l.stage === "WON");
  
  // Real calculation: Setup revenue = won deals * setup fee; MRR = won deals on active retainers * ₹4,999/₹6,999
  const mrr = wonLeads.reduce((acc, l) => acc + (l.industry === "realestate" ? 6999 : 4999), 0);
  const setupCash = wonLeads.reduce((acc, l) => acc + (l.industry === "realestate" ? 29999 : 19999), 0);
  
  // Estimated direct LLM & WhatsApp costs (~8% of revenue in production)
  const directCosts = Math.round(mrr * 0.08);
  const grossMargin = mrr > 0 ? Math.round(((mrr - directCosts) / mrr) * 100) : 92;

  const pendingProposals = leads.filter((l) => l.stage === "PROPOSAL_SENT" || l.stage === "NEGOTIATION").length;

  return {
    mrr_inr: mrr,
    cash_collected_inr: setupCash + mrr,
    active_clients: wonLeads.length,
    active_agents: wonLeads.length,
    direct_provider_costs_inr: directCosts,
    estimated_gross_margin_pct: grossMargin,
    pending_proposals: pendingProposals,
  };
}

// --- EXCEPTION QUEUE ---

export async function getSystemExceptions(): Promise<SystemException[]> {
  return memoryExceptions;
}

export async function recordSystemException(exc: Omit<SystemException, "id" | "created_at">): Promise<SystemException> {
  const newExc: SystemException = {
    ...exc,
    id: `exc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  memoryExceptions.unshift(newExc);
  return newExc;
}

export async function resolveSystemException(id: string): Promise<boolean> {
  const item = memoryExceptions.find((e) => e.id === id);
  if (item) {
    item.status = "resolved";
    return true;
  }
  return false;
}
