import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/integrations/razorpay";
import { updateLeadStage } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature, leadId } = await req.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ success: false, error: "Missing verification parameters" }, { status: 400 });
    }

    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);

    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
    }

    // Automatically transition lead to WON upon verified deposit
    if (leadId) {
      await updateLeadStage(leadId, "WON", `Payment verified via Razorpay ID: ${paymentId}`);
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified! Redirecting to client onboarding.",
      paymentId,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
