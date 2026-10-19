# Tejas AI Systems - Production Deployment & Hosting Guide

> **Live Production Host**: Vercel (Edge Network + Serverless Functions)  
> **Deployment Status**: `LIVE & VERIFIED` (HTTP 200 /healthy probe passed)  
> **Operator Account**: `psureshadi-3927s-projects` (`psuresh.adi@gmail.com`)  
> **Primary Database**: Supabase Managed PostgreSQL (AWS Mumbai `ap-south-1`)

---

## 1. Verified Dual-Website Live Endpoints

Both platforms are now running simultaneously without conflict:

| Platform | Production URL | Description | Status |
| :--- | :--- | :--- | :---: |
| **Website 1 (Main Business)** | [**`https://tejasaisystems.com`**](https://tejasaisystems.com) | Core AI Operations Infrastructure for Manufacturing MSMEs with Tara AI Voice Assistant & Cost-Leak Audit | `LIVE & RESTORED` |
| **Website 2 (Lead Engine)** | [**`https://leads.tejasaisystems.com`**](https://leads.tejasaisystems.com) | 24/7 AI Lead & Appointment Specialist for Healthcare & Real Estate with 54 Tirupati Live Demos, CRM, & Razorpay | `LIVE & OPERATIONAL` |
| **Lead Engine Direct Edge** | [**`https://tejas-lead-engine.vercel.app`**](https://tejas-lead-engine.vercel.app) | Dedicated Vercel Edge direct URL for the lead engine | `LIVE` |
| **Lead Engine Health API** | [**`https://leads.tejasaisystems.com/api/health`**](https://leads.tejasaisystems.com/api/health) | Automated service health probe (200 OK) | `HEALTHY` |

---

## 2. GitHub Deployment & Remote Setup

Git author identity is configured locally and globally as:
```text
Name:  Suresh
Email: psuresh.adi@gmail.com
```

To connect your GitHub repository and enable automated CI/CD pushes:

```bash
# 1. Create a repository on GitHub named "tejas-ai-systems" under your account

# 2. Add remote origin (replace YOUR_GITHUB_USERNAME with your GitHub handle):
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/tejas-ai-systems.git

# 3. Set default branch to main and push:
git branch -M main
git push -u origin main
```
*When prompted for credentials, authenticate with `psuresh.adi@gmail.com` via the Git Credential Manager.*

---

## 3. Production Environment Variables in Vercel

In the Vercel Dashboard -> Project `tejas-ai-systems` -> Settings -> Environment Variables:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `https://tejasaisystems.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client-side queries |
| `SUPABASE_SERVICE_ROLE_KEY` | Private service role key for administrative API handlers |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_...` or test key |
| `RAZORPAY_KEY_SECRET` | Secret key for HMAC SHA-256 order verification |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature secret |
| `GEMINI_API_KEY` | Google Gemini API key for conversational agent runtime |
| `RESEND_API_KEY` | Transactional email delivery key |
