"""
Public Demo Exporter for Tejas AI Systems
Packages all 54 interactive Tirupati prototypes into a standalone 'public_demos' folder
Ready for 1-click 100% FREE deployment on Vercel, Netlify Drop, or GitHub Pages.
"""
import shutil
import json
from pathlib import Path
from config import BASE_DIR, PROTOTYPES_DIR, AGENCY_NAME, AGENCY_TAGLINE, AGENCY_PHONE
from database import get_all_leads

PUBLIC_DIR = BASE_DIR / "public_demos"

INDEX_HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ agency_name }} - Tirupati AI Client Prototypes</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex flex-col">

    <!-- Header -->
    <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 py-4 px-6">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
                    T
                </div>
                <div>
                    <h1 class="font-extrabold text-lg text-white">{{ agency_name }}</h1>
                    <p class="text-xs text-slate-400">Tirupati 24/7 AI Lead & Appointment Engine</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <a href="https://wa.me/{{ clean_phone }}" target="_blank" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-2">
                    <span>💬 WhatsApp Us</span>
                </a>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-6 py-12 text-center">
        <span class="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Client Demonstrations
        </span>
        <h2 class="text-3xl sm:text-4xl font-black mt-4 text-white tracking-tight">
            24/7 AI Receptionists & Property Advisors
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto mt-3 text-sm">
            Interactive prototypes built specifically for premier healthcare practices and real estate developers across Tirupati.
        </p>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto mt-8">
            <input type="text" id="searchInput" onkeyup="filterDemos()" placeholder="Search by clinic, builder, or area (e.g. Prakasam Road)..." class="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
    </section>

    <!-- Grid of Demos -->
    <main class="max-w-6xl mx-auto px-6 pb-16 flex-1 w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="demoGrid">
            {% for lead in leads %}
            <div class="demo-card bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 hover:border-blue-500/60 transition hover:shadow-xl flex flex-col justify-between" data-name="{{ lead.name.lower() }}" data-area="{{ lead.area.lower() }}" data-cat="{{ lead.category }}">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold px-2.5 py-1 rounded-lg {{ 'bg-blue-900/40 text-blue-300 border border-blue-700/50' if lead.category == 'healthcare' else 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50' }}">
                            {{ '🏥 Healthcare' if lead.category == 'healthcare' else '🏢 Real Estate' }}
                        </span>
                        <span class="text-[11px] text-slate-400">📍 {{ lead.area }}</span>
                    </div>
                    <h3 class="font-bold text-base text-white leading-snug">{{ lead.name }}</h3>
                    <p class="text-xs text-slate-400 mt-1">{{ lead.sub_type }} • {{ lead.doctor_or_owner }}</p>
                </div>

                <div class="pt-5 mt-4 border-t border-slate-700/50 flex items-center justify-between">
                    <span class="text-[11px] text-emerald-400 font-semibold">● 24/7 AI Active</span>
                    <a href="./{{ lead.prototype_slug }}/index.html" class="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md">
                        <span>Launch Demo</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>&copy; 2026 {{ agency_name }} • Tirupati, Andhra Pradesh</p>
    </footer>

    <script>
        function filterDemos() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const cards = document.querySelectorAll('.demo-card');
            cards.forEach(card => {
                const name = card.getAttribute('data-name');
                const area = card.getAttribute('data-area');
                if (name.includes(query) || area.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    </script>
</body>
</html>
"""

def export():
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    
    # Copy all prototypes into public_demos/<slug>
    for p_dir in PROTOTYPES_DIR.iterdir():
        if p_dir.is_dir():
            target_slug_dir = PUBLIC_DIR / p_dir.name
            if target_slug_dir.exists():
                shutil.rmtree(target_slug_dir)
            shutil.copytree(p_dir, target_slug_dir)
            
    # Generate index.html showcase
    leads = [l for l in get_all_leads() if l.get('prototype_slug')]
    clean_phone = "".join(filter(str.isdigit, AGENCY_PHONE))
    
    # Simple template substitution
    from jinja2 import Template
    tmpl = Template(INDEX_HTML_TEMPLATE)
    rendered = tmpl.render(
        agency_name=AGENCY_NAME,
        clean_phone=clean_phone,
        leads=leads
    )
    
    with open(PUBLIC_DIR / "index.html", "w", encoding="utf-8") as f:
        f.write(rendered)
        
    # Add vercel.json for clean single-command deployment
    vercel_json = {
        "version": 2,
        "cleanUrls": True,
        "routes": [
            {"src": "/(.*)", "dest": "/$1"}
        ]
    }
    with open(PUBLIC_DIR / "vercel.json", "w", encoding="utf-8") as f:
        json.dump(vercel_json, f, indent=2)

    print(f"Export complete! All 54 prototypes packaged in: {PUBLIC_DIR}")
    print(f"- Standalone Showcase: {PUBLIC_DIR / 'index.html'}")
    print(f"- Ready to drag & drop onto Netlify Drop (https://app.netlify.com/drop) or deploy via 'npx vercel'")

if __name__ == "__main__":
    export()
