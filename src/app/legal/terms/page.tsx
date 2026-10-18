export const metadata = {
  title: "Terms of Service — Tejas AI Systems",
};

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: October 18, 2026 • Tejas AI Systems, Tirupati, India</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Service Agreement</h2>
        <p>
          Tejas AI Systems provides productized AI agent development, appointment booking widgets, and lead qualification software for business clients. By contracting our services or subscribing to our software, you agree to these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Commercial Terms & Payment</h2>
        <p>
          Setup fees are billed with an upfront 50% booking deposit. The remaining 50% is due upon client verification and deployment. Monthly recurring retainer fees cover cloud infrastructure, AI model token allocations, and ongoing maintenance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. Medical & Commercial Disclaimers</h2>
        <p>
          Our Healthcare AI Assistants are administrative tools designed for scheduling and answering approved FAQs. <strong>They do not provide medical diagnosis, clinical treatment, or substitute for professional medical care.</strong> The clinic remains solely responsible for medical consultations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">4. Jurisdiction</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Tirupati, Andhra Pradesh.
        </p>
      </section>

    </div>
  );
}
