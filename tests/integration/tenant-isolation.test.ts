import { describe, it, expect } from "vitest";
import {
  getAppointments,
  createAppointment,
  getLeads,
  createLead,
  getOrganizationBySlug,
  getOrganizations,
} from "@/lib/db/queries";

describe("Tenant Isolation & Multi-Tenant Data Boundaries", () => {
  const tenantA = "11111111-1111-1111-1111-111111111111";
  const tenantB = "22222222-2222-2222-2222-222222222222";

  it("isolates appointment queries strictly by organization ID", async () => {
    // Create appointment for Tenant A
    const aptA = await createAppointment({
      organization_id: tenantA,
      customer_name: "Tenant A Patient",
      customer_phone: "+91 94444 11111",
      appointment_type: "clinic_opd",
      scheduled_time: new Date(Date.now() + 86400000).toISOString(),
      status: "confirmed",
    });

    // Create appointment for Tenant B
    const aptB = await createAppointment({
      organization_id: tenantB,
      customer_name: "Tenant B Patient",
      customer_phone: "+91 94444 22222",
      appointment_type: "clinic_opd",
      scheduled_time: new Date(Date.now() + 86400000).toISOString(),
      status: "confirmed",
    });

    const tenantAAppointments = await getAppointments(tenantA);
    const tenantBAppointments = await getAppointments(tenantB);

    // Verify tenant A's query contains only tenant A's data
    expect(tenantAAppointments.some((a) => a.id === aptA.id)).toBe(true);
    expect(tenantAAppointments.some((a) => a.id === aptB.id)).toBe(false);

    // Verify tenant B's query contains only tenant B's data
    expect(tenantBAppointments.some((a) => a.id === aptB.id)).toBe(true);
    expect(tenantBAppointments.some((a) => a.id === aptA.id)).toBe(false);
  });

  it("isolates lead queries strictly by organization ID", async () => {
    const leadA = await createLead({
      organization_id: tenantA,
      name: "Tenant A Lead",
      phone: "+91 93333 11111",
      city: "Tirupati",
      lead_source: "website_demo",
      industry: "healthcare",
      stage: "NEW",
    });

    const leadB = await createLead({
      organization_id: tenantB,
      name: "Tenant B Lead",
      phone: "+91 93333 22222",
      city: "Tirupati",
      lead_source: "website_demo",
      industry: "healthcare",
      stage: "NEW",
    });

    const tenantALeads = await getLeads({ organizationId: tenantA });
    const tenantBLeads = await getLeads({ organizationId: tenantB });

    expect(tenantALeads.some((l) => l.id === leadA.id)).toBe(true);
    expect(tenantALeads.some((l) => l.id === leadB.id)).toBe(false);

    expect(tenantBLeads.some((l) => l.id === leadB.id)).toBe(true);
    expect(tenantBLeads.some((l) => l.id === leadA.id)).toBe(false);
  });

  it("retrieves tenant organization by slug correctly", async () => {
    const orgs = await getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const firstSlug = orgs[0].slug;
    const org = await getOrganizationBySlug(firstSlug);
    expect(org).not.toBeNull();
    expect(org?.slug).toBe(firstSlug);

    const nonExistent = await getOrganizationBySlug("non-existent-organization-slug-xyz");
    expect(nonExistent).toBeNull();
  });
});
