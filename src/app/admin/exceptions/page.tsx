import Link from "next/link";
import { getSystemExceptions } from "@/lib/db/queries";
import { ArrowLeft, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Central Exception Queue — Tejas AI Systems",
};

export const dynamic = "force-dynamic";

export default async function AdminExceptionsPage() {
  const exceptions = await getSystemExceptions();

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <Link href="/admin" className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Command Centre</span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">Central Exception Queue</h1>
          <p className="text-xs text-slate-400">
            Real-time monitoring of failed webhook signatures, message drops, and provider retries.
          </p>
        </div>

        <span className="text-xs font-bold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
          {exceptions.length} Total Events
        </span>
      </div>

      {/* Exceptions List */}
      <div className="space-y-3">
        {exceptions.map((exc) => (
          <div
            key={exc.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    exc.severity === "critical"
                      ? "bg-rose-950 text-rose-300 border border-rose-800"
                      : exc.severity === "warning"
                      ? "bg-amber-950 text-amber-300 border border-amber-800"
                      : "bg-blue-950 text-blue-300 border border-blue-800"
                  }`}
                >
                  {exc.severity}
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">{exc.source}</span>
                <span className="text-[10px] text-slate-500">• {new Date(exc.created_at).toLocaleString("en-IN")}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">{exc.error_message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  exc.status === "resolved"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {exc.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
