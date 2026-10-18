import { NextRequest, NextResponse } from "next/server";
import { clientFeedbackSchema } from "@/lib/validation/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = clientFeedbackSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { rating } = validation.data;

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your valuable feedback! We appreciate your partnership with Tejas AI Systems.",
        shouldRedirectToGoogleReview: rating === 5,
        googleReviewUrl: "https://g.page/r/tejas-ai-systems/review",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Feedback submission failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
