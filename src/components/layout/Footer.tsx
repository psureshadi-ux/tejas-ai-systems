import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base">
              T
            </div>
            <span className="font-extrabold text-sm text-white">Tejas AI Systems</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            The 24/7 AI Lead & Appointment Engine. Helping Tirupati healthcare clinics and real estate developers capture after-hours inquiries and double bookings.
          </p>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Tirupati, Andhra Pradesh, India</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>+91 98765 43210</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>contact@tejasai.in</span>
            </p>
          </div>
        </div>

        {/* Col 2: Solutions */}
        <div className="space-y-2">
          <p className="font-bold text-white text-xs uppercase tracking-wider">AI Solutions</p>
          <ul className="space-y-1.5">
            <li><Link href="/solutions/healthcare" className="hover:text-cyan-400 transition">Clinic AI Receptionist</Link></li>
            <li><Link href="/solutions/real-estate" className="hover:text-cyan-400 transition">Builder AI Property Advisor</Link></li>
            <li><Link href="/demos" className="hover:text-cyan-400 transition">54 Tirupati Live Demos</Link></li>
            <li><Link href="/free-audit" className="hover:text-cyan-400 transition">Free AI Growth Audit</Link></li>
          </ul>
        </div>

        {/* Col 3: Company & Portal */}
        <div className="space-y-2">
          <p className="font-bold text-white text-xs uppercase tracking-wider">Operations & Portal</p>
          <ul className="space-y-1.5">
            <li><Link href="/admin" className="hover:text-cyan-400 transition">Owner Command Centre</Link></li>
            <li><Link href="/portal" className="hover:text-cyan-400 transition">Client Organization Portal</Link></li>
            <li><Link href="/onboard" className="hover:text-cyan-400 transition">Client Onboarding</Link></li>
            <li><Link href="/pricing" className="hover:text-cyan-400 transition">Pricing & Packages</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400 transition">About Tejas AI</Link></li>
          </ul>
        </div>

        {/* Col 4: Legal & Compliance */}
        <div className="space-y-2">
          <p className="font-bold text-white text-xs uppercase tracking-wider">Security & Legal</p>
          <ul className="space-y-1.5">
            <li><Link href="/legal/privacy" className="hover:text-cyan-400 transition">Privacy Policy (DPDP Act)</Link></li>
            <li><Link href="/legal/terms" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
            <li><Link href="/legal/security" className="hover:text-cyan-400 transition">Security & Data Processing</Link></li>
            <li><Link href="/legal/acceptable-use" className="hover:text-cyan-400 transition">Acceptable Use Policy</Link></li>
            <li><Link href="/legal/cookie-policy" className="hover:text-cyan-400 transition">Cookie Preferences</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-900 py-4 px-4 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Tejas AI Systems. All rights reserved. Registered under MSME / Udyam in Andhra Pradesh, India.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Enterprise Tenant Isolation & 256-Bit SSL Encrypted</span>
        </p>
      </div>
    </footer>
  );
}
