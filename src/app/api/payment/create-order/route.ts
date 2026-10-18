import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/integrations/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amountInr, receiptId } = await req.json();

    if (!amountInr || amountInr <= 0) {
      return NextResponse.json({ success: false, error: "Valid amount required" }, { status: 400 });
    }

    const order = await createRazorpayOrder(amountInr, receiptId || `rcpt_${Date.now()}`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Payment order creation failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
