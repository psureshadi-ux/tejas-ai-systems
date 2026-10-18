import Link from "next/link";
import { getFinancialMetrics, getLeads, getAppointments, getSystemExceptions } from "@/lib/db/queries";
import { DollarSign, Users, Bot, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, Calendar } from "lucide-react";

export const metadata = {
  title: "Owner Command Centre — Tejas AI Systems",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const metrics = await getFinancialMetrics();
  const leads = await getLeads();
  const appointments = await getAppointments();
  const exceptions = await getSystemExceptions();

  const unresolvedExceptions = exceptions.filter((e) => e.status !== "resolved");

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Owner Command Centre</h1>
            <span className="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Live Operations
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time financial intelligence, CRM sales pipeline, and multi-tenant agent operations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/crm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Sales Pipeline CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/exceptions"
            className={`text-xs font-bold px-3 py-2 rounded-xl border transition flex items-center gap-1.5 ${
              unresolvedExceptions.length > 0
                ? "bg-rose-950/80 text-rose-300 border-rose-800 animate-pulse"
                : "bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Exceptions ({unresolvedExceptions.length})</span>
          </Link>
        </div>
      </div>

      {/* Financial & Operational KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</span>
          <p className="text-2xl font-black text-emerald-400">₹{metrics.mrr_inr.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-slate-500">Active monthly retainers</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cash Collected</span>
          <p className="text-2xl font-black text-white">₹{metrics.cash_collected_inr.toLocaleString("en-IN")}</p>
          <p className="text-[10px] text-slate-500">Setups + Retainers</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Deployments</span>
          <p className="text-2xl font-black text-cyan-400">{metrics.active_agents}</p>
          <p className="text-[10px] text-slate-500">Live AI Assistants in Tirupati</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Est. Gross Margin</span>
          <p className="text-2xl font-black text-blue-400">{metrics.estimated_gross_margin_pct}%</p>
          <p className="text-[10px] text-slate-500">Direct costs: ₹{metrics.direct_provider_costs_inr.toLocaleString("en-IN")}/mo</p>
        </div>
      </div>

      {/* Lower Grid: Recent Inquiries & Upcoming Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries (CRM Snapshot) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Recent Inbound Leads & Prospects</span>
            </h2>
            <Link href="/admin/crm" className="text-xs text-cyan-400 hover:underline">
              View CRM Pipeline ({leads.length})
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80 text-xs">
            {leads.slice(0, 5).map((l) => (
              <div key={l.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white text-sm">{l.name}</p>
                  <p className="text-slate-400 text-[11px]">
                    {l.business_name} • {l.area || l.city} ({l.industry})
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      l.stage === "WON"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : l.stage === "PROPOSAL_SENT"
                        ? "bg-blue-950 text-blue-400 border border-blue-800"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {l.stage}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-0.5">{l.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Scheduled Appointments */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Scheduled Bookings</span>
            </h2>
            <span className="text-[11px] text-slate-500">{appointments.length} Total</span>
          </div>

          <div className="space-y-3 text-xs">
            {appointments.map((a) => (
              <div key={a.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{a.customer_name}</span>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    {a.status}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">{a.customer_phone}</p>
                <p className="text-[11px] text-cyan-400 font-semibold">
                  ⏰ {new Date(a.scheduled_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </p>
                {a.notes && <p className="text-[11px] text-slate-400 italic">{a.notes}</p>}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
