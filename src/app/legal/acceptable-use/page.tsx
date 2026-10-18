import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acceptable Use Policy | Tejas AI Systems",
  description: "Terms and conditions governing the ethical deployment and operational boundaries of Tejas AI Systems conversational agents.",
};

export default function AcceptableUsePage() {
  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Acceptable Use Policy</h1>
            <p className="text-slate-400 text-sm">Last updated: October 18, 2026 | Governing all AI agent deployments</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Core Ethical Principles</h2>
          <p>
            Tejas AI Systems builds autonomous agents to augment legitimate customer service, appointment scheduling, and lead qualification for clinics and enterprises. All deployed agents must adhere to strict transparency, truthfulness, and zero-spam guidelines.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Medical & Clinical Guardrails (Crucial)</h2>
          <p>
            For healthcare deployments (Dental, Dermatology, Pediatrics, General Medicine):
          </p>
          <div className="p-4 rounded-xl bg-[#0f172a] border border-cyan-500/20 space-y-2">
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-cyan-400">No Medical Diagnosis:</strong> AI receptionists must NEVER provide medical diagnosis, prescribe pharmaceuticals, or modify ongoing treatment protocols.</li>
              <li><strong className="text-cyan-400">Mandatory Emergency Escalation:</strong> When a user reports acute symptoms (e.g., chest pain, shortness of breath, severe trauma, high fever), the agent must immediately output an emergency triage warning and redirect the patient to call emergency services or visit the nearest casualty ward (e.g., SVIMS / Ruia Hospital, Tirupati).</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Prohibited Activities</h2>
          <p>You may not use Tejas AI Systems to:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-400">
            <li>Engage in unsolicited bulk spam or violate Meta WhatsApp Business Commercial Messaging Policies.</li>
            <li>Impersonate a human physician, government officer, or legal authority without clear AI disclosure.</li>
            <li>Promote deceptive real estate schemes or plots lacking statutory approvals (TUDA/RERA).</li>
            <li>Attempt prompt injection, jailbreaking, or reverse-engineering proprietary model weights or system prompts.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Enforcement & Termination</h2>
          <p>
            Violations of this policy will result in immediate suspension of API access and termination of client retainers without refund, as outlined in our Master Subscription Agreement.
          </p>
        </section>
      </div>
    </div>
  );
}
