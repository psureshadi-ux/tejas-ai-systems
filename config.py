"""
Tejas AI Systems - Configuration & Business Parameters
Tailored for Tirupati Healthcare & Real Estate Market
"""
import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "tejas_crm.db"
PROTOTYPES_DIR = BASE_DIR / "static" / "prototypes"

# Ensure directories exist
PROTOTYPES_DIR.mkdir(parents=True, exist_ok=True)

# Agency Details
AGENCY_NAME = "Tejas AI Systems"
AGENCY_TAGLINE = "Tirupati's 24/7 AI Lead & Appointment Engine"
FOUNDER_TECH = "Technical Director"
FOUNDER_OPS = "Operations Director"
AGENCY_LOCATION = "Tirupati, Andhra Pradesh"
AGENCY_PHONE = "+91 98765 43210" # Replace with wife's WhatsApp Business number
AGENCY_EMAIL = "contact@tejasai.in"

# Pricing Packages (Tailored for Tier-2 Indian Market)
PRICING_PLANS = {
    "healthcare": {
        "tier_name": "Clinic AI Receptionist Plan",
        "setup_fee": "₹19,999",
        "monthly_retainer": "₹4,999 / month",
        "features": [
            "24/7 WhatsApp & Web Appointment Booking",
            "Automatic Consultation Slot Management",
            "Patient FAQ Answering (OPD Timings, Fees, Services)",
            "Instant Doctor WhatsApp Notification on New Booking",
            "Telugu & English Patient Support",
            "Monthly Performance & Lead Analytics"
        ]
    },
    "realestate": {
        "tier_name": "Builder AI Property Advisor Plan",
        "setup_fee": "₹29,999",
        "monthly_retainer": "₹6,999 / month",
        "features": [
            "24/7 Site Visit & VIP Tour Scheduler",
            "Instant Brochure & Floor Plan WhatsApp Delivery",
            "2BHK / 3BHK Budget & Financing Qualification",
            "Direct Real Estate Agent WhatsApp Alert",
            "TUDA Approval & Location Advantage Explainer",
            "Automated 24h & 48h Site Visit Follow-up"
        ]
    }
}

# Tirupati Geographic Focus Zones
TIRUPATI_HOTSPOTS = [
    "Prakasam Road",
    "Korlagunta",
    "Bhavani Nagar",
    "AIR Bypass Road",
    "Tataiah Gunta",
    "Tiruchanur Road",
    "Renigunta Road",
    "Karakambadi Road",
    "Chandragiri Bypass",
    "Settipalli",
    "Mangalam"
]
