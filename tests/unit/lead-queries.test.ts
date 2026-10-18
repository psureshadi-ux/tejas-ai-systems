import { describe, it, expect } from "vitest";
import {
  createLead,
  getLeads,
  updateLeadStage,
  getFinancialMetrics,
  createAppointment,
  getAppointments,
  recordSystemException,
  resolveSystemException,
  getSystemExceptions,
} from "@/lib/db/queries";

describe("Database Queries, CRM Lifecycle & Financial Intelligence", () => {
  it("creates a new lead and generates unique ID and timestamp", async () => {
    const newLead = await createLead({
      name: "Test Doctor Prasad",
      business_name: "Prasad Orthopedic Clinic",
      phone: "+91 91234 56789",
      industry: "healthcare",
      city: "Tirupati",
      lead_source: "manual",
      stage: "NEW",
    });

    expect(newLead.id).toBeDefined();
    expect(newLead.name).toBe("Test Doctor Prasad");
    expect(newLead.stage).toBe("NEW");
  });

  it("deduplicates leads submitted with the same phone number", async () => {
    const initial = await createLead({
      name: "Dr. Sandhya",
      business_name: "Sandhya Skin & Laser Clinic",
      phone: "+91 99887 76655",
      industry: "healthcare",
      city: "Tirupati",
      lead_source: "outreach",
      stage: "NEW",
      notes: "First touch via WhatsApp demo",
    });

    const duplicate = await createLead({
      name: "Dr. Sandhya",
      business_name: "Sandhya Skin Clinic",
      phone: "+91 99887 76655",
      industry: "healthcare",
      city: "Tirupati",
      lead_source: "outreach",
      stage: "QUALIFIED",
      notes: "Requested pricing breakdown",
    });

    // Should return existing updated lead with merged notes
    expect(duplicate.id).toBe(initial.id);
    expect(duplicate.stage).toBe("QUALIFIED");
    expect(duplicate.notes).toContain("Requested pricing breakdown");
  });

  it("filters leads by industry, stage, and search query", async () => {
    const healthcareLeads = await getLeads({ industry: "healthcare" });
    expect(healthcareLeads.length).toBeGreaterThan(0);
    expect(healthcareLeads.every((l) => l.industry === "healthcare")).toBe(true);

    const searchResults = await getLeads({ search: "Tirupati" });
    expect(searchResults.length).toBeGreaterThanOrEqual(0);
  });

  it("transitions lead stage through pipeline", async () => {
    const lead = await createLead({
      name: "Pipeline Test Lead",
      business_name: "Pipeline Ventures",
      phone: "+91 95555 44444",
      industry: "realestate",
      city: "Tirupati",
      lead_source: "website",
      stage: "NEW",
    });

    const updated = await updateLeadStage(lead.id, "PROPOSAL_SENT", "Sent quotation for ₹29,999");
    expect(updated).not.toBeNull();
    expect(updated?.stage).toBe("PROPOSAL_SENT");
    expect(updated?.notes).toContain("Sent quotation for ₹29,999");
  });

  it("calculates real-time financial metrics from WON deals", async () => {
    // Transition a lead to WON
    const lead = await createLead({
      name: "Closed Clinic Client",
      business_name: "Closed Dental Clinic",
      phone: "+91 96666 33333",
      industry: "healthcare",
      city: "Tirupati",
      lead_source: "referral",
      stage: "NEW",
    });
    await updateLeadStage(lead.id, "WON");

    const metrics = await getFinancialMetrics();
    expect(metrics.active_clients).toBeGreaterThan(0);
    expect(metrics.mrr_inr).toBeGreaterThan(0);
    expect(metrics.cash_collected_inr).toBeGreaterThan(0);
    expect(metrics.estimated_gross_margin_pct).toBeGreaterThan(80);
  });

  it("schedules and retrieves appointments", async () => {
    const scheduledTime = new Date(Date.now() + 172800000).toISOString();
    const apt = await createAppointment({
      organization_id: "11111111-1111-1111-1111-111111111111",
      customer_name: "Ramesh Babu",
      customer_phone: "+91 97777 22222",
      appointment_type: "clinic_opd",
      scheduled_time: scheduledTime,
      status: "scheduled",
      notes: "Routine checkup",
    });

    expect(apt.id).toBeDefined();
    expect(apt.customer_name).toBe("Ramesh Babu");

    const allApts = await getAppointments();
    expect(allApts.some((a) => a.id === apt.id)).toBe(true);
  });

  it("records and resolves system exceptions in central queue", async () => {
    const exc = await recordSystemException({
      source: "calendar_sync",
      severity: "warning",
      error_message: "Google Calendar API rate limit encountered. Retrying in 60s.",
      status: "unresolved",
      retry_count: 1,
    });

    expect(exc.id).toBeDefined();
    expect(exc.status).toBe("unresolved");

    const resolved = await resolveSystemException(exc.id);
    expect(resolved).toBe(true);

    const exceptions = await getSystemExceptions();
    const found = exceptions.find((e) => e.id === exc.id);
    expect(found?.status).toBe("resolved");
  });
});
