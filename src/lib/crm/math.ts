/**
 * ROI & Revenue Leakage Mathematical Engine
 * Computes tangible financial impact of 24/7 AI lead capture for Tirupati businesses
 */

export interface RoiCalculationInput {
  monthlyInquiries: number;
  averageValueInr: number;
  industry: 'healthcare' | 'realestate' | 'general';
}

export interface RoiCalculationResult {
  monthlyInquiries: number;
  afterHoursInquiries: number;
  missedConversionsPerMonth: number;
  monthlyRevenueLeakedInr: number;
  annualRevenueLeakedInr: number;
  projectedRecoveredRevenueInr: number;
  agencyRetainerInr: number;
  netRoiMultiple: number;
}

export function calculateRevenueLeakage(input: RoiCalculationInput): RoiCalculationResult {
  const { monthlyInquiries, averageValueInr, industry } = input;

  // In tier-2 Indian markets, ~65% of website/social clicks occur between 7:00 PM and 9:00 AM
  const afterHoursRatio = 0.65;
  const afterHoursInquiries = Math.round(monthlyInquiries * afterHoursRatio);

  // Industry-specific baseline conversion benchmarks
  let baselineConversionRate = 0.12; // 12% for clinics
  let agencyRetainerInr = 4999;

  if (industry === 'realestate') {
    baselineConversionRate = 0.05; // 5% for site visits & unit bookings
    agencyRetainerInr = 6999;
  }

  // Without 24/7 instant response, ~70% of after-hours leads consult competitors or bounce
  const leakageRate = 0.70;
  const missedConversions = Math.max(1, Math.round(afterHoursInquiries * baselineConversionRate * leakageRate));
  
  const monthlyRevenueLeaked = missedConversions * averageValueInr;
  const annualRevenueLeaked = monthlyRevenueLeaked * 12;

  // Tejas AI conservative recovery projection (~60% of leaked conversions recovered)
  const projectedRecoveredRevenue = Math.round(monthlyRevenueLeaked * 0.60);
  const netRoiMultiple = Math.max(1, Number((projectedRecoveredRevenue / agencyRetainerInr).toFixed(1)));

  return {
    monthlyInquiries,
    afterHoursInquiries,
    missedConversionsPerMonth: missedConversions,
    monthlyRevenueLeakedInr: monthlyRevenueLeaked,
    annualRevenueLeakedInr: annualRevenueLeaked,
    projectedRecoveredRevenueInr: projectedRecoveredRevenue,
    agencyRetainerInr,
    netRoiMultiple
  };
}
