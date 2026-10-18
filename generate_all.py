"""
Batch Generator for Tejas AI Systems
Generates interactive web prototypes for all leads currently in the CRM
"""
import sys

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from database import get_all_leads
from prototype_generator import generate_prototype_for_lead

def run():
    leads = get_all_leads()
    print(f"Total leads in CRM: {len(leads)}")
    generated = 0
    for l in leads:
        slug = generate_prototype_for_lead(l['id'])
        print(f"⚡ [PROTOTYPE READY] {l['name']} -> static/prototypes/{slug}/index.html")
        generated += 1
    print(f"\nSuccessfully generated {generated} interactive AI prototypes!")

if __name__ == "__main__":
    run()
