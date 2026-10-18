import Link from "next/link";
import { Stethoscope, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, Clock } from "lucide-react";

export const metadata = {
  title: "Healthcare & Clinic AI Receptionist — Tejas AI Systems",
  description: "24/7 AI appointment booking and patient triage for dental, pediatric, skin, and eye clinics in Tirupati.",
};

export default function HealthcareSolutionPage() {
  return (
    <div className="py-16 md:py-24 space-y-16">
      
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Healthcare Specialization</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          The 24/7 Clinic AI Receptionist & Appointment Specialist
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Engineered for busy dental practices, pediatricians, dermatologists, and eye hospitals across Tirupati. Eliminates front-desk phone congestion and captures after-hours patient consultations.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/demos"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-md shadow-blue-600/30"
          >
            <span>Test Tirupati Clinic Demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
          >
            <span>View Clinic Package (₹19,999)</span>
          </Link>
        </div>
      </section>

      {/* Core Pain Points & Solutions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold">
              ⏰
            </div>
            <h3 className="font-bold text-base text-white">After-Hours Patient Loss</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When patients suffer from tooth pain or fever late at night, they look for nearby clinics online. Our AI books their morning token while your clinic is closed.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">
              📞
            </div>
            <h3 className="font-bold text-base text-white">Repetitive FAQ Answering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Frees your front-desk from answering *"What is Dr. Garu's consulting fee?"* and *"Is evening OPD open today?"* over 40 times a day.
            </p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
              📲
            </div>
            <h3 className="font-bold text-base text-white">Direct WhatsApp Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No extra apps to install. The doctor and patient both receive immediate WhatsApp confirmation with token number, chosen slot, and chief complaint.
            </p>
          </div>
        </div>
      </section>

      {/* Clinical Safety & Guardrails */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>Strict Clinical Safety Guardrails</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The Healthcare AI Assistant is programmed with strict ethical and medical safety boundaries:
        </p>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Never Diagnoses or Prescribes:</strong> It clearly clarifies that only a qualified physician can diagnose medical conditions.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Immediate Emergency Triage:</strong> Recognizes critical keywords (chest pain, breathing trouble, severe bleeding) and directs patients to emergency hospital casualty immediately.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Data Privacy:</strong> Patient details are collected solely for appointment tokens and are never sold or shared.</span>
          </li>
        </ul>
      </section>

    </div>
  );
}
