"""
Tejas AI Systems - Operations Dashboard Server
A lightweight, user-friendly Command Center for non-technical operations
Runs on Flask (http://localhost:5000)
"""
import os
import sys
from pathlib import Path
from flask import Flask, render_template_string, request, jsonify, send_from_directory, redirect, url_for

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from config import AGENCY_NAME, AGENCY_TAGLINE, AGENCY_LOCATION, AGENCY_PHONE, PROTOTYPES_DIR
from database import (
    init_db, get_all_leads, get_lead_by_id, update_lead_status, 
    get_crm_metrics, get_connection, get_setting, set_setting
)
from prototype_generator import generate_prototype_for_lead
from outreach_engine import get_outreach_messages
from explainer_kit import get_video_walkthrough_script
from lead_scraper import discover_tirupati_leads

app = Flask(__name__, static_folder=str(PROTOTYPES_DIR))

# Ensure database is up to date
init_db()

DASHBOARD_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ agency_name }} - Tirupati AI Command Center</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col">

    <!-- Top Navigation Bar -->
    <header class="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-xl shadow-md text-white">
                    T
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h1 class="font-extrabold text-base md:text-lg tracking-tight">{{ agency_name }}</h1>
                        <span class="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Tirupati Edition</span>
                    </div>
                    <p class="text-xs text-slate-400">{{ agency_tagline }}</p>
                </div>
            </div>

            <!-- Header Quick Actions -->
            <div class="flex items-center gap-3">
                <button onclick="runScraper()" id="scraperBtn" class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5">
                    <span>🔍 Discover Tirupati Leads</span>
                </button>
                <button onclick="generateAllPrototypes()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition">
                    ⚡ Build All Prototypes
                </button>
            </div>
        </div>
    </header>

    <!-- Public Domain Status Banner -->
    <div class="border-b {{ 'bg-emerald-50 border-emerald-200 text-emerald-900' if public_base_url else 'bg-amber-50 border-amber-200 text-amber-900' }} px-4 py-2.5">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2">
                {% if public_base_url %}
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span><strong>Live Public Demo Link:</strong> <a href="{{ public_base_url }}" target="_blank" class="underline font-bold text-emerald-800">{{ public_base_url }}</a> (WhatsApp pitches will open on any mobile phone!)</span>
                {% else %}
                    <span class="text-amber-600 font-bold text-sm">⚠️</span>
                    <span><strong>Local Testing Mode (localhost:5000):</strong> Doctors cannot open localhost links on their phones!</span>
                {% endif %}
            </div>
            <div class="flex items-center gap-2">
                <button onclick="openDomainModal()" class="bg-white hover:bg-slate-50 font-bold px-3 py-1.5 rounded-lg border {{ 'border-emerald-300 text-emerald-800' if public_base_url else 'border-amber-300 text-amber-800' }} shadow-sm transition">
                    {{ '⚙️ Change Public URL' if public_base_url else '🌐 Set Public Domain / Tunnel (Free)' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">

        <!-- Metrics Dashboard -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span class="text-xs font-medium text-slate-500">Tirupati Leads</span>
                <p class="text-2xl font-black text-slate-900 mt-1">{{ metrics.total_leads }}</p>
                <span class="text-[11px] text-blue-600 font-medium">📍 Verified Local</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span class="text-xs font-medium text-slate-500">Prototypes Built</span>
                <p class="text-2xl font-black text-indigo-600 mt-1">{{ metrics.prototypes_built }}</p>
                <span class="text-[11px] text-slate-400">Ready to demo</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span class="text-xs font-medium text-slate-500">Pitched / Outreach</span>
                <p class="text-2xl font-black text-amber-600 mt-1">{{ metrics.pitched }}</p>
                <span class="text-[11px] text-amber-600 font-medium">💬 WhatsApp Active</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span class="text-xs font-medium text-slate-500">Clients Closed</span>
                <p class="text-2xl font-black text-emerald-600 mt-1">{{ metrics.closed_won }}</p>
                <span class="text-[11px] text-emerald-600 font-medium">🎉 Retainer Active</span>
            </div>
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm col-span-2 md:col-span-1">
                <span class="text-xs font-medium text-slate-500">Monthly Recurring (MRR)</span>
                <p class="text-2xl font-black text-slate-900 mt-1">{{ metrics.projected_mrr }}</p>
                <span class="text-[11px] text-emerald-600 font-medium">Target: ₹50,000/mo</span>
            </div>
        </div>

        <!-- Filters & Search Toolbar -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
                <a href="/?cat=all&status={{ selected_status }}" class="px-3 py-1.5 rounded-xl text-xs font-semibold {{ 'bg-slate-900 text-white' if selected_cat == 'all' else 'bg-slate-100 text-slate-600 hover:bg-slate-200' }}">All Categories</a>
                <a href="/?cat=healthcare&status={{ selected_status }}" class="px-3 py-1.5 rounded-xl text-xs font-semibold {{ 'bg-blue-600 text-white' if selected_cat == 'healthcare' else 'bg-blue-50 text-blue-700 hover:bg-blue-100' }}">🏥 Clinics & Doctors</a>
                <a href="/?cat=realestate&status={{ selected_status }}" class="px-3 py-1.5 rounded-xl text-xs font-semibold {{ 'bg-emerald-600 text-white' if selected_cat == 'realestate' else 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' }}">🏢 Real Estate & Builders</a>
            </div>

            <!-- Search Bar -->
            <form method="GET" action="/" class="w-full md:w-72 flex items-center">
                <input type="hidden" name="cat" value="{{ selected_cat }}">
                <input type="hidden" name="status" value="{{ selected_status }}">
                <div class="relative w-full">
                    <input type="text" name="search" value="{{ search_query }}" placeholder="Search name, area, doctor..." class="w-full bg-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition">
                    <button type="submit" class="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs">🔍</button>
                </div>
            </form>
        </div>

        <!-- Leads Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                            <th class="py-3.5 px-4">Business / Practice</th>
                            <th class="py-3.5 px-3">Location</th>
                            <th class="py-3.5 px-3">Contact</th>
                            <th class="py-3.5 px-3">Status</th>
                            <th class="py-3.5 px-4 text-right">Instant Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        {% for lead in leads %}
                        <tr class="hover:bg-slate-50/80 transition">
                            <td class="py-3.5 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 {{ 'bg-blue-100 text-blue-700' if lead.category == 'healthcare' else 'bg-emerald-100 text-emerald-700' }}">
                                        {{ '🏥' if lead.category == 'healthcare' else '🏢' }}
                                    </div>
                                    <div>
                                        <p class="font-bold text-slate-900 text-sm leading-snug">{{ lead.name }}</p>
                                        <p class="text-slate-500 text-[11px]">{{ lead.sub_type }} • {{ lead.doctor_or_owner }}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="py-3.5 px-3">
                                <span class="inline-block bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded text-[11px]">
                                    📍 {{ lead.area }}
                                </span>
                            </td>
                            <td class="py-3.5 px-3">
                                <p class="font-medium text-slate-800">{{ lead.phone }}</p>
                                <span class="text-[10px] text-emerald-600 font-semibold">WhatsApp Ready</span>
                            </td>
                            <td class="py-3.5 px-3">
                                <select onchange="changeStatus({{ lead.id }}, this.value)" class="text-xs font-medium rounded-lg border border-slate-200 px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option value="Discovered" {{ 'selected' if lead.status == 'Discovered' }}>Discovered</option>
                                    <option value="Prototype_Ready" {{ 'selected' if lead.status == 'Prototype_Ready' }}>Prototype Ready</option>
                                    <option value="Pitched" {{ 'selected' if lead.status == 'Pitched' }}>Pitched (Sent)</option>
                                    <option value="Meeting_Booked" {{ 'selected' if lead.status == 'Meeting_Booked' }}>Meeting Booked</option>
                                    <option value="Closed_Won" {{ 'selected' if lead.status == 'Closed_Won' }}>Closed (Won 🎉)</option>
                                    <option value="Closed_Lost" {{ 'selected' if lead.status == 'Closed_Lost' }}>Closed (Lost)</option>
                                </select>
                            </td>
                            <td class="py-3.5 px-4 text-right">
                                <div class="flex items-center justify-end gap-1.5">
                                    <!-- View or Generate Prototype -->
                                    {% if lead.prototype_slug %}
                                        <a href="/demo/{{ lead.prototype_slug }}" target="_blank" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-2.5 py-1.5 rounded-lg font-semibold text-xs transition inline-flex items-center gap-1">
                                            <span>👁️ Demo</span>
                                        </a>
                                    {% else %}
                                        <button onclick="generateSinglePrototype({{ lead.id }})" class="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1.5 rounded-lg font-bold text-xs shadow-sm transition">
                                            ⚡ Build Bot
                                        </button>
                                    {% endif %}

                                    <!-- WhatsApp Outreach Modal Trigger -->
                                    <button onclick="openOutreachModal({{ lead.id }})" class="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1.5 rounded-lg font-bold text-xs shadow-sm transition inline-flex items-center gap-1">
                                        <span>💬 Pitch</span>
                                    </button>

                                    <!-- Video Script Modal Trigger -->
                                    <button onclick="openScriptModal({{ lead.id }})" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1.5 rounded-lg text-xs transition" title="60-Second Video Script">
                                        📹
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>

    </main>

    <!-- OUTREACH MODAL -->
    <div id="outreachModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                    <h3 class="font-extrabold text-base text-slate-900" id="modalLeadName">WhatsApp Pitch & Click-to-Chat</h3>
                    <p class="text-xs text-slate-500">Personalized copy ready to send</p>
                </div>
                <button onclick="closeOutreachModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>

            <!-- Tabs: Day 1, Day 3, Day 7 -->
            <div class="flex items-center gap-2 mb-3">
                <button onclick="switchOutreachTab('day_1')" id="tab_day_1" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white">Day 1: Initial Pitch</button>
                <button onclick="switchOutreachTab('day_3')" id="tab_day_3" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">Day 3: Follow Up</button>
                <button onclick="switchOutreachTab('day_7')" id="tab_day_7" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">Day 7: Break-up</button>
            </div>

            <!-- Message Preview -->
            <div class="flex-1 overflow-y-auto mb-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs leading-relaxed font-mono whitespace-pre-wrap text-slate-800" id="outreachText">
                Loading pitch...
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button onclick="copyOutreachText()" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-semibold text-xs transition">
                    📋 Copy Text
                </button>
                <a id="modalWhatsAppBtn" href="#" target="_blank" onclick="markAsPitched()" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-2">
                    <span>🚀 Open WhatsApp & Send</span>
                </a>
            </div>
        </div>
    </div>

    <!-- VIDEO SCRIPT MODAL -->
    <div id="scriptModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div>
                    <h3 class="font-extrabold text-base text-slate-900">60-Second Video Walkthrough Script</h3>
                    <p class="text-xs text-slate-500">Record on Loom while showing the prototype</p>
                </div>
                <button onclick="closeScriptModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>
            <div class="flex items-center gap-2 mb-3">
                <button onclick="switchLangTab('en')" id="tab_lang_en" class="text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white">English Script</button>
                <button onclick="switchLangTab('te')" id="tab_lang_te" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">Telugu / Tanglish Script</button>
            </div>
            <div class="flex-1 overflow-y-auto mb-4 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs leading-relaxed font-mono whitespace-pre-wrap text-slate-800" id="scriptContent">
                Loading script...
            </div>
            <button onclick="closeScriptModal()" class="w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-bold">Close</button>
    <!-- DOMAIN SETTINGS MODAL -->
    <div id="domainModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                    <h3 class="font-extrabold text-base text-slate-900">Set Public Web Address for WhatsApp Demos</h3>
                    <p class="text-xs text-slate-500">So doctors & builders can test on their smartphones</p>
                </div>
                <button onclick="closeDomainModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold">&times;</button>
            </div>

            <div class="space-y-4 text-xs text-slate-700">
                <p>Enter the public web domain or tunnel link where your demos are hosted:</p>
                <div>
                    <label class="block font-bold text-slate-800 mb-1">Public Base URL</label>
                    <input id="publicUrlInput" type="url" value="{{ public_base_url }}" placeholder="e.g. https://tejasai.vercel.app or https://xxxx.pinggy.link" class="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white">
                </div>

                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
                    <span class="font-bold text-slate-800 block">💡 3 Free Ways to Get a Public Link:</span>
                    <p><strong>1. Instant Tunnel (0 seconds):</strong> Double-click <code>start_public_tunnel.bat</code> in your project folder. It gives you a public link instantly!</p>
                    <p><strong>2. Free 24/7 Hosting (Vercel):</strong> Run <code>py export_public_demos.py</code>, then upload the <code>public_demos</code> folder to Vercel/Netlify for a permanent free URL like <code>https://tejasai.vercel.app</code>.</p>
                    <p><strong>3. Custom Domain (₹400/yr):</strong> Point <code>preview.tejasai.in</code> to your hosting.</p>
                </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-5">
                <button onclick="closeDomainModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs">Cancel</button>
                <button onclick="savePublicDomain()" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition">Save & Apply</button>
            </div>
        </div>
    </div>

    <script>
        let currentLeadId = null;
        let currentOutreachData = null;
        let currentScriptData = null;
        let currentTab = 'day_1';

        function openDomainModal() {
            document.getElementById('domainModal').classList.remove('hidden');
        }

        function closeDomainModal() {
            document.getElementById('domainModal').classList.add('hidden');
        }

        async function savePublicDomain() {
            const url = document.getElementById('publicUrlInput').value.trim();
            try {
                const res = await fetch('/api/save-public-url', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({url: url})
                });
                const data = await res.json();
                if (data.success) {
                    alert("Public domain saved successfully! All WhatsApp links will now use this URL.");
                    window.location.reload();
                } else {
                    alert("Failed to save domain");
                }
            } catch (err) {
                alert("Network error: " + err);
            }
        }

        async function changeStatus(leadId, status) {
            try {
                const res = await fetch('/api/update-status', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({lead_id: leadId, status: status})
                });
                const data = await res.json();
                if (!data.success) alert("Failed to update status");
            } catch (err) {
                console.error(err);
            }
        }

        async function generateSinglePrototype(leadId) {
            const btn = event.target;
            btn.innerText = "⏳ Building...";
            btn.disabled = true;
            try {
                const res = await fetch(`/api/generate-prototype/${leadId}`, {method: 'POST'});
                const data = await res.json();
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("Error building prototype: " + data.error);
                }
            } catch (err) {
                alert("Network error");
            }
        }

        async function generateAllPrototypes() {
            if (!confirm("Generate prototypes for all pending leads?")) return;
            const res = await fetch('/api/generate-all-prototypes', {method: 'POST'});
            const data = await res.json();
            alert(`Generated ${data.generated} new prototypes!`);
            window.location.reload();
        }

        async function runScraper() {
            const btn = document.getElementById('scraperBtn');
            btn.innerHTML = "<span>⏳ Scanning Tirupati...</span>";
            btn.disabled = true;
            try {
                const res = await fetch('/api/run-scraper', {method: 'POST'});
                const data = await res.json();
                alert(`Discovery complete! Added ${data.count} new Tirupati leads.`);
                window.location.reload();
            } catch (err) {
                alert("Scraper error: " + err);
                btn.innerHTML = "<span>🔍 Discover Tirupati Leads</span>";
                btn.disabled = false;
            }
        }

        async function openOutreachModal(leadId) {
            currentLeadId = leadId;
            document.getElementById('outreachModal').classList.remove('hidden');
            document.getElementById('outreachText').innerText = "Generating personalized pitch...";
            
            const res = await fetch(`/api/outreach/${leadId}`);
            currentOutreachData = await res.json();
            document.getElementById('modalLeadName').innerText = currentOutreachData.lead_name;
            switchOutreachTab('day_1');
        }

        function switchOutreachTab(tab) {
            currentTab = tab;
            ['day_1', 'day_3', 'day_7'].forEach(t => {
                const el = document.getElementById('tab_' + t);
                if (t === tab) {
                    el.className = "text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white";
                } else {
                    el.className = "text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600";
                }
            });

            if (currentOutreachData) {
                const item = currentOutreachData[tab];
                document.getElementById('outreachText').innerText = item.text;
                const waBtn = document.getElementById('modalWhatsAppBtn');
                if (item.wa_url) {
                    waBtn.href = item.wa_url;
                    waBtn.classList.remove('opacity-50', 'pointer-events-none');
                } else {
                    waBtn.href = "#";
                    waBtn.classList.add('opacity-50', 'pointer-events-none');
                }
            }
        }

        function markAsPitched() {
            if (currentLeadId) {
                changeStatus(currentLeadId, 'Pitched');
            }
        }

        function copyOutreachText() {
            const text = document.getElementById('outreachText').innerText;
            navigator.clipboard.writeText(text);
            alert("Pitch copied to clipboard!");
        }

        function closeOutreachModal() {
            document.getElementById('outreachModal').classList.add('hidden');
        }

        async function openScriptModal(leadId) {
            document.getElementById('scriptModal').classList.remove('hidden');
            document.getElementById('scriptContent').innerText = "Loading scripts...";
            const res = await fetch(`/api/video-script/${leadId}`);
            currentScriptData = await res.json();
            switchLangTab('en');
        }

        function switchLangTab(lang) {
            const btnEn = document.getElementById('tab_lang_en');
            const btnTe = document.getElementById('tab_lang_te');
            if (lang === 'en') {
                btnEn.className = "text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white";
                btnTe.className = "text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600";
                document.getElementById('scriptContent').innerText = currentScriptData.english;
            } else {
                btnTe.className = "text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 text-white";
                btnEn.className = "text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600";
                document.getElementById('scriptContent').innerText = currentScriptData.telugu;
            }
        }

        function closeScriptModal() {
            document.getElementById('scriptModal').classList.add('hidden');
        }
    </script>
