"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring AI tools and occasional use.",
    features: [
      "5 AI tool uses per day",
      "Access to free-tier tools",
      "Basic export formats",
      "Community support",
      "Standard processing speed",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "For professionals who need unlimited AI power.",
    features: [
      "Unlimited AI tool uses",
      "All 10+ AI tools unlocked",
      "Priority processing speed",
      "Advanced export formats (PDF, DOCX)",
      "Save & manage history",
      "Priority email support",
      "Early access to new tools",
      "Custom AI instructions",
    ],
    cta: "Upgrade to Premium",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <Section id="pricing" className="bg-muted/20">
      <FadeIn>
        <SectionHeader
          badge="Simple Pricing"
          title="Start Free, Upgrade When Ready"
          description="No hidden fees. No credit card required. Upgrade anytime as your needs grow."
        />
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <FadeIn key={plan.name} delay={plan.highlighted ? 0.15 : 0}>
            <div
              className={cn(
                "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                plan.highlighted
                  ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                  : "bg-card hover:border-primary/20 hover:shadow-lg"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="shadow-lg px-4 py-1 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-2 text-muted-foreground">
                  /{plan.period}
                </span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        plan.highlighted ? "text-primary" : "text-success"
                      )}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
