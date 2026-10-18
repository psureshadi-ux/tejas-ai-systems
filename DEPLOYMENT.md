# Tejas AI Systems - Production Deployment & Hosting Guide

> **Primary Host**: Vercel (Edge Network + Serverless Functions)  
> **Primary Database**: Supabase Managed PostgreSQL (AWS Mumbai `ap-south-1` recommended for lowest latency to Tirupati/South India)

---

## 1. Prerequisites Checklist
- [ ] Vercel Account & CLI (`npx vercel`)
- [ ] Supabase Project created (Region: `ap-south-1` Mumbai)
- [ ] Domain name configured (e.g. `tejasai.in` or Vercel subdomain)
- [ ] Razorpay Merchant Account (Test mode initially, Live after KYC)

---

## 2. Step-by-Step Vercel Deployment

### Step A: Database Migration on Supabase
1. Open your Supabase project SQL Editor.
2. Run the migration script in `supabase/migrations/20261018000000_init_schema.sql`.
3. Verify that all 22 tables and RLS policies are created.

### Step B: Configure Environment Variables in Vercel
In the Vercel Dashboard -> Project Settings -> Environment Variables, add:
* `NEXT_PUBLIC_APP_URL`
* `NEXT_PUBLIC_SUPABASE_URL`
* `NEXT_PUBLIC_SUPABASE_ANON_KEY`
* `SUPABASE_SERVICE_ROLE_KEY`
* `DATABASE_URL`
* `NEXT_PUBLIC_RAZORPAY_KEY_ID`
* `RAZORPAY_KEY_SECRET`
* `RAZORPAY_WEBHOOK_SECRET`
* `GEMINI_API_KEY` or `OPENAI_API_KEY`
* `RESEND_API_KEY`

### Step C: Deploy
Run from the root directory:
```bash
npx vercel --prod
```
Or connect your GitHub repository to Vercel for automatic CI/CD on every push to `main`.
