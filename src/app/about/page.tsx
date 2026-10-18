import { MapPin, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Tejas AI Systems — Tirupati AI Automation Agency",
  description: "Learn about Tejas AI Systems, our mission, leadership, and operational philosophy.",
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Company & Mission</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Pioneering 24/7 AI Automation from Tirupati
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Tejas AI Systems was founded with a singular conviction: regional service businesses in Tier-2 and Tier-3 Indian cities deserve the same world-class AI automation power as Silicon Valley enterprises.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white">Our Operating Philosophy: The Centaur Model</h2>
        <p>
          We don&apos;t build complex, brittle software that requires your front desk to undergo weeks of training. We believe in the <strong>Centaur Operating Model</strong>: AI agents handle 80% of repetitive qualification, FAQ answering, and booking tasks, while human operators retain full visibility, empathy, and final authority.
        </p>
        <p>
          Headquartered in Tirupati, Andhra Pradesh, we work directly alongside local dentists, pediatricians, eye specialists, and residential builders to turn passive website visits and late-night inquiries into confirmed bookings.
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800">
          <div className="space-y-1">
            <p className="font-bold text-white text-xs">Operations Director (Tirupati Operations)</p>
            <p className="text-slate-400 text-xs">
              Direct client communications, customer onboarding, operational reviews, and frontline responsiveness.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-white text-xs">Technical Director (AI & Systems Architecture)</p>
            <p className="text-slate-400 text-xs">
              Multi-tenant architecture, AI agent guardrails, database security, and provider reliability.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <MapPin className="w-6 h-6 text-cyan-400 mx-auto" />
          <h3 className="font-bold text-sm text-white">Rooted in Tirupati</h3>
          <p className="text-xs text-slate-400">Serving practices across Prakasam Road, AIR Bypass, Korlagunta, and TUDA limits.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
          <h3 className="font-bold text-sm text-white">Strict Data Privacy</h3>
          <p className="text-xs text-slate-400">Database-enforced tenant isolation and compliance with Indian data privacy standards.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-2">
          <HeartHandshake className="w-6 h-6 text-blue-400 mx-auto" />
          <h3 className="font-bold text-sm text-white">48-Hour Live Guarantee</h3>
          <p className="text-xs text-slate-400">Fast, predictable deployments with zero downtime for your existing staff.</p>
        </div>
      </div>

    </div>
  );
}
