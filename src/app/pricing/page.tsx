import { PricingSection } from "@/components/home/PricingSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export const metadata = {
  title: "Pricing & Productized Packages — Tejas AI Systems",
  description: "Predictable, transparent investment for 24/7 AI Receptionists and Property Advisors.",
};

export default function PricingPage() {
  return (
    <div className="py-12 space-y-12">
      <PricingSection />
      <FaqAccordion />
    </div>
  );
}
