"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    keyPersonName: "",
    phone: "",
    industry: "healthcare",
    operatingHours: "",
    servicesOffered: "",
    topFaqs: "",
    whatsappAlertNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Please review your entries.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fast-Track Setup</span>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Client Onboarding Questionnaire
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Provide your business details below so our engineering team can configure your 24/7 AI agent and deploy it within 48 hours.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {success ? (
          <div className="text-center space-y-4 py-8">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Setup Details Successfully Received!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Our engineering team has created your private workspace. We will notify you at <strong>{formData.whatsappAlertNumber}</strong> on WhatsApp as soon as your agent is live for final approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Clinic / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Venkateswara Dental Care"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Doctor / Managing Director *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Srinivasulu, MDS"
                  value={formData.keyPersonName}
                  onChange={(e) => setFormData({ ...formData, keyPersonName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Industry Vertical *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="healthcare">Healthcare Practice / Clinic</option>
                  <option value="realestate">Real Estate / Construction Builder</option>
                  <option value="general">Other Service Business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Alert Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210 (For receiving lead alerts)"
                  value={formData.whatsappAlertNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappAlertNumber: e.target.value, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">OPD / Operating Hours *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mon-Sat: 10:00 AM - 1:30 PM & 5:30 PM - 9:00 PM; Sun: Emergency only"
                value={formData.operatingHours}
                onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Key Treatments / Unit Sizes & Starting Prices *</label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Consultation: ₹400; Root Canal: ₹3500; Dental Implants: ₹25,000"
                value={formData.servicesOffered}
                onChange={(e) => setFormData({ ...formData, servicesOffered: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Top Patient / Buyer FAQs *</label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Do you accept UPI/Cards? Yes. Is parking available? Yes, beside clinic."
                value={formData.topFaqs}
                onChange={(e) => setFormData({ ...formData, topFaqs: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 mt-4"
            >
              <span>{loading ? "Submitting Configuration..." : "Submit Configuration & Launch Agent"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
