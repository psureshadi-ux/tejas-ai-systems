export const metadata = {
  title: "Privacy Policy — Tejas AI Systems",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">
          Last Updated: October 18, 2026 • Compliant with Digital Personal Data Protection Act (DPDP Act 2023, India)
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Introduction</h2>
        <p>
          Tejas AI Systems (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;), operating from Tirupati, Andhra Pradesh, India, provides 24/7 AI lead capture, patient appointment booking, and automated customer engagement systems. This policy outlines how we handle personal data collected through our website and tenant AI assistants.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Data We Collect</h2>
        <p>
          We collect minimal personal data strictly necessary for fulfilling appointment requests and client communications:
        </p>
        <ul className="list-disc ml-5 space-y-1 text-slate-400">
          <li><strong>Contact Details:</strong> Full name, WhatsApp phone number, and email address.</li>
          <li><strong>Business Configuration:</strong> Clinic/Venture names, doctor credentials, operating hours, and FAQ content.</li>
          <li><strong>Appointment Inquiries:</strong> Preferred consultation dates and general chief complaints submitted to tenant bots.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. Multi-Tenant Data Isolation</h2>
        <p>
          All tenant data is strictly isolated using database-level Row Level Security (RLS). Under no circumstances is patient or buyer data of one clinic accessible to another tenant or exposed publicly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">4. No Sale of Personal Data</h2>
        <p>
          We do not sell, rent, or trade patient or prospective buyer contact information to third-party data brokers or marketing lists.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">5. Grievance Officer</h2>
        <p>
          For questions, data access requests, or deletion requests, contact our Operations Director at:
          <br />
          <strong>Email:</strong> privacy@tejasai.in
          <br />
          <strong>Address:</strong> Tirupati Urban, Andhra Pradesh 517501, India.
        </p>
      </section>

    </div>
  );
}
