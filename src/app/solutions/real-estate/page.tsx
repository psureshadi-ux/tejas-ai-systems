import Link from "next/link";
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, FileText, Car } from "lucide-react";

export const metadata = {
  title: "Real Estate & Builder AI Property Advisor — Tejas AI Systems",
  description: "24/7 AI site visit booking and instant floor plan WhatsApp delivery for builders and developers in Tirupati.",
};

export default function RealEstateSolutionPage() {
  return (
    <div className="py-16 md:py-24 space-y-16">
      
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Real Estate & Construction Specialization</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The 24/7 Builder AI Property Advisor & Site Visit Scheduler
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Designed for residential apartment complexes, gated villa communities, and TUDA-approved plot ventures across Tirupati, Karakambadi, and Tiruchanur. Turn passive ad clicks into confirmed weekend site visits.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/demos"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md shadow-emerald-600/30"
          >
            <span>Test Tirupati Builder Demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
          >
            <span>View Builder Package (₹29,999)</span>
          </Link>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">Instant WhatsApp Brochure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a buyer inquires on social media or Google, the AI delivers the PDF brochure and 2BHK/3BHK floor plan directly to their WhatsApp in 3 seconds.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
              <Car className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">VIP Site Visit Booking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Qualifies the buyer&apos;s budget and preferred date, offering complimentary vehicle pickup for their weekend on-site tour.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">TUDA & Bank Loan FAQs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Answers common buyer questions regarding title approvals, RERA registration, and pre-approved bank loans from SBI, HDFC, and ICICI.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