</body>
</html>
"""

@app.route('/')
def dashboard():
    cat = request.args.get('cat', 'all')
    status = request.args.get('status', 'all')
    search = request.args.get('search', '')
    
    leads = get_all_leads(category=cat, status=status, search=search)
    metrics = get_crm_metrics()
    public_base_url = get_setting('public_base_url', '')
    
    return render_template_string(
        DASHBOARD_HTML,
        agency_name=AGENCY_NAME,
        agency_tagline=AGENCY_TAGLINE,
        leads=leads,
        metrics=metrics,
        selected_cat=cat,
        selected_status=status,
        search_query=search,
        public_base_url=public_base_url
    )

@app.route('/demo/<slug>')
@app.route('/demo/<slug>/')
def view_prototype(slug):
    slug_dir = PROTOTYPES_DIR / slug
    if (slug_dir / "index.html").exists():
        return send_from_directory(str(slug_dir), "index.html")
    return f"Prototype '{slug}' not found. Please click 'Build Bot' on the dashboard first.", 404

@app.route('/api/save-public-url', methods=['POST'])
def api_save_public_url():
    data = request.json or {}
    url = data.get('url', '').strip()
    set_setting('public_base_url', url)
    return jsonify({"success": True, "url": url})

@app.route('/api/update-status', methods=['POST'])
def api_update_status():
    data = request.json or {}
    lead_id = data.get('lead_id')
    status = data.get('status')
    if lead_id and status:
        update_lead_status(lead_id, status)
        return jsonify({"success": True})
    return jsonify({"success": False, "error": "Invalid params"}), 400

@app.route('/api/generate-prototype/<int:lead_id>', methods=['POST'])
def api_generate_prototype(lead_id):
    slug = generate_prototype_for_lead(lead_id)
    if slug:
        return jsonify({"success": True, "slug": slug})
    return jsonify({"success": False, "error": "Lead not found"}), 404

@app.route('/api/generate-all-prototypes', methods=['POST'])
def api_generate_all():
    leads = get_all_leads()
    count = 0
    for l in leads:
        if not l.get('prototype_slug'):
            generate_prototype_for_lead(l['id'])
            count += 1
    return jsonify({"success": True, "generated": count})

@app.route('/api/run-scraper', methods=['POST'])
def api_run_scraper():
    new_count = discover_tirupati_leads()
    return jsonify({"success": True, "count": new_count})

@app.route('/api/outreach/<int:lead_id>')
def api_outreach(lead_id):
    lead = get_lead_by_id(lead_id)
    if not lead:
        return jsonify({"error": "Lead not found"}), 404
    
    # If prototype doesn't exist yet, generate it on the fly!
    if not lead.get('prototype_slug'):
        generate_prototype_for_lead(lead_id)
        lead = get_lead_by_id(lead_id)
        
    public_url = get_setting('public_base_url', '').strip()
    if public_url:
        base_demo = public_url.rstrip('/')
        if not base_demo.endswith('/demo'):
            base_demo += '/demo'
    else:
        base_demo = request.host_url.rstrip('/') + '/demo'

    outreach = get_outreach_messages(lead, demo_url_base=base_demo)
    outreach['lead_name'] = lead['name']
    return jsonify(outreach)

@app.route('/api/video-script/<int:lead_id>')
def api_video_script(lead_id):
    lead = get_lead_by_id(lead_id)
    if not lead:
        return jsonify({"error": "Lead not found"}), 404
    script_data = get_video_walkthrough_script(lead)
    return jsonify(script_data)

if __name__ == '__main__':
    print(f"Starting {AGENCY_NAME} Command Center on http://127.0.0.1:5000 ...")
    app.run(host='127.0.0.1', port=5000, debug=False)
