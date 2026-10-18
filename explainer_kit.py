"""
Explainer Video Kit & Pitch Scripts for Tejas AI Systems
Generates customized 60-second video walkthrough scripts (English & Telugu)
for each Tirupati prospect to accompany their prototype.
"""
from database import get_lead_by_id
from config import AGENCY_NAME, AGENCY_PHONE

def get_video_walkthrough_script(lead):
    category = lead['category']
    name = lead['name']
    contact = lead.get('doctor_or_owner') or ("Doctor" if category == 'healthcare' else "Sir")
    area = lead.get('area') or "Tirupati"
    slug = lead.get('prototype_slug') or "preview"

    if category == 'healthcare':
        script_en = f"""
--- [60-SECOND DOCTOR LOOM VIDEO SCRIPT - ENGLISH] ---
Screen Recording: Open http://localhost:5000/demo/{slug} on your laptop screen.

[0:00 - 0:10 | Introduction]
"Hello Dr. {contact}, this is [Wife's Name] from Tejas AI Systems right here in Tirupati. 
I am recording this quick 60-second video specifically for {name} in {area}."

[0:10 - 0:30 | The Problem & Live Demo]
"We noticed that patients looking to book appointments after your clinic closes at 9:00 PM often have no way to reserve a slot. 
So we built this live AI assistant for your practice. Watch this: when a patient asks about consultation timings or fees, the AI answers instantly [Click 'Test FAQ']. 
Even better, when they request an appointment [Click 'Test Booking'], the AI books their slot in 15 seconds."

[0:30 - 0:50 | The WhatsApp Notification]
"And here is the best part: the moment they book, your clinic's WhatsApp immediately receives this alert with the patient's name, phone, and chosen time slot [Click 'View Doctor Notification']."

[0:50 - 1:00 | The Low-Risk Call to Action]
"We can have this active on your clinic's WhatsApp and Google listing within 48 hours. 
I’ve sent the test link to your WhatsApp—feel free to test it yourself, and let me know if you would like us to activate it for you this week. Thank you, Doctor!"
"""
        script_te = f"""
--- [60-SECOND DOCTOR VIDEO SCRIPT - TELUGU / TANGLISH] ---
Screen Recording: Open http://localhost:5000/demo/{slug} on your screen.

[0:00 - 0:15]
"Namaskaram Dr. {contact} Garu, nenu [Wife's Name] from Tejas AI Systems, Tirupati.
Mee {name} kosam oka small 60-second video demo record chestunnanu."

[0:15 - 0:35]
"Evening 9 PM tharvatha patients appointment book cheskovalante clinic lo evaru undaru. 
Anduke mee clinic kosam 24/7 AI Receptionist build chesamu. 
Chudandi, patient timings adigina, fee adigina bot ventane answer isthundi [Click 'Test FAQ'].
Patient appointment adigina ventane slot reserve chesthundi [Click 'Test Booking']."

[0:35 - 0:50]
"Slot book avvagane mee clinic WhatsApp ki instant ga patient details tho notification vasthundi [Click 'View Doctor Notification']."

[0:50 - 1:00]
"Mee clinic lo 2 days lo idi setup cheyochu. Link pampinchanu, meeru test chesi mee feedback cheppandi Doctor Garu. Dhanyavadamulu!"
"""
    else:
        script_en = f"""
--- [60-SECOND BUILDER LOOM VIDEO SCRIPT - ENGLISH] ---
Screen Recording: Open http://localhost:5000/demo/{slug} on your laptop screen.

[0:00 - 0:10 | Introduction]
"Hello {contact}, this is [Wife's Name] from Tejas AI Systems, Tirupati. 
I wanted to share a rapid 60-second demo of a property lead engine we customized for {name} in {area}."

[0:10 - 0:30 | The Demonstration]
"High-intent home buyers and investors often explore properties at night or on weekends. 
When they interact with your AI Property Advisor, it automatically explains your 2BHK/3BHK sizes, TUDA sanction, and bank loan approvals [Click 'Test Pricing Inquiry']."

[0:30 - 0:50 | The Site Visit Hook]
"Most importantly, it qualifies the buyer's budget and books a Free VIP Site Visit right into your sales team's WhatsApp [Click 'Test Site Visit Booking']."

[0:50 - 1:00 | Call to Action]
"This turns your passive website and social traffic into confirmed site visits every single weekend. 
I have attached your custom link below. Would love to hear your thoughts!"
"""
        script_te = f"""
--- [60-SECOND BUILDER VIDEO SCRIPT - TELUGU / TANGLISH] ---
Screen Recording: Open http://localhost:5000/demo/{slug} on your screen.

[0:00 - 0:15]
"Namaskaram {contact} Garu, nenu [Wife's Name] from Tejas AI Systems, Tirupati.
Mee {name} venture kosam ee quick 60-second video demo record chestunnanu."

[0:15 - 0:35]
"Chaalamandi buyers evening time lo property details kosam search chestharu. 
Mee AI Property Advisor vallaki pricing, floor plans, TUDA details ventane WhatsApp lo pampisthundi [Click 'Test Pricing Inquiry']."

[0:35 - 0:50]
"Direct ga weekend Free Site Visit book chesi, buyer contact & budget details mee sales team WhatsApp ki alert chesthundi [Click 'Test Site Visit Booking']."

[0:50 - 1:00]
"Mee venture site visits double cheyataniki idi chala help avuthundi. Link pampanu, okasari test chesi mee feedback ivvandi Sir. Thank you!"
"""

    return {
        "english": script_en.strip(),
        "telugu": script_te.strip()
    }
