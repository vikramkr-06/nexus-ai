"use client";

import { Section } from "@/components/shared/section";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  Shield,
  Zap,
  Sparkles,
  Lock,
  Smartphone,
  Globe,
} from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    label: "Secure Authentication",
    description: "OAuth 2.0 via Google & GitHub",
  },
  {
    icon: Zap,
    label: "Fast AI Processing",
    description: "Responses in seconds",
  },
  {
    icon: Sparkles,
    label: "Powered by Gemini",
    description: "Google's most capable AI",
  },
  {
    icon: Lock,
    label: "Privacy First",
    description: "Your data stays yours",
  },
  {
    icon: Smartphone,
    label: "Fully Responsive",
    description: "Works on every device",
  },
  {
    icon: Globe,
    label: "50+ Languages",
    description: "Global AI capabilities",
  },
];

export function TrustedSection() {
  return (
    <Section className="py-12 md:py-16 border-y bg-muted/20">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {trustBadges.map((badge) => (
          <StaggerItem key={badge.label}>
            <div className="flex flex-col items-center text-center gap-2.5 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{badge.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {badge.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
