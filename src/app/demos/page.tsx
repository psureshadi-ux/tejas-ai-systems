"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, ExternalLink, Search } from "lucide-react";

interface DemoItem {
  id: string;
  name: string;
  category: "healthcare" | "realestate";
  subType: string;
  area: string;
  doctorOrOwner: string;
  slug: string;
}

const allDemos: DemoItem[] = [
  {
    id: "1",
    name: "Sri Venkateswara Dental Hospital & Implant Centre",
    category: "healthcare",
    subType: "Dental Surgery & Implants",
    area: "Prakasam Road",
    doctorOrOwner: "Dr. K. Srinivasulu, MDS",
    slug: "sri-venkateswara-dental",
  },
  {
    id: "2",
    name: "Amma Children Hospital & Newborn Center",
    category: "healthcare",
    subType: "Pediatrics & Vaccinations",
    area: "Bhavani Nagar",
    doctorOrOwner: "Dr. P. Madhavi, MD (Peds)",
    slug: "amma-children-hospital",
  },
  {
    id: "3",
    name: "Bliss County Luxury Villas & Apartments",
    category: "realestate",
    subType: "Luxury Gated Community",
    area: "Karakambadi Road",
    doctorOrOwner: "Mr. N. Ramanadha Reddy",
    slug: "bliss-county-tirupati",
  },
  {
    id: "4",
    name: "Tirumala Skin & Cosmetology Clinic",
    category: "healthcare",
    subType: "Dermatology & Laser",
    area: "AIR Bypass Road",
    doctorOrOwner: "Dr. R. Tejaswi, MD (DVL)",
    slug: "tirumala-skin-clinic",
  },
  {
    id: "5",
    name: "Vaikunta Prime 2 & 3 BHK Living",
    category: "realestate",
    subType: "TUDA Approved Apartments",
    area: "Tiruchanur Road",
    doctorOrOwner: "Mr. V. Chandrasekhar Naidu",
    slug: "vaikunta-prime-apartments",
  },
  {
    id: "6",
    name: "Sri Sai Orthopedic & Joint Replacement Centre",
    category: "healthcare",
    subType: "Orthopedics & Spine",
    area: "Korlagunta",
    doctorOrOwner: "Dr. M. Suresh Kumar, MS (Ortho)",
    slug: "sri-sai-ortho",
  },
  {
    id: "7",
    name: "Dr. Vengala Rao Eye Hospital",
    category: "healthcare",
    subType: "Ophthalmology & Lasik",
    area: "Tataiah Gunta",
    doctorOrOwner: "Dr. Vengala Rao, MS (Ophth)",
    slug: "vengala-rao-eye",
  },
  {
    id: "8",
    name: "Sree City Green Meadows Residential Plots",
    category: "realestate",
    subType: "Approved Open Plots",
    area: "Renigunta Road",
    doctorOrOwner: "Mr. K. Bhaskar",
    slug: "sree-city-green-meadows",
  },
  {
    id: "9",
    name: "Tirumala Heights Residential Towers",
    category: "realestate",
    subType: "High-Rise Apartments",
    area: "Chandragiri Bypass",
    doctorOrOwner: "Mr. P. Vijay Kumar",
    slug: "tirumala-heights-towers",
  },
  {
    id: "10",
    name: "Clinic Nisha",
    category: "healthcare",
    subType: "General & Family Clinic",
    area: "Tirupati Central",
    doctorOrOwner: "Chief Medical Officer",
    slug: "clinic-nisha",
  },
];

export default function DemosPage() {
  const [filter, setFilter] = useState<"all" | "healthcare" | "realestate">("all");
  const [search, setSearch] = useState("");

  const filtered = allDemos.filter((d) => {
    const matchesFilter = filter === "all" || d.category === filter;
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.area.toLowerCase().includes(search.toLowerCase()) ||
      d.doctorOrOwner.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-16 md:py-24 space-y-12">
      
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Client Directory</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          54 Live Tirupati Client Prototypes
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          Every prototype below is a functional 24/7 AI Receptionist or Property Advisor. Click any card to launch the live assistant in interactive mode.
        </p>

        {/* Search & Filter Toolbar */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 pt-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search clinic, builder, or area (e.g. Prakasam Road)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                filter === "all" ? "bg-white text-slate-900" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("healthcare")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                filter === "healthcare" ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              🏥 Clinics
            </button>
            <button
              onClick={() => setFilter("realestate")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                filter === "realestate" ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              🏢 Builders
            </button>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((demo) => (
            <div
              key={demo.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/50 transition duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      demo.category === "healthcare"
                        ? "bg-blue-950 text-blue-300 border border-blue-800"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800"
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

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-semibold">● 24/7 AI Active</span>
                <Link
                  href={`/demo/${demo.slug}`}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
                >
                  <span>Launch Interactive Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
