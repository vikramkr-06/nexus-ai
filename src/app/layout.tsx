import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusAI — All Your AI Tools in One Platform",
  description:
    "Access 10+ powerful AI tools from one unified platform. Resume builder, legal drafts, tax assistant, interview coach, and more — powered by Google Gemini.",
  keywords: [
    "AI tools",
    "AI SaaS",
    "Google Gemini",
    "resume builder",
    "AI assistant",
    "AI platform",
  ],
  openGraph: {
    title: "NexusAI — All Your AI Tools in One Platform",
    description:
      "Access 10+ powerful AI tools from one unified platform. Powered by Google Gemini.",
    type: "website",
    locale: "en_US",
    siteName: "NexusAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusAI — All Your AI Tools in One Platform",
    description:
      "Access 10+ powerful AI tools from one unified platform. Powered by Google Gemini.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
