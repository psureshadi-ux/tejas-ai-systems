import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Live Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>The 24/7 AI Lead & Appointment Engine</span>
          <span className="text-slate-400">•</span>
          <span className="text-cyan-400 font-bold">54 Active Demos in Tirupati</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight md:leading-none">
          Never Lose Another Patient or Property Buyer{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            After 8 PM.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Over 65% of local inquiries arrive after your reception desk closes. Tejas AI Systems deploys intelligent 24/7 AI Receptionists and Property Advisors that answer patient questions, deliver floor plans, and book appointments directly into your WhatsApp.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/demos"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Test Live Tirupati Demos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#roi-calculator"
            className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Calculate Lost Revenue</span>
          </Link>
        </div>

        {/* Key Trust Signals */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left text-xs border-t border-slate-800/60 mt-10">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Under 48-Hour Setup</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>24/7 WhatsApp Alerts</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Multi-Tenant RLS Privacy</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Telugu & English Support</span>
          </div>
        </div>

      </div>
    </section>
  );
}
