"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ExternalLink, MapPin } from "lucide-react";

interface SampleDemo {
  name: string;
  category: "healthcare" | "realestate";
  subType: string;
  area: string;
  doctorOrOwner: string;
  slug: string;
}

const sampleDemos: SampleDemo[] = [
  {
    name: "Sri Venkateswara Dental Hospital & Implant Centre",
    category: "healthcare",
    subType: "Dental Surgery & Implants",
    area: "Prakasam Road",
    doctorOrOwner: "Dr. K. Srinivasulu, MDS",
    slug: "sri-venkateswara-dental",
  },
  {
    name: "Amma Children Hospital & Newborn Center",
    category: "healthcare",
    subType: "Pediatrics & Vaccinations",
    area: "Bhavani Nagar",
    doctorOrOwner: "Dr. P. Madhavi, MD (Peds)",
    slug: "amma-children-hospital",
  },
  {
    name: "Bliss County Luxury Villas & Apartments",
    category: "realestate",
    subType: "Luxury Gated Community",
    area: "Karakambadi Road",
    doctorOrOwner: "Mr. N. Ramanadha Reddy",
    slug: "bliss-county-tirupati",
  },
  {
    name: "Tirumala Skin & Cosmetology Clinic",
    category: "healthcare",
    subType: "Dermatology & Laser",
    area: "AIR Bypass Road",
    doctorOrOwner: "Dr. R. Tejaswi, MD (DVL)",
    slug: "tirumala-skin-clinic",
  },
  {
    name: "Vaikunta Prime 2 & 3 BHK Living",
    category: "realestate",
    subType: "TUDA Approved Apartments",
    area: "Tiruchanur Road",
    doctorOrOwner: "Mr. V. Chandrasekhar Naidu",
    slug: "vaikunta-prime-apartments",
  },
  {
    name: "Dr. Vengala Rao Eye Hospital",
    category: "healthcare",
    subType: "Ophthalmology & Lasik",
    area: "Tataiah Gunta",
    doctorOrOwner: "Dr. Vengala Rao, MS (Ophth)",
    slug: "vengala-rao-eye",
  },
];

export function PrototypeGrid() {
  const [filter, setFilter] = useState<"all" | "healthcare" | "realestate">("all");

  const filtered = filter === "all" ? sampleDemos : sampleDemos.filter((d) => d.category === filter);

  return (
    <section className="py-20 bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tested on Tirupati Businesses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Live Working Prototypes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every card below is a live, interactive AI booking assistant customized for that local clinic or venture.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === "all" ? "bg-white text-slate-900" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              All Demos
            </button>
            <button
              onClick={() => setFilter("healthcare")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === "healthcare" ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              🏥 Healthcare
            </button>
            <button
              onClick={() => setFilter("realestate")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === "realestate" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              🏢 Real Estate
            </button>
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((demo) => (
            <div
              key={demo.slug}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${
                      demo.category === "healthcare"
                        ? "bg-blue-950 text-blue-300 border border-blue-800/60"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800/60"
                    }`}
                  >
                    {demo.category === "healthcare" ? "Clinic Assistant" : "Property Advisor"}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{demo.area}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-white leading-snug">{demo.name}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {demo.subType} • {demo.doctorOrOwner}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold">● 24/7 AI Active</span>
                <Link
                  href={`/demo/${demo.slug}`}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Test Prototype</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-4">
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
          >
            <span>View All 54 Tirupati Business Demos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
