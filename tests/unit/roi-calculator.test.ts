import { describe, it, expect } from "vitest";
import { calculateRevenueLeakage } from "@/lib/crm/math";

describe("ROI and Revenue Leakage Engine", () => {
  it("calculates realistic after-hours revenue loss for a Tirupati clinic", () => {
    const result = calculateRevenueLeakage({
      monthlyInquiries: 200,
      averageValueInr: 800,
      industry: "healthcare",
    });

    expect(result.monthlyInquiries).toBe(200);
    expect(result.afterHoursInquiries).toBe(130); // 65% after 7 PM
    expect(result.agencyRetainerInr).toBe(4999);
    expect(result.missedConversionsPerMonth).toBeGreaterThanOrEqual(1);
    expect(result.monthlyRevenueLeakedInr).toBeGreaterThan(0);
    expect(result.annualRevenueLeakedInr).toBe(result.monthlyRevenueLeakedInr * 12);
    expect(result.projectedRecoveredRevenueInr).toBe(Math.round(result.monthlyRevenueLeakedInr * 0.6));
    expect(result.netRoiMultiple).toBeGreaterThanOrEqual(1);
  });

  it("calculates high-ticket real estate site visit recovery correctly", () => {
    const result = calculateRevenueLeakage({
      monthlyInquiries: 80,
      averageValueInr: 45000,
      industry: "realestate",
    });

    expect(result.agencyRetainerInr).toBe(6999);
    expect(result.afterHoursInquiries).toBe(52);
    expect(result.projectedRecoveredRevenueInr).toBeGreaterThan(result.agencyRetainerInr);
    expect(result.netRoiMultiple).toBeGreaterThan(1);
  });

  it("handles low volume inquiries gracefully without division by zero", () => {
    const result = calculateRevenueLeakage({
      monthlyInquiries: 5,
      averageValueInr: 500,
      industry: "general",
    });

    expect(result.missedConversionsPerMonth).toBeGreaterThanOrEqual(1);
    expect(result.netRoiMultiple).toBeGreaterThanOrEqual(1);
  });
});
