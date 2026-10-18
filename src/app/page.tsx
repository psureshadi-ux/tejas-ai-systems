import { HeroSection } from "@/components/home/HeroSection";
import { NicheSwitcher } from "@/components/home/NicheSwitcher";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { PrototypeGrid } from "@/components/home/PrototypeGrid";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <NicheSwitcher />
      <RoiCalculator />
      <PrototypeGrid />
      <PricingSection />
      <FaqAccordion />

      {/* Final Conversion Strip */}
      <section className="py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-t border-blue-900/40 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Double After-Hours Bookings?</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Deploy Your Custom AI Assistant in 48 Hours.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            We already have working models for clinics in Prakasam Road, Korlagunta, AIR Bypass, and builders across Karakambadi and Tiruchanur. Test your business prototype today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/free-audit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
            >
              <span>Book Your Free AI Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Speak to Tirupati Operations</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
