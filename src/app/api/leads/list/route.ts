import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error fetching leads";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
