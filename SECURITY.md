# Tejas AI Systems - Production Security Architecture

> **Security Policy**: Zero Trust Architecture, Database-Enforced Tenant Isolation, Encrypted Secret References, and Regulatory Compliance (India DPDP Act 2023 Readiness).

---

## 1. Authentication & Session Security
- **Authentication Engine**: Supabase Auth using secure, httpOnly, SameSite=Lax JWT session cookies.
- **Client Bundles**: No secret keys, service role keys, or database passwords are ever exposed to client bundles.
- **Role Verification**: Middleware and Server Actions verify `user_id` and active `organization_id` against `organization_memberships` table on every request. Never trust a client-submitted tenant ID.

## 2. Multi-Tenant Isolation & Row-Level Security (RLS)
- Every database table with tenant association includes `organization_id UUID REFERENCES organizations(id)`.
- RLS Policies are enabled on all tables:
  ```sql
  CREATE POLICY tenant_isolation_policy ON agents
    FOR ALL
    USING (
      organization_id IN (
        SELECT organization_id FROM organization_memberships
        WHERE user_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND is_platform_admin = true
      )
    );
  ```

## 3. Webhook Signature Verification
- **Razorpay Payments**: Every webhook event is verified using HMAC SHA-256 against `RAZORPAY_WEBHOOK_SECRET` before processing payment updates:
  ```ts
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");
  ```
- **Meta WhatsApp Webhooks**: Validates `X-Hub-Signature-256` on every incoming message.

## 4. AI Guardrails & Prompt Injection Defense
- **Untrusted Inputs**: All patient/buyer messages and uploaded documents are treated as untrusted strings.
- **Tool Execution Boundaries**: The model never executes raw SQL, shell commands, or arbitrary network requests. All tool invocations map to strictly typed, whitelisted internal functions.
- **Context Boundaries**: Model responses are restricted to verified knowledge chunks retrieved for that tenant.

## 5. Input Validation & Abuse Prevention
- Server-side validation via **Zod** on all form submissions and API endpoints.
- In-memory / edge rate limiting on public contact and appointment endpoints (10 requests per minute per IP).
- Honeypot fields and CSRF tokens on public lead generation forms.
