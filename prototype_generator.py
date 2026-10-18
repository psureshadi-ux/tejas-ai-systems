"""
Dynamic AI Prototype Generator for Tejas AI Systems
Generates customized, fully interactive 24/7 AI Receptionist & Appointment Specialist
web apps for any Clinic or Real Estate Builder in Tirupati.
"""
import re
import json
from pathlib import Path
from config import PROTOTYPES_DIR, AGENCY_NAME, AGENCY_PHONE
from database import get_lead_by_id, save_prototype_data

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def generate_healthcare_prototype(lead):
    slug = lead.get('prototype_slug') or slugify(lead['name'])
    output_dir = PROTOTYPES_DIR / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    
    doctor = lead.get('doctor_or_owner') or "Chief Medical Officer"
    clinic_name = lead['name']
    area = lead.get('area') or "Tirupati"
    phone = lead.get('phone') or "+91 877 225 1199"
    whatsapp = lead.get('whatsapp') or "918772251199"
    
    primary_color = "#0284c7" # Medical Sky Blue
    accent_color = "#0f172a"
    
    # Template HTML with rich interactive AI chat and booking logic
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{clinic_name} - 24/7 AI Patient Care & Appointment Booking</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {{ font-family: 'Plus Jakarta Sans', sans-serif; }}
        .chat-bubble-patient {{ background-color: #f1f5f9; color: #1e293b; border-radius: 18px 18px 18px 4px; }}
        .chat-bubble-ai {{ background-color: #0284c7; color: #ffffff; border-radius: 18px 18px 4px 18px; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">

    <!-- TEJAS AI DEMO CONTROL BANNER FOR THE DOCTOR -->
    <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-3 shadow-md sticky top-0 z-50 border-b border-blue-500/30">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center justify-center bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Live Prototype</span>
                <p class="text-xs md:text-sm font-medium">Built for <strong>{clinic_name}</strong> by <span class="text-blue-300 font-bold">{AGENCY_NAME}</span></p>
            </div>
            <!-- Interactive Simulator Buttons -->
            <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs text-blue-200 hidden lg:inline">Doctor Simulation:</span>
                <button onclick="simulateQuestion('What are Dr. {doctor}\\'s consultation fees and OPD timings?')" class="bg-blue-800/80 hover:bg-blue-700 text-white text-xs px-2.5 py-1.5 rounded-lg border border-blue-600/50 transition">
                    ⚡ Test FAQ
                </button>
                <button onclick="simulateQuestion('I want to book an appointment for tomorrow evening.')" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1.5 rounded-lg font-semibold shadow-sm transition">
                    📅 Test Booking
                </button>
                <button onclick="showDoctorWhatsAppAlert()" class="bg-slate-800 hover:bg-slate-700 text-blue-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-600 transition">
                    📱 View Doctor Notification
                </button>
            </div>
        </div>
    </div>

    <!-- MAIN CLINIC HERO HEADER -->
    <header class="bg-white border-b border-slate-200 py-4 px-4 shadow-sm">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-inner">
                    🏥
                </div>
                <div>
                    <h1 class="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">{clinic_name}</h1>
                    <p class="text-xs text-slate-500 flex items-center gap-1">
                        <span>📍 {area}, Tirupati</span> • <span class="text-emerald-600 font-medium font-semibold">● 24/7 AI Reception Active</span>
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <a href="tel:{phone}" class="text-xs md:text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 border border-slate-200 rounded-lg">
                    📞 {phone}
                </a>
                <button onclick="focusChat()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5">
                    <span>Book Appointment</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- CONTENT & INTERACTIVE CHAT ENGINE -->
    <main class="max-w-6xl mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        <!-- Left: Clinic Overview & Credentials -->
        <div class="lg:col-span-5 space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                        👨‍⚕️
                    </div>
                    <div>
                        <h2 class="font-bold text-slate-900 text-base">{doctor}</h2>
                        <p class="text-xs text-slate-500">Senior Consultant & Specialist</p>
                    </div>
                </div>
                <div class="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600">
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Location:</span>
                        <span class="font-medium text-slate-800">{area}, Tirupati</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Morning OPD:</span>
                        <span class="font-medium text-slate-800">10:00 AM – 01:30 PM</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Evening OPD:</span>
                        <span class="font-medium text-slate-800">05:30 PM – 09:00 PM</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Sundays:</span>
                        <span class="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">10:00 AM – 01:00 PM (Emergency on call)</span>
                    </div>
                </div>
            </div>

            <!-- Value Proposition for the Doctor -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-slate-800">
                <div class="flex items-center gap-2 mb-2 text-blue-800 font-bold text-sm">
                    <span>💡</span> Why Patients Love This AI
                </div>
                <ul class="text-xs space-y-2 text-slate-600">
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-500 font-bold">✓</span>
                        <span><strong>Zero Missed Appointments:</strong> Patients booking at 10 PM get an instant slot confirmation.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-500 font-bold">✓</span>
                        <span><strong>Frees Front Desk:</strong> Automatically answers common questions about fees, timings, and prep.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-500 font-bold">✓</span>
                        <span><strong>Instant WhatsApp Sync:</strong> Doctor and patient both receive immediate WhatsApp confirmation.</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Right: The 24/7 AI Assistant & Booking Interface -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[580px]">
            <!-- Chat Header -->
            <div class="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
                            🩺
                        </div>
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm leading-tight">{clinic_name} AI Receptionist</h3>
                        <p class="text-[11px] text-emerald-400 font-medium">Online | Instant Appointments & FAQs</p>
                    </div>
                </div>
                <span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Telugu & English</span>
            </div>

            <!-- Message Area -->
            <div id="chatMessages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs md:text-sm">
                <!-- Greeting -->
                <div class="flex items-start gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                    <div class="chat-bubble-ai p-3.5 max-w-[85%] shadow-sm leading-relaxed">
                        Namaste! 🙏 Welcome to <strong>{clinic_name}</strong>, {area}, Tirupati.
                        <br><br>
                        I am your 24/7 AI Assistant. I can help you:
                        <ul class="list-disc ml-4 mt-1.5 space-y-1 text-blue-100">
                            <li>Book a consultation slot with {doctor}</li>
                            <li>Check OPD timings and fees</li>
                            <li>Get emergency contact details & directions</li>
                        </ul>
                        <br>
                        How can I assist you today?
                    </div>
                </div>
            </div>

            <!-- Quick Action Pills -->
            <div class="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
                <button onclick="simulateQuestion('Book an appointment for today')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    📅 Book Appointment
                </button>
                <button onclick="simulateQuestion('What are your OPD timings?')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    ⏰ Timings & Fees
                </button>
                <button onclick="simulateQuestion('Where are you located in Tirupati?')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    📍 Clinic Location
                </button>
            </div>

            <!-- Input Box -->
            <form onsubmit="handleChatSubmit(event)" class="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input id="chatInput" type="text" placeholder="Type your inquiry or request an appointment..." class="flex-1 text-xs md:text-sm bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm shadow-sm transition flex items-center gap-1">
                    <span>Send</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
            </form>
        </div>
    </main>

    <!-- DOCTOR NOTIFICATION MODAL -->
    <div id="doctorAlertModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">📲</span>
                    <h4 class="font-bold text-slate-900 text-sm">Instant WhatsApp Alert Sent to Doctor</h4>
                </div>
                <button onclick="closeDoctorAlertModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
            </div>
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs font-mono text-emerald-900 space-y-2 mb-4">
                <div class="text-[11px] text-emerald-700 font-bold uppercase tracking-wider mb-1">WhatsApp Message Preview:</div>
                <p>🔔 <strong>NEW PATIENT APPOINTMENT BOOKED</strong></p>
                <p>• <strong>Patient:</strong> S. Venkat Reddy</p>
                <p>• <strong>Phone:</strong> +91 94401 XXXXX</p>
                <p>• <strong>Slot:</strong> Tomorrow, 06:30 PM (Evening OPD)</p>
                <p>• <strong>Reason:</strong> General Consultation / Checkup</p>
                <p>• <strong>Clinic:</strong> {clinic_name}</p>
                <p class="text-[10px] text-slate-500 pt-1 border-t border-emerald-200">Delivered via Tejas AI Engine ⚡</p>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Whenever a patient books using the AI Assistant, this alert lands immediately on your front-desk or personal WhatsApp. Zero manual data entry.
            </p>
            <button onclick="closeDoctorAlertModal()" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition">
                Got It
            </button>
        </div>
    </div>

    <!-- SCRIPT FOR SIMULATION & LOGIC -->
    <script>
        const clinicName = "{clinic_name}";
        const doctorName = "{doctor}";
        const areaName = "{area}";

        function focusChat() {{
            document.getElementById('chatInput').focus();
        }}

        function showDoctorWhatsAppAlert() {{
            document.getElementById('doctorAlertModal').classList.remove('hidden');
        }}

        function closeDoctorAlertModal() {{
            document.getElementById('doctorAlertModal').classList.add('hidden');
        }}

        function appendMessage(sender, text, isAi) {{
            const container = document.getElementById('chatMessages');
            const row = document.createElement('div');
            row.className = isAi ? 'flex items-start gap-2.5' : 'flex items-end justify-end gap-2.5';
            
            if (isAi) {{
                row.innerHTML = `
                    <div class="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                    <div class="chat-bubble-ai p-3.5 max-w-[85%] shadow-sm leading-relaxed">${{text}}</div>
                `;
            }} else {{
                row.innerHTML = `
                    <div class="chat-bubble-patient p-3.5 max-w-[85%] shadow-sm leading-relaxed">${{text}}</div>
                    <div class="w-7 h-7 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-bold shrink-0">You</div>
                `;
            }}
            container.appendChild(row);
            container.scrollTop = container.scrollHeight;
        }}

        function simulateQuestion(q) {{
            appendMessage('patient', q, false);
            setTimeout(() => {{
                if (q.toLowerCase().includes('timings') || q.toLowerCase().includes('fees')) {{
                    appendMessage('ai', `Dr. ${{doctorName}} is available at ${{clinicName}}:<br>• <strong>Morning:</strong> 10:00 AM – 01:30 PM<br>• <strong>Evening:</strong> 05:30 PM – 09:00 PM<br><br>The standard consultation fee is <strong>₹300 - ₹500</strong>. Would you like me to reserve a token/slot for you?`, true);
                }} else if (q.toLowerCase().includes('appointment') || q.toLowerCase().includes('book')) {{
                    appendMessage('ai', `Certainly! We have open slots tomorrow evening at <strong>06:00 PM</strong>, <strong>06:30 PM</strong>, and <strong>07:15 PM</strong>.<br><br>Please provide your <strong>Name and Contact Number</strong> to confirm your slot with Dr. ${{doctorName}}.`, true);
                }} else if (q.toLowerCase().includes('located') || q.toLowerCase().includes('location')) {{
                    appendMessage('ai', `${{clinicName}} is conveniently located at <strong>${{areaName}}, Tirupati</strong> (landmark: beside main road).<br><br>You can click here for instant Google Maps navigation: <a href="https://maps.google.com/?q=${{encodeURIComponent(clinicName + ' ' + areaName + ' Tirupati')}}" target="_blank" class="underline font-bold text-white">Open in Google Maps</a>.`, true);
                }} else {{
                    appendMessage('ai', `Thank you for asking! Dr. ${{doctorName}} specializes in this. Please let me know your preferred day and time for a consultation so our team can attend to you promptly.`, true);
                }}
            }}, 600);
        }}

        function handleChatSubmit(e) {{
            e.preventDefault();
            const input = document.getElementById('chatInput');
            const val = input.value.trim();
            if (!val) return;
            appendMessage('patient', val, false);
            input.value = '';
            setTimeout(() => {{
                if (/\\d{{10}}/.test(val) || val.toLowerCase().includes('reddy') || val.toLowerCase().includes('kumar')) {{
                    appendMessage('ai', `✅ <strong>Appointment Slot Reserved!</strong><br><br>Thank you! We have logged your request. A confirmation SMS/WhatsApp with your token has been dispatched. See you at ${{clinicName}}!<br><br><button onclick="showDoctorWhatsAppAlert()" class="mt-2 bg-white text-blue-900 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm">View Doctor WhatsApp Notification 📱</button>`, true);
                }} else {{
                    simulateQuestion(val);
                }}
            }}, 700);
        }}
    </script>
</body>
</html>
"""
    with open(output_dir / "index.html", "w", encoding="utf-8") as f:
        f.write(html_content)
        
    save_prototype_data(
        lead_id=lead['id'],
        slug=slug,
        business_name=clinic_name,
        category="healthcare",
        primary_color=primary_color,
        headline=f"24/7 AI Receptionist for {clinic_name}",
        subheadline=f"Zero missed appointments for Dr. {doctor}",
        specialties=["Appointment Booking", "OPD Timings", "Emergency FAQs"],
        faqs=[{"q": "Consultation Fee", "a": "₹300 - ₹500"}, {"q": "Timings", "a": "10 AM - 1:30 PM & 5:30 PM - 9 PM"}],
        working_hours="10:00 AM - 09:00 PM",
        whatsapp_num=whatsapp
    )
    return slug

def generate_realestate_prototype(lead):
    slug = lead.get('prototype_slug') or slugify(lead['name'])
    output_dir = PROTOTYPES_DIR / slug
    output_dir.mkdir(parents=True, exist_ok=True)
    
    owner = lead.get('doctor_or_owner') or "Managing Director"
    builder_name = lead['name']
    area = lead.get('area') or "Tirupati"
    phone = lead.get('phone') or "+91 984 801 2345"
    whatsapp = lead.get('whatsapp') or "919848012345"
    
    primary_color = "#059669" # Emerald / Wealth Green
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{builder_name} - 24/7 AI Property Advisor & Site Visit Scheduler</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {{ font-family: 'Plus Jakarta Sans', sans-serif; }}
        .chat-bubble-buyer {{ background-color: #f1f5f9; color: #1e293b; border-radius: 18px 18px 18px 4px; }}
        .chat-bubble-ai {{ background-color: #059669; color: #ffffff; border-radius: 18px 18px 4px 18px; }}
    </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">

    <!-- DEMO CONTROL BANNER FOR THE BUILDER -->
    <div class="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white px-4 py-3 shadow-md sticky top-0 z-50 border-b border-emerald-500/30">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center justify-center bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Live Prototype</span>
                <p class="text-xs md:text-sm font-medium">Built for <strong>{builder_name}</strong> by <span class="text-emerald-300 font-bold">{AGENCY_NAME}</span></p>
            </div>
            <!-- Interactive Simulator Buttons -->
            <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs text-emerald-200 hidden lg:inline">Builder Test Suite:</span>
                <button onclick="simulateQuestion('What are the prices for 2BHK and 3BHK flats?')" class="bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs px-2.5 py-1.5 rounded-lg border border-emerald-600/50 transition">
                    💰 Test Pricing Inquiry
                </button>
                <button onclick="simulateQuestion('I want to schedule a free site visit this Saturday.')" class="bg-amber-600 hover:bg-amber-500 text-white text-xs px-2.5 py-1.5 rounded-lg font-semibold shadow-sm transition">
                    🚗 Test Site Visit Booking
                </button>
                <button onclick="showBuilderWhatsAppAlert()" class="bg-slate-800 hover:bg-slate-700 text-emerald-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-600 transition">
                    📱 View Agent WhatsApp Lead Alert
                </button>
            </div>
        </div>
    </div>

    <!-- MAIN BUILDER HEADER -->
    <header class="bg-white border-b border-slate-200 py-4 px-4 shadow-sm">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-2xl shadow-inner">
                    🏢
                </div>
                <div>
                    <h1 class="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">{builder_name}</h1>
                    <p class="text-xs text-slate-500 flex items-center gap-1">
                        <span>📍 {area}, Tirupati</span> • <span class="text-emerald-600 font-semibold">● 100% TUDA Approved & Bank Loan Approved</span>
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <a href="tel:{phone}" class="text-xs md:text-sm font-medium text-slate-600 hover:text-emerald-700 px-3 py-2 border border-slate-200 rounded-lg">
                    📞 {phone}
                </a>
                <button onclick="focusChat()" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5">
                    <span>Book VIP Site Visit</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- CONTENT & INTERACTIVE PROPERTY ADVISOR -->
    <main class="max-w-6xl mx-auto px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        <!-- Left: Project Highlights -->
        <div class="lg:col-span-5 space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl">
                        🏗️
                    </div>
                    <div>
                        <h2 class="font-bold text-slate-900 text-base">{builder_name}</h2>
                        <p class="text-xs text-slate-500">Premium Residential & Commercial Ventures</p>
                    </div>
                </div>
                <div class="border-t border-slate-100 pt-3 space-y-2 text-xs text-slate-600">
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Location:</span>
                        <span class="font-medium text-slate-800">{area}, Tirupati</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Approvals:</span>
                        <span class="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">TUDA Approved & RERA Registered</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Units:</span>
                        <span class="font-medium text-slate-800">2BHK (1150-1300 sft) | 3BHK (1600-1950 sft)</span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span class="text-slate-400">Bank Loans:</span>
                        <span class="font-medium text-slate-800">SBI, HDFC, ICICI (Up to 80%)</span>
                    </div>
                </div>
            </div>

            <!-- Value Proposition for Builder -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 text-slate-800">
                <div class="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-sm">
                    <span>🚀</span> How This AI Doubles Your Site Visits
                </div>
                <ul class="text-xs space-y-2 text-slate-600">
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-600 font-bold">✓</span>
                        <span><strong>Instant Brochure Delivery:</strong> High-intent buyers get floor plans in 3 seconds on WhatsApp.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-600 font-bold">✓</span>
                        <span><strong>Pre-Qualified Leads:</strong> AI asks buyer's budget and readiness before booking the site visit.</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <span class="text-emerald-600 font-bold">✓</span>
                        <span><strong>Captures NRI & Pilgrim Buyers:</strong> Engaging buyers in different time zones while your sales office is closed.</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Right: The 24/7 AI Property Advisor & Lead Engine -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[580px]">
            <!-- Chat Header -->
            <div class="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-lg text-white">
                            🤖
                        </div>
                        <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm leading-tight">{builder_name} AI Property Advisor</h3>
                        <p class="text-[11px] text-emerald-400 font-medium">Online | Instant Floor Plans & Site Visits</p>
                    </div>
                </div>
                <span class="text-[11px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Telugu & English</span>
            </div>

            <!-- Messages Area -->
            <div id="chatMessages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs md:text-sm">
                <!-- Greeting -->
                <div class="flex items-start gap-2.5">
                    <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                    <div class="chat-bubble-ai p-3.5 max-w-[85%] shadow-sm leading-relaxed">
                        Namaste! 🙏 Welcome to <strong>{builder_name}</strong> in {area}, Tirupati.
                        <br><br>
                        I can instantly assist you with:
                        <ul class="list-disc ml-4 mt-1.5 space-y-1 text-emerald-100">
                            <li>2BHK & 3BHK Pricing and Floor Plans</li>
                            <li>TUDA Approvals, Amenities & Bank Loan Details</li>
                            <li>Booking a <strong>Free VIP Site Visit</strong> with pickup</li>
                        </ul>
                        <br>
                        What type of property or budget are you exploring in Tirupati?
                    </div>
                </div>
            </div>

            <!-- Quick Action Pills -->
            <div class="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
                <button onclick="simulateQuestion('Show me 2BHK and 3BHK floor plans')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    📐 Floor Plans & Sizes
                </button>
                <button onclick="simulateQuestion('What is the starting price?')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    💵 Starting Price
                </button>
                <button onclick="simulateQuestion('Schedule a Free Site Visit')" class="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition">
                    🚗 Free Site Visit
                </button>
            </div>

            <!-- Input Box -->
            <form onsubmit="handleChatSubmit(event)" class="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input id="chatInput" type="text" placeholder="Ask about pricing, floor plans, or site visits..." class="flex-1 text-xs md:text-sm bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition">
                <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm shadow-sm transition flex items-center gap-1">
                    <span>Send</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
            </form>
        </div>
    </main>

    <!-- BUILDER NOTIFICATION MODAL -->
    <div id="builderAlertModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">📲</span>
                    <h4 class="font-bold text-slate-900 text-sm">Instant WhatsApp Lead Alert to Sales Team</h4>
                </div>
                <button onclick="closeBuilderAlertModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
            </div>
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs font-mono text-emerald-900 space-y-2 mb-4">
                <div class="text-[11px] text-emerald-700 font-bold uppercase tracking-wider mb-1">WhatsApp Lead Notification:</div>
                <p>🚀 <strong>HOT PROPERTY INQUIRY / SITE VISIT</strong></p>
                <p>• <strong>Buyer:</strong> K. Prasad Rao</p>
                <p>• <strong>Phone:</strong> +91 98490 XXXXX</p>
                <p>• <strong>Interest:</strong> 3BHK East Facing (Budget: ₹70L - ₹85L)</p>
                <p>• <strong>Site Visit:</strong> This Sunday, 11:00 AM</p>
                <p>• <strong>Project:</strong> {builder_name}, {area}</p>
                <p class="text-[10px] text-slate-500 pt-1 border-t border-emerald-200">Captured 24/7 by Tejas AI Engine ⚡</p>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
                Your sales manager receives this hot lead within 5 seconds on WhatsApp with phone number, budget, and exact visit timing.
            </p>
            <button onclick="closeBuilderAlertModal()" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition">
                Got It
            </button>
        </div>
    </div>

    <!-- SCRIPT FOR SIMULATION -->
    <script>
        const builderName = "{builder_name}";
        const areaName = "{area}";

        function focusChat() {{
            document.getElementById('chatInput').focus();
        }}

        function showBuilderWhatsAppAlert() {{
            document.getElementById('builderAlertModal').classList.remove('hidden');
        }}

        function closeBuilderAlertModal() {{
            document.getElementById('builderAlertModal').classList.add('hidden');
        }}

        function appendMessage(sender, text, isAi) {{
            const container = document.getElementById('chatMessages');
            const row = document.createElement('div');
            row.className = isAi ? 'flex items-start gap-2.5' : 'flex items-end justify-end gap-2.5';
            
            if (isAi) {{
                row.innerHTML = `
                    <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">AI</div>
                    <div class="chat-bubble-ai p-3.5 max-w-[85%] shadow-sm leading-relaxed">${{text}}</div>
                `;
            }} else {{
                row.innerHTML = `
                    <div class="chat-bubble-buyer p-3.5 max-w-[85%] shadow-sm leading-relaxed">${{text}}</div>
                    <div class="w-7 h-7 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-bold shrink-0">You</div>
                `;
            }}
            container.appendChild(row);
            container.scrollTop = container.scrollHeight;
        }}

        function simulateQuestion(q) {{
            appendMessage('buyer', q, false);
            setTimeout(() => {{
                if (q.toLowerCase().includes('price') || q.toLowerCase().includes('cost')) {{
                    appendMessage('ai', `At <strong>${{builderName}}</strong>, prices start from:<br>• <strong>2BHK (1200 sft):</strong> Starting at ₹48 Lakhs<br>• <strong>3BHK (1650 sft):</strong> Starting at ₹65 Lakhs<br><br>We have special pre-launch festive pricing. Would you like to view the detailed PDF price breakdown on WhatsApp?`, true);
                }} else if (q.toLowerCase().includes('site visit') || q.toLowerCase().includes('schedule')) {{
                    appendMessage('ai', `Excellent! We provide a <strong>Complimentary Pick & Drop</strong> service anywhere in Tirupati for the site visit.<br><br>Please provide your <strong>Name and WhatsApp Number</strong>, and our senior property advisor will confirm your VIP visit timing.`, true);
                }} else if (q.toLowerCase().includes('floor plan') || q.toLowerCase().includes('brochure')) {{
                    appendMessage('ai', `Here are the unit highlights for ${{builderName}} in ${{areaName}}:<br>• 100% Vaastu Compliant<br>• Clubhouse, Swimming Pool & 24/7 Security<br>• 80% Approved Bank Loans from SBI & HDFC<br><br>Share your mobile number to get the complete floor plan brochure sent right to your WhatsApp!`, true);
                }} else {{
                    appendMessage('ai', `Thank you for checking with ${{builderName}}! We are located in prime ${{areaName}}, Tirupati with 100% clear titles and TUDA sanction. Would you like to schedule a site tour or speak with our sales manager?`, true);
                }}
            }}, 600);
        }}

        function handleChatSubmit(e) {{
            e.preventDefault();
            const input = document.getElementById('chatInput');
            const val = input.value.trim();
            if (!val) return;
            appendMessage('buyer', val, false);
            input.value = '';
            setTimeout(() => {{
                if (/\\d{{10}}/.test(val) || val.toLowerCase().includes('reddy') || val.toLowerCase().includes('rao')) {{
                    appendMessage('ai', `✅ <strong>VIP Site Visit Booked!</strong><br><br>Thank you! Our site manager at ${{builderName}} has received your request. We will contact you with your complimentary vehicle pickup details.<br><br><button onclick="showBuilderWhatsAppAlert()" class="mt-2 bg-white text-emerald-950 font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm">View Sales WhatsApp Lead Alert 📱</button>`, true);
                }} else {{
                    simulateQuestion(val);
                }}
            }}, 700);
        }}
    </script>
</body>
</html>
"""
    with open(output_dir / "index.html", "w", encoding="utf-8") as f:
        f.write(html_content)
        
    save_prototype_data(
        lead_id=lead['id'],
        slug=slug,
        business_name=builder_name,
        category="realestate",
        primary_color=primary_color,
        headline=f"24/7 AI Property Advisor for {builder_name}",
        subheadline="Turn website visitors into confirmed site visits",
        specialties=["Site Visit Booking", "Brochure Delivery", "Floor Plan Inquiries"],
        faqs=[{"q": "Starting Price", "a": "2BHK from ₹48L, 3BHK from ₹65L"}, {"q": "Approvals", "a": "TUDA Approved & RERA"}],
        working_hours="09:00 AM - 08:00 PM",
        whatsapp_num=whatsapp
    )
    return slug

def generate_prototype_for_lead(lead_id):
    lead = get_lead_by_id(lead_id)
    if not lead:
        return None
    if lead['category'] == 'healthcare':
        return generate_healthcare_prototype(lead)
    else:
        return generate_realestate_prototype(lead)

if __name__ == "__main__":
    from database import get_all_leads
    leads = get_all_leads()
    if leads:
        print(f"Generating sample prototype for {leads[0]['name']}...")
        slug = generate_prototype_for_lead(leads[0]['id'])
        print(f"Success! Prototype live at: static/prototypes/{slug}/index.html")
