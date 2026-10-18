"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactPage() {
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
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.error || "Please verify your details.");
      }
    } catch {
      setErrorMsg("Network error. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Direct Communication</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Speak With Our Tirupati Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Whether you need a custom clinic booking bot or have inquiries about our 48-hour deployment, we respond promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Column */}
        <div className="md:col-span-5 space-y-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white">Contact Information</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reach out via phone, email, or send an instant message on WhatsApp for immediate assistance.
          </p>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Office Headquarters</p>
                <p className="text-slate-400">Tirupati Urban, Andhra Pradesh 517501, India</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Operations Director (Direct)</p>
                <p className="text-slate-400">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Email Address</p>
                <p className="text-slate-400">contact@tejasai.in</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <a
              href="https://wa.me/919876543210?text=Hello%20Tejas%20AI%20Systems%2C%20I%20am%20interested%20in%20a%2024%2F7%20AI%20assistant%20for%20my%20business."
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          {success ? (
            <div className="text-center space-y-4 py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h2 className="text-xl font-bold text-white">Message Dispatched!</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name}. We have logged your request and will reach out to you within 30 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="text-lg font-bold text-white mb-2">Send an Inquiry</h2>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. K. Srinivasulu"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Clinic / Venture Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Balaji Hospital"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">WhatsApp Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210 (10 digits)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="healthcare">Healthcare / Clinic</option>
                    <option value="realestate">Real Estate / Construction</option>
                    <option value="general">Other Service Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Your Requirements / Message</label>
                <textarea
                  rows={3}
                  placeholder="How can we assist your business?"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
