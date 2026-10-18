import { NextRequest, NextResponse } from "next/server";
import { clientOnboardingSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = clientOnboardingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Simulate provisioning workflow and task dispatch
    return NextResponse.json(
      {
        success: true,
        message: "Onboarding details received! Our engineering team will configure your 24/7 AI agent and notify you on WhatsApp within 24 hours.",
        organizationSlug: data.organizationName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Onboarding failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
