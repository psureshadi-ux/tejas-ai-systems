# Tejas AI Systems - Integration Boundaries & Provider Adapters

> **Architecture Principle**: Every external service is accessed via a typed Provider Interface. If credentials are missing, the system gracefully marks the integration as `AWAITING_CREDENTIALS` and falls back safely without crashing or faking execution.

---

## 1. Provider Adapter Architecture

```text
src/lib/integrations/
├── whatsapp/             # Official Meta WhatsApp Cloud API adapter
│   ├── client.ts
│   ├── types.ts
│   └── webhook.ts
├── payment/              # Razorpay India Payment & Subscription adapter
│   ├── razorpay.ts
│   ├── types.ts
│   └── webhook.ts
├── email/                # Transactional Email adapter (Resend / SMTP)
│   ├── resend.ts
│   └── templates.ts
├── calendar/             # Google Calendar / Booking adapter
│   ├── google-calendar.ts
│   └── types.ts
└── ai/                   # Unified LLM Gateway (Gemini / OpenAI)
    ├── gateway.ts
    ├── prompt-builder.ts
    └── tools.ts
```

---

## 2. Integration Status & Setup Guide

| Service | Provider | Status | Environment Variables Required |
| :--- | :--- | :---: | :--- |
| **Payment Gateway** | Razorpay India | `CONFIGURABLE` | `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` |
| **WhatsApp Platform**| Meta Cloud API | `CONFIGURABLE` | `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_WEBHOOK_VERIFY_TOKEN` |
| **Transactional Email**| Resend / SMTP | `CONFIGURABLE` | `RESEND_API_KEY`, `EMAIL_FROM` |
| **AI LLM Gateway** | Gemini / OpenAI| `CONFIGURABLE` | `GEMINI_API_KEY`, `OPENAI_API_KEY` |
| **Calendar Sync** | Google Calendar | `CONFIGURABLE` | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` |

---

## 3. Graceful Fallback Rules
- **WhatsApp Offline**: If Meta credentials are unconfigured, outbound alerts default to in-app notification and direct click-to-chat `wa.me` links for the operations team.
- **Payment Gateway Offline**: If Razorpay keys are in test mode or unconfigured, invoices generate bank transfer / UPI QR details and record pending transactions cleanly.
- **AI Gateway Offline**: If the LLM provider experiences latency or missing keys, the system falls back to rule-based qualification questions without breaking client conversations.
