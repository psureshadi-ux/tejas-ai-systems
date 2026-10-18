# Tejas AI Systems - Automated Testing & QA Protocol

> **Testing Policy**: No feature is marked `VERIFIED` without automated test proof. Vitest runs unit, validation, authorization, and business logic tests deterministically.

---

## 1. Test Architecture & Structure

```text
tests/
├── unit/
│   ├── roi-calculator.test.ts    # Mathematical model for revenue recovery
│   ├── validation.test.ts        # Zod schema validation (leads, appointments)
│   ├── agent-lifecycle.test.ts   # State machine transitions
│   └── pricing.test.ts           # Plans, setup fees, and retainer entitlements
├── integration/
│   ├── tenant-isolation.test.ts  # Cross-tenant data leak rejection
│   ├── razorpay-signature.test.ts# HMAC SHA-256 webhook validation
│   └── lead-crm.test.ts          # Pipeline stage transitions and persistence
└── e2e-simulation/
    └── booking-flow.test.ts      # End-to-end appointment scheduling flow
```

---

## 2. Running Automated Tests

Run all tests once:
```bash
npm run test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

Run type-checking:
```bash
npx tsc --noEmit
```
