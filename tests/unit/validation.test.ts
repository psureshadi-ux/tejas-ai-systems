import { describe, it, expect } from "vitest";
import {
  leadCaptureSchema,
  appointmentBookingSchema,
  clientOnboardingSchema,
  clientFeedbackSchema,
} from "@/lib/validation/schemas";

describe("Input Validation & Spam Defense", () => {
  describe("leadCaptureSchema", () => {
    it("accepts valid Indian phone numbers and complete lead profiles", () => {
      const validInputs = [
        {
          name: "Dr. Ramesh Kumar",
          businessName: "Tirupati Dental Care",
          phone: "9848012345",
          email: "dr.ramesh@example.com",
          industry: "healthcare",
          city: "Tirupati",
          area: "Bhavani Nagar",
        },
        {
          name: "Suresh Reddy",
          businessName: "Sapthagiri Constructions",
          phone: "+91 9440123456",
          industry: "realestate",
          city: "Tirupati",
        },
      ];

      for (const input of validInputs) {
        const result = leadCaptureSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it("rejects honeypot bot submissions", () => {
      const botSubmission = {
        name: "Bot Spammer",
        businessName: "Spam LLC",
        phone: "9848012345",
        industry: "general",
        honeyPot: "http://spamlink.ru", // Bot caught!
      };

      const result = leadCaptureSchema.safeParse(botSubmission);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Spam detected");
      }
    });

    it("rejects invalid phone numbers", () => {
      const invalidPhones = ["12345", "0000000000", "invalid-phone", "+1 555 123 4567"];

      for (const phone of invalidPhones) {
        const result = leadCaptureSchema.safeParse({
          name: "Test User",
          businessName: "Test Clinic",
          phone,
          industry: "healthcare",
        });
        expect(result.success).toBe(false);
      }
    });
  });

  describe("appointmentBookingSchema", () => {
    it("validates datetime and appointment types", () => {
      const valid = {
        customerName: "Venkatesh Rao",
        customerPhone: "9876543210",
        appointmentType: "clinic_opd",
        scheduledTime: new Date(Date.now() + 86400000).toISOString(),
        notes: "Dental checkup consultation",
      };

      const result = appointmentBookingSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it("rejects malformed datetime strings", () => {
      const invalid = {
        customerName: "Venkatesh Rao",
        customerPhone: "9876543210",
        appointmentType: "clinic_opd",
        scheduledTime: "tomorrow at 5pm", // Not ISO datetime
      };

      const result = appointmentBookingSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("clientFeedbackSchema", () => {
    it("enforces rating (1-5) and NPS (0-10) bounds", () => {
      const valid = {
        clientName: "Dr. Anita",
        rating: 5,
        npsScore: 10,
        feedbackText: "Outstanding appointment engine! Saved us 3 hours daily.",
      };
      expect(clientFeedbackSchema.safeParse(valid).success).toBe(true);

      const invalidRating = { ...valid, rating: 6 };
      expect(clientFeedbackSchema.safeParse(invalidRating).success).toBe(false);

      const invalidNps = { ...valid, npsScore: 11 };
      expect(clientFeedbackSchema.safeParse(invalidNps).success).toBe(false);
    });
  });
});
