import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/db/client";
import { isRazorpayConfigured } from "@/lib/integrations/razorpay";
import { isWhatsAppConfigured } from "@/lib/integrations/whatsapp";
import { isAiConfigured } from "@/lib/integrations/ai-gateway";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Tejas AI Systems Platform",
    environment: process.env.NODE_ENV || "development",
    integrations: {
      database: isSupabaseConfigured ? "CONNECTED" : "LOCAL_TRANSACTIONAL_MODE",
      razorpay: isRazorpayConfigured ? "CONFIGURED" : "SANDBOX_MOCK",
      whatsapp: isWhatsAppConfigured ? "CONFIGURED" : "STANDBY",
      ai_gateway: isAiConfigured ? "ACTIVE" : "RULE_FALLBACK",
    },
    version: "1.0.0-PROD",
  });
}
