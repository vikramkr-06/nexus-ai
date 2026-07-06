"use client";

import { PublicNavbar } from "@/components/layouts/public/public-navbar";
import { PublicFooter } from "@/components/layouts/public/public-footer";
import { AuthModal } from "@/components/shared/auth-modal";
import {
  HeroSection,
  TrustedSection,
  ToolsSection,
  WhySection,
  HowItWorksSection,
  PricingSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
} from "@/components/landing";

export function LandingPage() {
  return (
    <>
      <PublicNavbar />
      <main>
        <HeroSection />
        <TrustedSection />
        <ToolsSection />
        <WhySection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <PublicFooter />
      <AuthModal />
    </>
  );
}
