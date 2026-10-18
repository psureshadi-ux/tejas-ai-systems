"""
Database Layer for Tejas AI Systems CRM & Lead Engine
Uses SQLite for zero-configuration, robust local storage
"""
import sqlite3
import json
from datetime import datetime
from config import DATABASE_PATH

def get_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Leads Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,  -- 'healthcare' or 'realestate'
        sub_type TEXT,          -- 'Dental', 'Pediatrician', 'Apartments', 'Plots'
        doctor_or_owner TEXT,   -- Name of key contact/doctor
        area TEXT,              -- 'Prakasam Road', 'AIR Bypass', etc.
        address TEXT,
        phone TEXT,
        whatsapp TEXT,
        website TEXT,
        rating REAL DEFAULT 4.5,
        review_count INTEGER DEFAULT 10,
        status TEXT DEFAULT 'Discovered', -- 'Discovered', 'Prototype_Ready', 'Pitched', 'Meeting_Booked', 'Closed_Won', 'Closed_Lost'
        prototype_slug TEXT,
        pitch_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Prototypes Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prototypes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER UNIQUE,
        slug TEXT UNIQUE NOT NULL,
        business_name TEXT NOT NULL,
        category TEXT NOT NULL,
        primary_color TEXT DEFAULT '#2563eb',
        headline TEXT,
        subheadline TEXT,
        specialties_json TEXT,
        faqs_json TEXT,
        working_hours TEXT,
        whatsapp_booking_number TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(lead_id) REFERENCES leads(id) ON DELETE CASCADE
    );
    """)

    # Outreach Log
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS outreach_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        channel TEXT DEFAULT 'WhatsApp', -- 'WhatsApp', 'LinkedIn', 'Phone', 'In-Person'
        message_sent TEXT,
        status TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(lead_id) REFERENCES leads(id)
    );
    """)

    # App Settings Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()
    seed_initial_tirupati_leads()

