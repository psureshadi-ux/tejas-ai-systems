"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/20">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Tejas AI Systems</span>
                <span className="bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Tirupati
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">24/7 AI Lead & Appointment Engine</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <Link href="/solutions/healthcare" className="hover:text-cyan-400 transition">Healthcare AI</Link>
            <Link href="/solutions/real-estate" className="hover:text-cyan-400 transition">Real Estate AI</Link>
            <Link href="/demos" className="hover:text-cyan-400 transition flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>54 Tirupati Demos</span>
            </Link>
            <Link href="/pricing" className="hover:text-cyan-400 transition">Pricing</Link>
            <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 transition"
            >
              Owner Portal
            </Link>
            <Link
              href="/free-audit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
            >
              <span>Book Free AI Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 text-sm">
          <Link href="/solutions/healthcare" onClick={() => setIsOpen(false)} className="block py-2 text-slate-300">Healthcare AI</Link>
          <Link href="/solutions/real-estate" onClick={() => setIsOpen(false)} className="block py-2 text-slate-300">Real Estate AI</Link>
          <Link href="/demos" onClick={() => setIsOpen(false)} className="block py-2 text-cyan-400 font-bold">54 Tirupati Demos</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="block py-2 text-slate-300">Pricing</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 text-slate-300">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-slate-300">Contact</Link>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/admin" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs text-slate-400 border border-slate-700 rounded-lg">Owner Portal</Link>
            <Link href="/free-audit" onClick={() => setIsOpen(false)} className="block text-center py-2 text-xs font-bold text-white bg-blue-600 rounded-xl">Book Free AI Audit</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
