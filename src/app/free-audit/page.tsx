"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export default function FreeAuditPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    industry: "healthcare",
    city: "Tirupati",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          notes: "Free AI Growth Audit Request: " + formData.notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMessage(data.error || "Please check your information and try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complimentary Tirupati Business Audit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Book Your 15-Minute AI Revenue Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          We will analyze your current after-hours response time and build a complimentary live prototype demonstrating how your clinic or venture can automate appointment bookings.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {success ? (
          <div className="text-center space-y-4 py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Audit Request Received!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Our Operations Director will review your business and dispatch your custom interactive prototype to <strong>{formData.phone}</strong> on WhatsApp within 30 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Srinivasulu"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Clinic / Venture Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Balaji Dental Hospital"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210 (10 Digits)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Industry Vertical *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="healthcare">Healthcare / Clinic</option>
                  <option value="realestate">Real Estate / Builder</option>
                  <option value="general">Other Service Business</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Clinic / Office Location in Tirupati</label>
              <input
                type="text"
                placeholder="e.g. Prakasam Road / Korlagunta / Karakambadi Road"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 mt-4"
            >
              <span>{loading ? "Generating Request..." : "Request Free Audit & Custom Prototype"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
