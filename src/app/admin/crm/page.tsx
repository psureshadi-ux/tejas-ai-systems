"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Filter, MessageCircle, CheckCircle2, Search, ExternalLink } from "lucide-react";
import { Lead, LeadStage } from "@/types";

export default function AdminCrmPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterStage, setFilterStage] = useState<string>("all");
  const [filterIndustry, setFilterIndustry] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads/list");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStageChange = async (leadId: string, newStage: LeadStage) => {
    try {
      await fetch("/api/leads/update-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, stage: newStage }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: newStage, updated_at: new Date().toISOString() } : l))
      );
    } catch {
      alert("Failed to update lead stage");
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchStage = filterStage === "all" || l.stage === filterStage;
    const matchInd = filterIndustry === "all" || l.industry === filterIndustry;
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      (l.business_name && l.business_name.toLowerCase().includes(search.toLowerCase())) ||
      (l.area && l.area.toLowerCase().includes(search.toLowerCase()));
    return matchStage && matchInd && matchSearch;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/admin" className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Command Centre</span>
            </Link>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">Agency Sales Pipeline CRM</h1>
          <p className="text-xs text-slate-400">
            Track prospective clinics and real estate developers through acquisition stages.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Total Leads:</span>
          <span className="font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">{leads.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="font-bold text-slate-500 uppercase tracking-wider">Stage:</span>
          {["all", "NEW", "CONTACTED", "QUALIFIED", "DEMO_BOOKED", "PROPOSAL_SENT", "WON"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStage(st)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                filterStage === st ? "bg-blue-600 text-white font-bold" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search name, clinic, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Contact & Business</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Industry</th>
                <th className="py-3 px-3">Stage & Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white text-sm">{lead.name}</p>
                    <p className="text-slate-400 text-[11px]">{lead.business_name || "Direct Inquiry"}</p>
                    <p className="text-slate-500 text-[10px]">{lead.phone}</p>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[11px] text-slate-300">
                      📍 {lead.area || lead.city}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="capitalize text-slate-300">{lead.industry}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={lead.stage}
                      onChange={(e) => handleStageChange(lead.id, e.target.value as LeadStage)}
                      className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="QUALIFIED">QUALIFIED</option>
                      <option value="DEMO_BOOKED">DEMO_BOOKED</option>
                      <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                      <option value="NEGOTIATION">NEGOTIATION</option>
                      <option value="WON">WON (Closed 🎉)</option>
                      <option value="LOST">LOST</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Namaskaram ${lead.name} Garu 🙏 Greetings from Tejas AI Systems, Tirupati. We reviewed your inquiry and have prepared your custom 24/7 AI prototype.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
