"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  Zap,
  Target,
  Sparkles,
  Award,
  Shield,
  Smartphone,
  MousePointerClick,
  Repeat,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get AI-generated results in seconds, not minutes. Optimized for speed.",
  },
  {
    icon: Target,
    title: "Highly Accurate",
    description: "Trained on vast datasets with context-aware processing for reliable outputs.",
  },
  {
    icon: Sparkles,
    title: "Powered by Gemini",
    description: "Built on Google's most advanced AI model for state-of-the-art quality.",
  },
  {
    icon: Award,
    title: "Professional Results",
    description: "Enterprise-grade outputs ready for real-world use without editing.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "End-to-end encryption with OAuth 2.0 auth. Your data never leaves our servers.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Use any tool from any device — desktop, tablet, or mobile.",
  },
  {
    icon: MousePointerClick,
    title: "Easy to Use",
    description: "Intuitive interfaces designed for everyone — no technical skills required.",
  },
  {
    icon: Repeat,
    title: "Unlimited Revisions",
    description: "Not satisfied? Regenerate or tweak results until they're perfect.",
  },
];

export function WhySection() {
  return (
    <Section id="features" className="bg-muted/20">
      <FadeIn>
        <SectionHeader
          badge="Why NexusAI"
          title="Built for Professionals Who Demand More"
          description="Every feature is designed to help you work smarter, not harder."
        />
      </FadeIn>

      <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <div className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
