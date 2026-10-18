"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Sparkles, Smartphone, CheckCircle2, ShieldCheck, MapPin, Phone } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DynamicDemoPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Infer title & industry from slug
  const isRealEstate = slug.includes("bliss") || slug.includes("vaikunta") || slug.includes("heights") || slug.includes("plots");
  const businessName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Namaste! 🙏 Welcome to ${businessName}, Tirupati. I am your 24/7 AI Assistant. I can help you with OPD timings, fees, or book an appointment slot right now. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const simulateQuestion = (q: string) => {
    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = `Thank you for asking! We are located in Tirupati. Standard timings are 10:00 AM - 1:30 PM & 5:30 PM - 9:00 PM. Would you like me to reserve a consultation token for you?`;
      if (q.toLowerCase().includes("book") || q.toLowerCase().includes("appointment") || q.toLowerCase().includes("site visit")) {
        reply = `Certainly! We have open slots available tomorrow evening at 06:00 PM and 06:45 PM. Please share your Name and WhatsApp contact to confirm your slot!`;
      } else if (q.toLowerCase().includes("price") || q.toLowerCase().includes("fee") || q.toLowerCase().includes("cost")) {
        reply = isRealEstate
          ? `At ${businessName}, 2BHK units start from ₹48 Lakhs and 3BHK luxury units from ₹65 Lakhs with 80% bank loans from SBI and HDFC. Would you like to schedule a free site tour?`
          : `Standard consultation fee is ₹300 - ₹500. Special treatment procedures (implants, root canals, laser) vary by consultation. Would you like to reserve an appointment?`;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 700);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    simulateQuestion(input.trim());
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col">
      
      {/* Top Demo Simulator Banner for the Doctor/Builder */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 px-4 py-3 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Link href="/demos" className="text-slate-400 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-white font-bold">{businessName}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-[11px] hidden md:inline">Test Simulation Controls:</span>
            <button
              onClick={() => simulateQuestion(isRealEstate ? "What are the starting prices for 2BHK and 3BHK?" : "What are your consultation timings and fees?")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            >
              ⚡ Test FAQ
            </button>
            <button
              onClick={() => simulateQuestion(isRealEstate ? "I want to schedule a free site visit this weekend." : "I want to book an appointment for tomorrow evening.")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-2.5 py-1.5 rounded-lg transition"
            >
              📅 Test Booking
            </button>
            <button
              onClick={() => setShowNotificationModal(true)}
              className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-2.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>View WhatsApp Alert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <main className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full flex flex-col justify-between">
        
        {/* Chat Widget Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px]">
          
          {/* Header */}
          <div className="bg-slate-950 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md">
                {isRealEstate ? "🏢" : "🏥"}
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">{businessName}</h2>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>24/7 AI Receptionist Active</span>
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
              Telugu & English
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0a0f1d] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    AI
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-slate-800 text-white rounded-tr-none border border-slate-700"
                      : "bg-blue-600 text-white rounded-tl-none shadow-blue-600/20"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs italic pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span>Typing...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a question or request an appointment slot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition shadow-md shadow-blue-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Bottom Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
          <p>
            Interested in activating this 24/7 AI system for <strong>{businessName}</strong>?{" "}
            <Link href="/pricing" className="text-cyan-400 font-bold underline hover:text-cyan-300">
              View Deployment Package (Under 48 Hours)
            </Link>
          </p>
        </div>

      </main>

      {/* WhatsApp Notification Modal Simulation */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Live WhatsApp Alert to Management</h3>
              </div>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                &times;
              </button>
            </div>

            <div className="bg-[#0b141a] border border-emerald-500/30 rounded-2xl p-4 font-mono text-xs text-slate-200 space-y-2">
              <p className="font-bold text-emerald-400">🔔 NEW INQUIRY CONFIRMED</p>
              <p>• <strong>Contact:</strong> S. Venkat Reddy</p>
              <p>• <strong>Phone:</strong> +91 94401 XXXXX</p>
              <p>• <strong>Requested Slot:</strong> Tomorrow Evening, 06:30 PM</p>
              <p>• <strong>Business:</strong> {businessName}</p>
              <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                Delivered 24/7 by Tejas AI Systems ⚡
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              When a real client books using this widget, your reception or sales team gets this formatted message within 5 seconds on WhatsApp.
            </p>

            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Understood
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
