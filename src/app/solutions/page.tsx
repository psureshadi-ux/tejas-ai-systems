import Link from "next/link";
import { Stethoscope, Building2, ArrowRight, ShieldCheck, Clock, Zap, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Industry Solutions | Tejas AI Systems",
  description: "Specialized 24/7 AI Lead & Appointment Engines for Tirupati Healthcare Clinics and Real Estate Developers.",
};

export default function SolutionsPage() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Tailored AI Workflows
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Industry Solutions Built for <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Tirupati's Top Verticals</span>
        </h1>
        <p className="text-lg text-slate-400">
          We don't sell generic chatbot templates. Every engine is deeply trained on local Tirupati patient and property buyer behavior, Telugu/English nuances, and your actual operations.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Healthcare Card */}
        <div className="relative group p-8 sm:p-10 rounded-3xl bg-[#0f172a] border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Stethoscope className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Clinics & Hospitals</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">24/7 AI Receptionist & OPD Coordinator</h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Trained for Dental, Dermatology, Pediatrics, Ophthalmology, and Multispecialty clinics. Automatically answers fees, treatments, doctor availability, and books OPD slots straight into your calendar and WhatsApp.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero patient leakage after 8:00 PM OPD closures</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Emergency symptom safety triage & instant redirect</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bilingual Telugu + English voice & text conversationalist</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/solutions/healthcare"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Explore Healthcare Engine
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Real Estate Card */}
        <div className="relative group p-8 sm:p-10 rounded-3xl bg-[#0f172a] border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Builders & Developers</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">24/7 AI Property Sales & Site-Visit Engine</h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Trained for TUDA approved plots, luxury villas, and 2BHK/3BHK apartments across Renigunta Road, Karakambadi, and Tirupati Central. Qualifies buyer budgets and locks confirmed weekend site visits.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant brochure, floor plan, and price-sheet dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-intent buyer qualification (budget, possession timeline)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp notification to sales director on visit booking</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link
              href="/solutions/real-estate"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
            >
              Explore Real Estate Engine
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
