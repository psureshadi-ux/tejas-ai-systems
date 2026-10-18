import { NextRequest, NextResponse } from "next/server";
import { leadCaptureSchema } from "@/lib/validation/schemas";
import { createLead } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validationResult = leadCaptureSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, businessName, phone, email, industry, city, area, budget, notes, honeyPot } = validationResult.data;

    // 2. Honeypot Spam Check
    if (honeyPot && honeyPot.length > 0) {
      return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
    }

    // 3. Persistent Database Storage
    const savedLead = await createLead({
      name,
      business_name: businessName,
      phone,
      email: email || undefined,
      city: city || "Tirupati",
      area: area || "Tirupati Central",
      industry,
      lead_source: "website_inquiry",
      stage: "NEW",
      budget: budget || undefined,
      notes: notes || "Direct inquiry via Tejas AI Systems portal",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We will reach out on WhatsApp within 30 minutes with your personalized demo.",
        leadId: savedLead.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
