import Link from "next/link";
import { Cookie, ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Tejas AI Systems",
  description: "Learn how Tejas AI Systems uses cookies and similar technologies in compliance with India's DPDP Act 2023.",
};

export default function CookiePolicyPage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Cookie Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: October 18, 2026 | Effective for all tenants and visitors</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you visit our website or interact with our dynamic client prototypes. They allow our platform to remember your active session, store temporary prototype test preferences, and safeguard against cross-site request forgery (CSRF).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Essential Cookies Only Policy</h2>
          <p>
            Tejas AI Systems operates strictly on an **Essential-First Privacy Architecture** compliant with India's Digital Personal Data Protection (DPDP) Act 2023. We do NOT use third-party invasive ad tracking cookies or sell your browsing history to third-party data brokers.
          </p>
          <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-2">
            <p className="font-semibold text-white">Categories of cookies used:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Session & Auth Cookies:</strong> Maintain your logged-in administrator or client portal session securely.</li>
              <li><strong className="text-slate-200">Security Cookies:</strong> Validate anti-CSRF tokens and cryptographic transaction signatures.</li>
              <li><strong className="text-slate-200">UI State Cookies:</strong> Remember your selected niche filter (Healthcare vs Real Estate) during your visit.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Managing Your Preferences</h2>
          <p>
            You can configure your browser to reject all cookies or notify you when a cookie is placed. However, disabling essential session cookies may prevent you from logging into the Owner Command Centre or interacting with dynamic prototype chats.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Contact Our Data Protection Officer</h2>
          <p>
            For inquiries regarding our cookie policies or data protection practices in Tirupati, contact our Data Grievance Officer at <strong className="text-cyan-400">info@tejasaisystems.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
