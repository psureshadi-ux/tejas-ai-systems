export const metadata = {
  title: "Security & Architecture Standards — Tejas AI Systems",
};

export default function SecurityPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Security & Infrastructure</h1>
        <p className="text-xs text-slate-400">Enterprise Tenant Isolation, Encryption, and Guardrails</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Multi-Tenant Row Level Security (RLS)</h2>
        <p>
          Every record stored in our PostgreSQL database has an explicit foreign key relationship to an organization. Database policies guarantee that tenant data is never commingled or visible across client boundaries.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Encryption in Transit and at Rest</h2>
        <p>
          All web traffic, API transactions, and webhook deliveries are encrypted using TLS 1.3 / HTTPS. Database volumes and backups are encrypted at rest using AES-256 standards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. Webhook Signature Verification</h2>
        <p>
          All webhook deliveries from Razorpay and Meta WhatsApp Cloud API are verified against cryptographic HMAC SHA-256 signatures before processing.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">4. Prompt Injection & Tool Whitelisting</h2>
        <p>
          AI model outputs are bounded and strictly whitelisted. Models cannot run raw SQL commands, shell scripts, or arbitrary network requests.
        </p>
      </section>

    </div>
  );
}
