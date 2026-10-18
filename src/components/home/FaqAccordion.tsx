"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Does my front-desk or clinic staff need technical knowledge to use this?",
    a: "None at all. Your staff does not need to learn any software. When a patient or buyer interacts with the AI, the confirmed appointment or hot lead is delivered straight to your clinic's existing WhatsApp as a simple, formatted message.",
  },
  {
    q: "Can the AI Assistant speak and respond in conversational Telugu and English?",
    a: "Yes. Our AI models are customized for Andhra Pradesh and South Indian markets, naturally understanding both formal English and conversational Telugu/Tanglish inquiry styles.",
  },
  {
    q: "What happens if a patient asks an emergency or medical diagnosis question?",
    a: "Our Healthcare AI has strict safety boundaries: it never provides medical diagnoses or prescriptions. In case of emergency keywords (e.g. chest pain, severe bleeding, trauma), it immediately delivers emergency hospital directions and urges the patient to call the duty doctor or visit the casualty department.",
  },
  {
    q: "How does the AI know our clinic's specific OPD timings and doctor consultation fees?",
    a: "During our 15-minute onboarding process, we ingest your exact doctor schedules, consulting charges,Accepted payment methods, and clinic landmarks into the AI's private knowledge base.",
  },
  {
    q: "How quickly can Tejas AI Systems have this live on our website and WhatsApp?",
    a: "We have pre-built architectural templates for Tirupati clinics and real estate builders. Once you review your custom prototype and provide your timings, we deploy your production agent within 48 hours.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#090d16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Clear Answers for Busy Business Owners
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
