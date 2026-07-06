"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Search, LogIn, Sparkles, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse AI Tools",
    description:
      "Explore our growing collection of professional AI tools — no account needed to browse.",
  },
  {
    number: "02",
    icon: LogIn,
    title: "Quick Sign In",
    description:
      "When you find a tool you need, sign in instantly with Google or GitHub — no passwords, no forms.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Use AI Tool",
    description:
      "Input your requirements and let our Gemini-powered AI generate professional results in seconds.",
  },
  {
    number: "04",
    icon: Download,
    title: "Download or Save",
    description:
      "Export your results as PDF, Word, or text. Save to your account for future access and editing.",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <FadeIn>
        <SectionHeader
          badge="How It Works"
          title="From Browse to Results in Minutes"
          description="No complex setup. No learning curve. Just powerful AI at your fingertips."
        />
      </FadeIn>

      <StaggerContainer className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line (desktop) */}
        <div className="absolute top-16 left-[12.5%] right-[12.5%] hidden lg:block">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <div className="relative flex flex-col items-center text-center">
              {/* Step number circle */}
              <div className="relative z-10 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary text-[11px] font-bold text-primary">
                  {step.number}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
