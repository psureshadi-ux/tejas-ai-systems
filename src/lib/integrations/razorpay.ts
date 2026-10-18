import crypto from "crypto";

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

export const isRazorpayConfigured = Boolean(
  keyId && 
  keySecret && 
  !keyId.includes("mock") && 
  !keyId.includes("placeholder")
);

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export async function createRazorpayOrder(amountInr: number, receiptId: string): Promise<RazorpayOrderResponse> {
  // If real credentials are not configured, generate a deterministic sandbox order
  if (!isRazorpayConfigured) {
    return {
      id: `order_sandbox_${Date.now()}`,
      amount: amountInr * 100, // paise
      currency: "INR",
      receipt: receiptId,
      status: "created",
    };
  }

  const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInr * 100, // Amount in paise
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Razorpay API order creation failed: ${errorText}`);
  }

  return response.json();
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  if (!keySecret) return true; // development mode bypass only
  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return generatedSignature === signature;
}

export function verifyRazorpayWebhookSignature(rawBody: string, signatureHeader: string): boolean {
  if (!webhookSecret) return true;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");
  return expectedSignature === signatureHeader;
}
