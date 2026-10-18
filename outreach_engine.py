"""
Outreach Copilot for Tejas AI Systems
Generates culturally attuned, high-converting WhatsApp & LinkedIn messages
for Tirupati Doctors, Clinics, Builders, and Real Estate Developers.
"""
import urllib.parse
import sys

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from database import get_lead_by_id
from config import AGENCY_NAME, AGENCY_PHONE, AGENCY_LOCATION

def get_outreach_messages(lead, demo_url_base="http://localhost:5000/demo"):
    """
    Generates multi-touch, multi-language outreach messages tailored for the prospect.
    """
    category = lead['category']
    name = lead['name']
    contact_name = lead.get('doctor_or_owner') or ("Doctor" if category == 'healthcare' else "Sir")
    area = lead.get('area') or "Tirupati"
    slug = lead.get('prototype_slug') or "preview"
    demo_link = f"{demo_url_base}/{slug}"
    
    phone = lead.get('whatsapp') or lead.get('phone') or ""
    clean_digits = "".join(filter(str.isdigit, phone))
    if len(clean_digits) == 10:
        clean_digits = "91" + clean_digits

    if category == 'healthcare':
        # Day 1 - Value First & Interactive Demo Showcase
        day_1_msg = (
            f"Namaskaram {contact_name} Garu 🙏\n\n"
            f"I hope you are doing well. I am reaching out from *{AGENCY_NAME}* based here in {AGENCY_LOCATION}.\n\n"
            f"We noticed that many patients searching for *{name}* in {area} after 8:00 PM or during busy OPD hours are unable to book appointments easily, causing them to consult elsewhere.\n\n"
            f"To solve this, our engineering team built a custom *24/7 AI Receptionist & Appointment Specialist* specifically for your clinic.\n\n"
            f"👉 *Test your live prototype here:* {demo_link}\n\n"
            f"It answers patient questions about consultation fees, OPD timings, and books slots instantly into your WhatsApp.\n\n"
            f"Would you be open to a 5-minute review to see how this can save your front desk 2+ hours daily?\n\n"
            f"Warm regards,\n"
            f"*{AGENCY_NAME}* | Tirupati\n"
            f"📞 {AGENCY_PHONE}"
        )
        
        # Day 3 - Follow-up
        day_3_msg = (
            f"Good morning {contact_name} Garu,\n\n"
            f"Just following up regarding the *24/7 AI Patient Booking Assistant* we built for *{name}* ({demo_link}).\n\n"
            f"Two clinics in {area} recently implemented this to eliminate patient wait times and capture after-hours inquiries.\n\n"
            f"Can I share a 60-second video walkthrough or answer any questions you have?\n\n"
            f"Best regards,\n"
            f"*{AGENCY_NAME}*"
        )
        
        # Day 7 - Break-up / Exclusivity
        day_7_msg = (
            f"Hello {contact_name} Garu,\n\n"
            f"We are onboarding only 2 clinic partners in {area} this month to guarantee dedicated support.\n\n"
            f"Before we offer this AI appointment system to other practices in your neighborhood, please let us know if you'd like to activate it for *{name}*.\n\n"
            f"👉 Prototype link: {demo_link}\n\n"
            f"Thank you!"
        )

    else:
        # Real Estate & Builders
        day_1_msg = (
            f"Namaskaram {contact_name} Garu 🙏\n\n"
            f"Greetings from *{AGENCY_NAME}*, Tirupati.\n\n"
            f"We love what you are building with *{name}* in {area}. With high buyer interest across Tirupati, we noticed property buyers visiting your listings after-hours (especially NRI and pilgrim buyers) don't get immediate floor plans or site visit confirmations.\n\n"
            f"We developed an *AI Property Advisor & Site Visit Scheduler* customized for your project.\n\n"
            f"👉 *Interact with your venture's prototype here:* {demo_link}\n\n"
            f"This AI captures buyer budget, sends floor plan PDFs on WhatsApp in 3 seconds, and books VIP site visits directly to your sales team.\n\n"
            f"Can we show your sales manager how this can double your weekend site visits?\n\n"
            f"Regards,\n"
            f"*{AGENCY_NAME}* | Tirupati\n"
            f"📞 {AGENCY_PHONE}"
        )
        
        day_3_msg = (
            f"Hello {contact_name} Garu,\n\n"
            f"Did you get a moment to test the AI Site Visit Scheduler for *{name}*? ({demo_link})\n\n"
            f"With upcoming festival bookings, automated WhatsApp floor plan delivery is helping builders in Tirupati close site visits 3x faster.\n\n"
            f"Would tomorrow 11 AM or 4 PM work for a quick 5-min demo call?\n\n"
            f"Best regards,\n"
            f"*{AGENCY_NAME}*"
        )
        
        day_7_msg = (
            f"Hello {contact_name} Garu,\n\n"
            f"Just closing the loop regarding the AI Lead Capture system for *{name}* ({demo_link}).\n\n"
            f"If you are currently focusing on other sales channels, no problem at all! Feel free to reach back out whenever you are ready to scale automated buyer bookings.\n\n"
            f"Wishing you great sales this quarter!"
        )

    # Generate Click-to-Chat URLs for WhatsApp
    encoded_day1 = urllib.parse.quote(day_1_msg)
    encoded_day3 = urllib.parse.quote(day_3_msg)
    encoded_day7 = urllib.parse.quote(day_7_msg)
    
    wa_link_day1 = f"https://wa.me/{clean_digits}?text={encoded_day1}" if clean_digits else None
    wa_link_day3 = f"https://wa.me/{clean_digits}?text={encoded_day3}" if clean_digits else None
    wa_link_day7 = f"https://wa.me/{clean_digits}?text={encoded_day7}" if clean_digits else None

    return {
        "day_1": {"text": day_1_msg, "wa_url": wa_link_day1},
        "day_3": {"text": day_3_msg, "wa_url": wa_link_day3},
        "day_7": {"text": day_7_msg, "wa_url": wa_link_day7},
        "clean_phone": clean_digits,
        "demo_link": demo_link
    }

if __name__ == "__main__":
    from database import get_all_leads
    leads = get_all_leads()
    if leads:
        lead = leads[0]
        outreach = get_outreach_messages(lead)
        print(f"Sample Outreach for {lead['name']}:\n")
        print(outreach['day_1']['text'])
        print("\nDirect WhatsApp Click-to-Chat URL:")
        print(outreach['day_1']['wa_url'])
