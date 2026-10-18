import { z } from "zod";

// Phone validation regex supporting Indian 10-digit, +91, or international formats
const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

export const leadCaptureSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(2, "Business or Clinic name is required"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  industry: z.enum(["healthcare", "realestate", "general"], {
    errorMap: () => ({ message: "Please select your industry" }),
  }),
  city: z.string().default("Tirupati"),
  area: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().optional(),
  honeyPot: z.string().max(0, "Spam detected").optional(), // Spam defense
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

export const appointmentBookingSchema = z.object({
  organizationId: z.string().uuid("Invalid organization identifier").optional(),
  leadId: z.string().uuid().optional(),
  customerName: z.string().min(2, "Name is required"),
  customerPhone: z.string().regex(phoneRegex, "Valid mobile number is required"),
  appointmentType: z.enum(["clinic_opd", "real_estate_site_visit", "agency_demo"]),
  scheduledTime: z.string().datetime("Please select a valid date and time"),
  notes: z.string().optional(),
});

export type AppointmentBookingInput = z.infer<typeof appointmentBookingSchema>;

export const clientOnboardingSchema = z.object({
  organizationName: z.string().min(2, "Organization name is required"),
  keyPersonName: z.string().min(2, "Doctor or Managing Director name is required"),
  phone: z.string().regex(phoneRegex, "Valid contact number is required"),
  industry: z.enum(["healthcare", "realestate", "general"]),
  operatingHours: z.string().min(3, "Operating / OPD timings are required"),
  servicesOffered: z.string().min(5, "Please list key services or property units"),
  topFaqs: z.string().min(10, "Please share at least 2 common FAQs"),
  whatsappAlertNumber: z.string().regex(phoneRegex, "Valid WhatsApp alert number is required"),
});

export type ClientOnboardingInput = z.infer<typeof clientOnboardingSchema>;

export const clientFeedbackSchema = z.object({
  organizationId: z.string().optional(),
  clientName: z.string().min(2, "Name is required"),
  rating: z.number().min(1).max(5),
  npsScore: z.number().min(0).max(10),
  feedbackText: z.string().min(5, "Please provide brief feedback"),
  allowPublicTestimonial: z.boolean().default(true),
});

export type ClientFeedbackInput = z.infer<typeof clientFeedbackSchema>;
