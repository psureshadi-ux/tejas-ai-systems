"use client";

import { useState } from "react";
import { calculateRevenueLeakage } from "@/lib/crm/math";
import { Calculator, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export function RoiCalculator() {
  const [inquiries, setInquiries] = useState<number>(300);
  const [ticketValue, setTicketValue] = useState<number>(500);
  const [industry, setIndustry] = useState<"healthcare" | "realestate">("healthcare");

  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute live leakage
  const result = calculateRevenueLeakage({
    monthlyInquiries: inquiries,
    averageValueInr: ticketValue,
    industry,
  });

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !businessName) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          businessName,
          phone: leadPhone,
          industry,
          notes: `ROI Calculator Submission: Monthly Inquiries: ${inquiries}, Ticket: ₹${ticketValue}, Projected Leakage: ₹${result.monthlyRevenueLeakedInr.toLocaleString("en-IN")}/mo`,
        }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="roi-calculator" className="py-20 bg-[#070b14] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Audit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How Much Revenue Is Your Business Leaking After 8 PM?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Over 65% of local patient and property searches in Tirupati happen after normal business hours. Adjust the sliders below to calculate your estimated monthly loss.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Industry Radio */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Select Your Industry
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIndustry("healthcare");
                    setTicketValue(500);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                    industry === "healthcare"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  🏥 Healthcare / Clinic
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIndustry("realestate");
                    setTicketValue(25000);
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition ${
                    industry === "realestate"
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  🏢 Real Estate / Builder
                </button>
              </div>
            </div>

            {/* Slider 1: Monthly Inquiries */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                <span>Estimated Monthly Inquiries / Visitors:</span>
                <span className="text-cyan-400 text-sm font-extrabold">{inquiries} inquiries</span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={25}
                value={inquiries}
                onChange={(e) => setInquiries(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>50 / month</span>
                <span>2,000 / month</span>
              </div>
            </div>

            {/* Slider 2: Average Ticket / Value */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                <span>
                  {industry === "healthcare" ? "Average Consultation / Patient Value:" : "Average Booking Commission / Margin:"}
                </span>
                <span className="text-emerald-400 text-sm font-extrabold">₹{ticketValue.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={industry === "healthcare" ? 300 : 5000}
                max={industry === "healthcare" ? 5000 : 100000}
                step={industry === "healthcare" ? 100 : 2500}
                value={ticketValue}
                onChange={(e) => setTicketValue(Number(e.target.value))}
                className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>₹{industry === "healthcare" ? "300" : "5,000"}</span>
                <span>₹{industry === "healthcare" ? "5,000" : "1,00,000"}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-400 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Based on Tirupati consumer activity: <strong>~{result.afterHoursInquiries} inquiries</strong> visit your listings after 7:00 PM when front-desk staff is unavailable.
              </span>
            </div>

          </div>

          {/* Results & Lead Capture Column */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
            
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Monthly Loss</span>
              <p className="text-3xl sm:text-4xl font-black text-rose-400 tracking-tight mt-1">
                ₹{result.monthlyRevenueLeakedInr.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Approx. <strong>₹{result.annualRevenueLeakedInr.toLocaleString("en-IN")}</strong> annually in lost bookings.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Conservative AI Recovered Revenue:</span>
                <span className="font-bold text-emerald-400">₹{result.projectedRecoveredRevenueInr.toLocaleString("en-IN")} / mo</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tejas AI Monthly Retainer:</span>
                <span className="font-bold text-slate-300">₹{result.agencyRetainerInr.toLocaleString("en-IN")} / mo</span>
              </div>
              <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-900">
                <span className="text-white">Estimated Net ROI Multiple:</span>
                <span className="text-cyan-400 font-extrabold text-sm">{result.netRoiMultiple}x Return</span>
              </div>
            </div>

            {/* Instant Audit Request Form */}
            <div className="pt-4 border-t border-slate-800">
              {isSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Customized Audit Dispatched!</p>
                  <p className="text-[11px] text-slate-300">
                    We will WhatsApp your complete AI audit and live prototype within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-3">
                  <p className="text-xs font-bold text-white">Get Your Full PDF Audit & Working Demo:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name (e.g. Dr. Rao)"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Clinic / Venture Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Number (10 Digits)"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <span>{isSubmitting ? "Calculating..." : "Send Free Audit to WhatsApp"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