def get_setting(key, default=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM settings WHERE key = ?", (key,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else default

def set_setting(key, value):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    """, (key, value))
    conn.commit()
    conn.close()

def seed_initial_tirupati_leads():
    """Seeds verified initial high-value leads across Tirupati healthcare and real estate"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM leads")
    count = cursor.fetchone()[0]
    
    if count == 0:
        initial_leads = [
            # Healthcare Leads
            (
                "Sri Venkateswara Dental Hospital & Implant Centre",
                "healthcare",
                "Dental Clinic",
                "Dr. K. Srinivasulu, MDS",
                "Prakasam Road",
                "Beside Municipal Office, Prakasam Road, Tirupati, AP 517501",
                "+91 877 225 1199",
                "918772251199",
                "",
                4.8,
                142,
                "Discovered",
                "sri-venkateswara-dental",
                "High footfall dental clinic in core market. Needs 24/7 appointment scheduling."
            ),
            (
                "Amma Children Hospital & Newborn Center",
                "healthcare",
                "Pediatric Hospital",
                "Dr. P. Madhavi, MD (Peds)",
                "Bhavani Nagar",
                "Opposite SVIMS Gate, Bhavani Nagar, Tirupati, AP 517501",
                "+91 877 228 8844",
                "918772288844",
                "http://ammachildrenhospital.com",
                4.6,
                98,
                "Discovered",
                "amma-children-hospital",
                "Parents constantly inquire about OPD timings & vaccination slots. Urgent need for automated triage."
            ),
            (
                "Tirumala Skin & Cosmetology Clinic",
                "healthcare",
                "Dermatology & Hair Care",
                "Dr. R. Tejaswi, MD (DVL)",
                "AIR Bypass Road",
                "Near Reliance Trends, AIR Bypass Road, Tirupati, AP 517507",
                "+91 944 112 3344",
                "919441123344",
                "",
                4.7,
                86,
                "Discovered",
                "tirumala-skin-clinic",
                "Cosmetic patients inquire after work hours (8 PM - 11 PM). Missing consultations every day."
            ),
            (
                "Sri Sai Orthopedic & Joint Replacement Centre",
                "healthcare",
                "Orthopedics",
                "Dr. M. Suresh Kumar, MS (Ortho)",
                "Korlagunta",
                "Near Maruthi Nagar Arch, Korlagunta Main Road, Tirupati, AP 517501",
                "+91 877 223 4567",
                "918772234567",
                "",
                4.5,
                112,
                "Discovered",
                "sri-sai-ortho",
                "Emergency joint pain & fracture appointments. Needs instant WhatsApp booking flow."
            ),
            (
                "Dr. Vengala Rao Eye Hospital",
                "healthcare",
                "Ophthalmology & Lasik",
                "Dr. Vengala Rao, MS (Ophth)",
                "Tataiah Gunta",
                "Tataiah Gunta, Beside Sub-Registrar Office, Tirupati, AP 517501",
                "+91 877 222 9988",
                "918772229988",
                "",
                4.6,
                75,
                "Discovered",
                "vengala-rao-eye",
                "Cataract surgery and Lasik consultations can be automated with pre-qualifying FAQs."
            ),

            # Real Estate & Builders Leads
            (
                "Bliss County Luxury Villas & Apartments",
                "realestate",
                "Luxury Gated Community",
                "Mr. N. Ramanadha Reddy (Managing Partner)",
                "Karakambadi Road",
                "Near Mangalam IT Park, Karakambadi Road, Tirupati, AP 517507",
                "+91 984 801 2345",
                "919848012345",
                "http://blisscountytirupati.in",
                4.8,
                64,
                "Discovered",
                "bliss-county-tirupati",
                "Selling 3BHK luxury villas. Inbound NRI & pilgrim buyers want instant PDF brochure and site visit booking."
            ),
            (
                "Sree City Green Meadows Residential Plots",
                "realestate",
                "TUDA Approved Plots",
                "Mr. K. Bhaskar (Sales Director)",
                "Renigunta Road",
                "Beside Airport Road, Renigunta - Tirupati Highway, AP 517520",
                "+91 998 902 3456",
                "919989023456",
                "",
                4.7,
                53,
                "Discovered",
                "sree-city-green-meadows",
                "TUDA approved open plots. High interest from investors; needs instant spot-booking & location pin automation."
            ),
            (
                "Vaikunta Prime 2 & 3 BHK Living",
                "realestate",
                "Apartment Complexes",
                "Mr. V. Chandrasekhar Naidu",
                "Tiruchanur Road",
                "Near Padmavathi Ammavari Temple Arch, Tiruchanur Road, Tirupati, AP 517503",
                "+91 970 123 4567",
                "919701234567",
                "",
                4.6,
                82,
                "Discovered",
                "vaikunta-prime-apartments",
                "Middle-class families buying homes. Bank loan inquiry & floor plan delivery bot will drive site visits."
            ),
            (
                "Tirumala Heights Residential Towers",
                "realestate",
                "High-Rise Construction",
                "Mr. P. Vijay Kumar",
                "Chandragiri Bypass",
                "Near SV Veterinary University, Chandragiri Bypass, Tirupati, AP 517502",
                "+91 988 554 4332",
                "919885544332",
                "",
                4.5,
                41,
                "Discovered",
                "tirumala-heights-towers",
                "Construction in progress. Needs 24/7 lead capture for pre-launch discounts."
            )
        ]
        
        cursor.executemany("""
        INSERT INTO leads (
            name, category, sub_type, doctor_or_owner, area, address, 
            phone, whatsapp, website, rating, review_count, status, 
            prototype_slug, pitch_notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, initial_leads)
        
        conn.commit()
    conn.close()

def get_all_leads(category=None, status=None, search=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM leads WHERE 1=1"
    params = []
    
    if category and category != 'all':
        query += " AND category = ?"
        params.append(category)
        
    if status and status != 'all':
        query += " AND status = ?"
        params.append(status)
        
    if search:
        query += " AND (name LIKE ? OR area LIKE ? OR doctor_or_owner LIKE ?)"
        wildcard = f"%{search}%"
        params.extend([wildcard, wildcard, wildcard])
        
    query += " ORDER BY id DESC"
    cursor.execute(query, params)
    leads = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return leads

def get_lead_by_id(lead_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def update_lead_status(lead_id, new_status, notes=None):
    conn = get_connection()
    cursor = conn.cursor()
    if notes:
        cursor.execute("""
            UPDATE leads 
            SET status = ?, pitch_notes = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
        """, (new_status, notes, lead_id))
    else:
        cursor.execute("""
            UPDATE leads 
            SET status = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
        """, (new_status, lead_id))
    conn.commit()
    conn.close()

def save_prototype_data(lead_id, slug, business_name, category, primary_color, headline, subheadline, specialties, faqs, working_hours, whatsapp_num):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO prototypes (
            lead_id, slug, business_name, category, primary_color,
            headline, subheadline, specialties_json, faqs_json, working_hours, whatsapp_booking_number
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(lead_id) DO UPDATE SET
            slug=excluded.slug,
            primary_color=excluded.primary_color,
            headline=excluded.headline,
            subheadline=excluded.subheadline,
            specialties_json=excluded.specialties_json,
            faqs_json=excluded.faqs_json,
            working_hours=excluded.working_hours,
            whatsapp_booking_number=excluded.whatsapp_booking_number
    """, (
        lead_id, slug, business_name, category, primary_color,
        headline, subheadline, json.dumps(specialties), json.dumps(faqs),
        working_hours, whatsapp_num
    ))
    cursor.execute("UPDATE leads SET prototype_slug = ?, status = 'Prototype_Ready' WHERE id = ?", (slug, lead_id))
    conn.commit()
    conn.close()

def get_crm_metrics():
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM leads")
    total_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE status != 'Discovered'")
    prototypes_built = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE status IN ('Pitched', 'Meeting_Booked', 'Closed_Won')")
    pitched = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE status = 'Closed_Won'")
    closed_won = cursor.fetchone()[0]
    
    conn.close()
    return {
        "total_leads": total_leads,
        "prototypes_built": prototypes_built,
        "pitched": pitched,
        "closed_won": closed_won,
        "projected_mrr": f"₹{closed_won * 5000:,}"
    }

if __name__ == "__main__":
    init_db()
    print("Database initialized and seeded with Tirupati leads successfully.")
