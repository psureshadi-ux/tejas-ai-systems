import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tejas AI Systems — 24/7 AI Lead & Appointment Engine",
  description:
    "We build intelligent 24/7 AI Receptionists & Property Advisors that qualify leads, answer FAQs, and book appointments directly into WhatsApp for healthcare practices and real estate builders in Tirupati.",
  keywords: [
    "AI automation Tirupati",
    "clinic AI receptionist",
    "real estate AI agent",
    "WhatsApp appointment booking",
    "Tejas AI Systems",
    "dental clinic appointment bot",
    "Andhra Pradesh AI consultancy",
  ],
  authors: [{ name: "Tejas AI Systems" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://tejasai.vercel.app"),
  openGraph: {
    title: "Tejas AI Systems — 24/7 AI Lead & Appointment Engine",
    description:
      "Never lose another patient or property buyer after 8 PM. Intelligent 24/7 AI Receptionists & Property Advisors for Tirupati.",
    url: "https://tejasai.vercel.app",
    siteName: "Tejas AI Systems",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth dark`}>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
