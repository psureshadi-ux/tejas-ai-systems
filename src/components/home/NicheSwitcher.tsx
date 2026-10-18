"use client";

import { useState } from "react";
import Link from "next/link";
import { Stethoscope, Building2, Check, ArrowRight, Smartphone, BellRing } from "lucide-react";

export function NicheSwitcher() {
  const [activeNiche, setActiveNiche] = useState<"healthcare" | "realestate">("healthcare");

  return (
    <section className="py-16 bg-[#0a0f1d] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Productized Industry Workflows</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Engineered Specifically For Your Daily Headaches
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select your industry to see how our 24/7 AI agents handle patient appointment bookings or home buyer site visits.
          </p>

          {/* Toggle Switch */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-inner mt-4">
            <button
              onClick={() => setActiveNiche("healthcare")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeNiche === "healthcare"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Healthcare & Clinics</span>
            </button>

            <button
              onClick={() => setActiveNiche("realestate")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeNiche === "realestate"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Real Estate & Builders</span>
            </button>
          </div>
        </div>

        {/* Dynamic Niche Card Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Value Proposition & Capabilities */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-block p-2.5 rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
              {activeNiche === "healthcare" ? <Stethoscope className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {activeNiche === "healthcare"
                ? "The 24/7 Clinic AI Receptionist"
                : "The 24/7 Builder AI Property Advisor"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeNiche === "healthcare"
                ? "Patients search for dental, pediatric, skin, and eye clinics late at night. Instead of showing an empty contact form, our AI greets them in Telugu or English, answers OPD timings and fees, and reserves their appointment slot instantly."
                : "Home buyers explore properties after work. Our AI assistant qualifies their 2BHK/3BHK budget, delivers floor plan PDFs on WhatsApp in 3 seconds, and books confirmed weekend VIP site visits."}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              {(activeNiche === "healthcare"
                ? [
                    "Answers doctor consultation fees & morning/evening OPD timings",
                    "Qualifies patient chief complaint and reserves calendar slot",
                    "Sends instant WhatsApp confirmation with clinic token",
                    "Frees front desk from repetitive phone inquiries",
                  ]
                : [
                    "Delivers 2BHK & 3BHK floor plan brochures instantly",
                    "Confirms TUDA approval, RERA registration, and bank loans (SBI, HDFC)",
                    "Schedules Free VIP Site Visits with complimentary vehicle pickup",
                    "Alerts sales manager within 5 seconds with buyer budget and phone",
                  ]
              ).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 font-bold" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href={activeNiche === "healthcare" ? "/solutions/healthcare" : "/solutions/real-estate"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
              >
                <span>Explore Full {activeNiche === "healthcare" ? "Clinic" : "Builder"} Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Simulated WhatsApp Alert Card */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Live Phone Notification Simulation</span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                WhatsApp Delivery
              </span>
            </div>

            <div className="bg-[#0b141a] border border-emerald-500/30 rounded-xl p-4 font-mono text-xs text-slate-200 space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 border-b border-emerald-900/50 pb-1.5">
                <span className="flex items-center gap-1">
                  <BellRing className="w-3 h-3" />
                  <span>NEW INQUIRY CAPTURED</span>
                </span>
                <span>Just Now</span>
              </div>

              {activeNiche === "healthcare" ? (
                <div className="space-y-1 text-[11px] leading-relaxed">
                  <p className="font-bold text-white">🏥 NEW PATIENT APPOINTMENT</p>
                  <p>• <strong>Patient:</strong> S. Venkat Reddy</p>
                  <p>• <strong>Phone:</strong> +91 94401 XXXXX</p>
                  <p>• <strong>Slot:</strong> Tomorrow, 06:30 PM (Evening OPD)</p>
                  <p>• <strong>Reason:</strong> Dental Checkup & Cleaning</p>
                  <p>• <strong>Location:</strong> Prakasam Road, Tirupati</p>
                </div>
              ) : (
                <div className="space-y-1 text-[11px] leading-relaxed">
                  <p className="font-bold text-white">🏢 HOT BUYER SITE VISIT</p>
                  <p>• <strong>Buyer:</strong> K. Prasad Rao</p>
                  <p>• <strong>Phone:</strong> +91 98490 XXXXX</p>
                  <p>• <strong>Interest:</strong> 3BHK East Facing (Budget: ₹75L - ₹90L)</p>
                  <p>• <strong>Site Visit:</strong> This Sunday, 11:00 AM</p>
                  <p>• <strong>Location:</strong> Karakambadi Road, Tirupati</p>
                </div>
              )}

              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                Delivered 24/7 by Tejas AI Engine ⚡
              </p>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              Whenever a prospect inquires on your website or WhatsApp after-hours, this formatted alert lands on the doctor&apos;s or sales manager&apos;s phone in under 5 seconds.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
