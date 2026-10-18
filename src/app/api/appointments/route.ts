import { NextRequest, NextResponse } from "next/server";
import { appointmentBookingSchema } from "@/lib/validation/schemas";
import { createAppointment } from "@/lib/db/queries";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = appointmentBookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { organizationId, leadId, customerName, customerPhone, appointmentType, scheduledTime, notes } = validationResult.data;

    const savedAppointment = await createAppointment({
      organization_id: organizationId || "11111111-1111-1111-1111-111111111111",
      lead_id: leadId,
      appointment_type: appointmentType,
      customer_name: customerName,
      customer_phone: customerPhone,
      scheduled_time: scheduledTime,
      status: "scheduled",
      notes: notes || "Booked through 24/7 AI Lead & Appointment Engine",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment confirmed! A WhatsApp notification has been dispatched.",
        appointment: savedAppointment,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
