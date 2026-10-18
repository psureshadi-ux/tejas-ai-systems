import Link from "next/link";
import { Bot, MessageSquareText, Video, Cpu, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata = {
  title: "Products & Core Engines | Tejas AI Systems",
  description: "Explore the 4 proprietary AI engines powering Tejas AI Systems for lead generation, qualification, appointment booking, and agency operations.",
};

export default function ProductsPage() {
  const products = [
    {
      icon: MessageSquareText,
      badge: "Flagship Core Engine",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      title: "24/7 AI Lead & Appointment Engine",
      description:
        "Instant multi-channel conversational intelligence for WhatsApp, website widgets, and QR codes. Trained on doctor OPD timings, real estate site visits, and high-ticket customer objections.",
      capabilities: [
        "Sub-3-second response latency across web and WhatsApp",
        "Deterministic appointment scheduling into calendars & CRM",
        "Intelligent Telugu & English code-switching conversation",
        "Automated WhatsApp reminder and no-show recovery sequence",
      ],
      href: "/solutions/healthcare",
      cta: "Explore Engine Specs",
    },
    {
      icon: Cpu,
      badge: "Agency Sales Weapon",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "Zero-Cost Dynamic Prototype Studio",
      description:
        "Generates customized, fully interactive branded client demonstration portals in under 3 minutes with real clinic doctor names, treatments, and builder floor plans.",
      capabilities: [
        "54 pre-built, production-ready Tirupati business prototypes",
        "Interactive Doctor/Builder simulation controls for prospects",
        "Custom domain and shareable client preview links",
        "Zero token consumption on static inspection mode",
      ],
      href: "/demos",
      cta: "Browse Active Prototypes",
    },
    {
      icon: Video,
      badge: "Outreach & Conversion",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      title: "AI Explainer Video & Outreach Studio",
      description:
        "Automated personalized outreach engine pairing hyper-personalized video walkthrough scripts with localized WhatsApp pitches tailored for doctors and real estate owners.",
      capabilities: [
        "Dynamic pitch script synthesis for high-ticket decision makers",
        "WhatsApp click-to-chat centaur dispatch system",
        "Visual demonstration proof showing real revenue loss",
        "Built-in compliance with Meta commercial messaging guidelines",
      ],
      href: "/free-audit",
      cta: "Request Video Demo Audit",
    },
    {
      icon: Bot,
      badge: "Operations Infrastructure",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Autonomous Agency Operating System",
      description:
        "Central command dashboard for the Operations Director and Technical Director to manage client pipelines, monitor agent reliability, track MRR, and handle exceptions.",
      capabilities: [
        "Real-time pipeline Kanban with instant stage updates",
        "Central exception queue catching 100% of API rate limits",
        "Financial intelligence tracking setup cash, MRR, and gross margin",
        "One-click client onboarding and automated knowledge intake",
      ],
      href: "/admin",
      cta: "View Command Centre",
    },
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          Proprietary AI Architecture
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Enterprise-Grade AI Engines <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            Built for Tangible Revenue Recovery
          </span>
        </h1>
        <p className="text-lg text-slate-400">
          Every engine is engineered with strict type safety, zero hallucination guardrails, and real transactional persistence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#0f172a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">{p.title}</h2>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{p.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {p.capabilities.map((c, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={p.href}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all border border-slate-700"
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
