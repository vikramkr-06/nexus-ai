"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/ui/motion";
import type { SessionUser } from "@/types";
import {
  Crown,
  Check,
  Zap,
  Star,
  CreditCard,
  Calendar,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionContentProps {
  user: SessionUser;
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring AI tools",
    features: [
      "5 AI tool uses per day",
      "Access to free-tier tools",
      "Basic export formats",
      "Community support",
    ],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For professionals who need more",
    features: [
      "Unlimited AI tool uses",
      "All 10+ AI tools unlocked",
      "Priority processing speed",
      "Advanced export formats",
      "Save & manage history",
      "Priority email support",
      "Early access to new tools",
      "Custom AI instructions",
    ],
    highlighted: true,
    current: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "API access",
      "Custom integrations",
      "Dedicated support",
      "Custom training",
      "SLA guarantee",
    ],
    current: false,
  },
];

const premiumBenefits = [
  { icon: Zap, title: "Unlimited Usage", description: "No daily limits on AI tool usage" },
  { icon: Sparkles, title: "All Tools", description: "Access to all premium AI tools" },
  { icon: TrendingUp, title: "Priority Speed", description: "Faster AI processing times" },
  { icon: Star, title: "Early Access", description: "Be first to try new features" },
];

export function SubscriptionContent({ user }: SubscriptionContentProps) {
  const isPremium = user.plan !== "free";
  const currentPlan = plans.find((p) => p.id === user.plan) ?? plans[0];

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing.
          </p>
        </div>
      </FadeIn>

      {/* Current Plan */}
      <FadeIn delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl",
                    isPremium ? "bg-primary" : "bg-muted"
                  )}
                >
                  <Crown
                    className={cn(
                      "h-7 w-7",
                      isPremium ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{currentPlan.name}</h3>
                    <Badge variant={isPremium ? "default" : "secondary"}>
                      {isPremium ? "ACTIVE" : "FREE"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {currentPlan.description}
                  </p>
                </div>
              </div>

              {!isPremium && (
                <Button>
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}
            </div>

            {isPremium && (
              <>
                <Separator className="my-6" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Billing Period</p>
                      <p className="text-xs text-muted-foreground">
                        Monthly (renews Jan 15, 2026)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-xs text-muted-foreground">
                        •••• •••• •••• 4242
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Next Invoice</p>
                      <p className="text-xs text-muted-foreground">$19.00</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </FadeIn>

      {/* Usage Stats */}
      <FadeIn delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>Track your AI tool usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tools Used</span>
                  <span className="text-sm text-muted-foreground">
                    {isPremium ? "Unlimited" : "3 / 5"}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: isPremium ? "30%" : "60%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Saved Results</span>
                  <span className="text-sm text-muted-foreground">
                    {isPremium ? "12 / Unlimited" : "12 / 50"}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: "24%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">History Items</span>
                  <span className="text-sm text-muted-foreground">28</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-chart-1 rounded-full transition-all"
                    style={{ width: "40%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Premium Benefits */}
      {!isPremium && (
        <FadeIn delay={0.3}>
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Premium Benefits
              </CardTitle>
              <CardDescription>
                Upgrade to unlock these powerful features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {premiumBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background border"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{benefit.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Plans Comparison */}
      <FadeIn delay={0.4}>
        <div>
          <h2 className="text-xl font-bold mb-4">Compare Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative",
                  plan.highlighted && "border-primary shadow-lg"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="shadow-lg">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.id === user.plan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant={plan.highlighted ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.id === "free" ? "Downgrade" : "Upgrade"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
