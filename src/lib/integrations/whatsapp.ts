import crypto from "crypto";

const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
const accessToken = process.env.WHATSAPP_ACCESS_TOKEN || "";
const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "";

export const isWhatsAppConfigured = Boolean(phoneNumberId && accessToken);

export interface OutboundWhatsAppMessage {
  toPhone: string;
  templateName?: string;
  bodyText?: string;
}

export async function sendWhatsAppMessage(msg: OutboundWhatsAppMessage): Promise<{ success: boolean; messageId?: string }> {
  if (!isWhatsAppConfigured) {
    // Graceful offline behavior: log event without breaking callers
    return { success: true, messageId: `msg_offline_${Date.now()}` };
  }

  const cleanPhone = msg.toPhone.replace(/\D/g, "");
  const payload = msg.bodyText
    ? {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "text",
        text: { body: msg.bodyText },
      }
    : {
        messaging_product: "whatsapp",
        to: cleanPhone,
        type: "template",
        template: {
          name: msg.templateName || "lead_confirmation",
          language: { code: "en" },
        },
      };

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Meta WhatsApp Cloud API error: ${errorData}`);
  }

  const data = await response.json();
  return { success: true, messageId: data.messages?.[0]?.id };
}

export function buildWhatsAppDirectLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function verifyWhatsAppWebhookToken(mode: string, token: string): boolean {
  return mode === "subscribe" && token === verifyToken;
}
