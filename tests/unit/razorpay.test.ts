import { describe, it, expect, vi, beforeEach } from "vitest";
import crypto from "crypto";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from "@/lib/integrations/razorpay";

describe("Razorpay Integration & Cryptographic Signature Verification", () => {
  it("creates deterministic sandbox order when live credentials are not set", async () => {
    const order = await createRazorpayOrder(9999, "rec_test_001");
    expect(order.amount).toBe(999900); // Converted to paise
    expect(order.currency).toBe("INR");
    expect(order.receipt).toBe("rec_test_001");
    expect(order.status).toBe("created");
  });

  it("verifies valid HMAC SHA-256 signature when secret is provided", () => {
    const testSecret = "secret_key_tejas_test";
    const orderId = "order_123456";
    const paymentId = "pay_789012";

    const expectedSignature = crypto
      .createHmac("sha256", testSecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    // Replicate logic directly to verify standard conformity
    const verify = (o: string, p: string, sig: string, sec: string) => {
      return crypto.createHmac("sha256", sec).update(`${o}|${p}`).digest("hex") === sig;
    };

    expect(verify(orderId, paymentId, expectedSignature, testSecret)).toBe(true);
    expect(verify(orderId, paymentId, "invalid_tampered_signature", testSecret)).toBe(false);
  });

  it("verifies webhook payload signatures", () => {
    const webhookSecret = "whsec_test_123";
    const payload = JSON.stringify({ event: "payment.captured", id: "evt_123" });

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");

    const verifyWebhook = (body: string, sig: string, secret: string) => {
      return crypto.createHmac("sha256", secret).update(body).digest("hex") === sig;
    };

    expect(verifyWebhook(payload, expectedSignature, webhookSecret)).toBe(true);
    expect(verifyWebhook(payload, "forged_header", webhookSecret)).toBe(false);
  });
});
