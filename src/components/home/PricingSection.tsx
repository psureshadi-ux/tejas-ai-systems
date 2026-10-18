"use client";

import { useState } from "react";
import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<"clinic" | "builder">("clinic");
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleDepositCheckout = async (planType: "clinic" | "builder") => {
    setLoadingOrder(true);
    const depositInr = planType === "clinic" ? 10000 : 15000;

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInr: depositInr,
          receiptId: `rcpt_${planType}_${Date.now()}`,
        }),
      });

      const orderData = await res.json();
      if (!orderData.success) {
        alert("Failed to initialize checkout order: " + orderData.error);
        return;
      }

      // Check if Razorpay script is present or simulate verified sandbox flow
      alert(
        `Razorpay Order Initialized: ${orderData.orderId}\nDeposit Amount: ₹${depositInr.toLocaleString(
          "en-IN"
        )}\n\nIn live production mode, Razorpay UPI / Card modal will launch. Redirecting to onboarding questionnaire!`
      );
      window.location.href = `/onboard?plan=${planType}&orderId=${orderData.orderId}`;
    } catch (err) {
      alert("Checkout error: " + err);
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-[#070b14] border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Transparent Productized Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Predictable Investment. Measurable Return.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            No unpredictable hourly billing. One fixed setup fee for full deployment, plus an affordable monthly retainer covering hosting, prompt tuning, and WhatsApp infrastructure.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Clinic AI Receptionist */}
          <div
            onClick={() => setSelectedPlan("clinic")}
            className={`cursor-pointer bg-slate-900/90 border rounded-3xl p-8 relative flex flex-col justify-between transition duration-300 ${
              selectedPlan === "clinic"
                ? "border-blue-500 shadow-2xl shadow-blue-500/20"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  Healthcare Practices
                </span>
                <span className="text-xs text-slate-400">Under 48-Hour Live</span>
              </div>

              <h3 className="text-xl font-bold text-white">Clinic AI Receptionist</h3>
              <p className="text-xs text-slate-400 mt-1">For Dental, Pediatric, Dermatology & Eye Clinics.</p>

              <div className="pt-6 pb-6 border-b border-slate-800 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹19,999</span>
                  <span className="text-xs text-slate-400">one-time setup</span>
                </div>
                <p className="text-xs text-cyan-400 font-semibold">+ ₹4,999 / month retainer</p>
              </div>

              <ul className="py-6 space-y-3 text-xs text-slate-300">
                {[
                  "24/7 Web & WhatsApp Appointment Booking",
                  "OPD Timings & Doctor Consultation Fee FAQs",
                  "Telugu & English Natural Language Support",
                  "Instant Doctor WhatsApp Notification on booking",
                  "Monthly Performance & Patient Inquiries Report",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleDepositCheckout("clinic")}
              disabled={loadingOrder}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
            >
              <span>{loadingOrder ? "Initializing..." : "Book Setup with 50% Deposit (₹10,000)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Builder AI Property Advisor */}
          <div
            onClick={() => setSelectedPlan("builder")}
            className={`cursor-pointer bg-slate-900/90 border rounded-3xl p-8 relative flex flex-col justify-between transition duration-300 ${
              selectedPlan === "builder"
                ? "border-emerald-500 shadow-2xl shadow-emerald-500/20"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  Real Estate Ventures
                </span>
                <span className="text-xs text-slate-400">High Conversion</span>
              </div>

              <h3 className="text-xl font-bold text-white">Builder AI Property Advisor</h3>
              <p className="text-xs text-slate-400 mt-1">For Luxury Villas, Apartments & TUDA Plots.</p>

              <div className="pt-6 pb-6 border-b border-slate-800 space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">₹29,999</span>
                  <span className="text-xs text-slate-400">one-time setup</span>
                </div>
                <p className="text-xs text-emerald-400 font-semibold">+ ₹6,999 / month retainer</p>
              </div>

              <ul className="py-6 space-y-3 text-xs text-slate-300">
                {[
                  "24/7 Site Visit Scheduler with vehicle pickup request",
                  "Instant WhatsApp Brochure & Floor Plan Delivery",
                  "Buyer Budget & 2BHK/3BHK Unit Qualification",
                  "TUDA Approval & Bank Loan (SBI/HDFC) FAQs",
                  "Direct Sales Manager WhatsApp Hot Lead Alerts",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleDepositCheckout("builder")}
              disabled={loadingOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30"
            >
              <span>{loadingOrder ? "Initializing..." : "Book Setup with 50% Deposit (₹15,000)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Security Note */}
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Balance 50% collected only after successful client approval and testing.</span>
        </div>

      </div>
    </section>
  );
}
