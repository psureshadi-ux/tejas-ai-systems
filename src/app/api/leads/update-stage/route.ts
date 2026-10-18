import { NextRequest, NextResponse } from "next/server";
import { updateLeadStage } from "@/lib/db/queries";
import { LeadStage } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { leadId, stage, notes } = await req.json();

    if (!leadId || !stage) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    const updated = await updateLeadStage(leadId, stage as LeadStage, notes);
    return NextResponse.json({ success: true, lead: updated });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating lead";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
