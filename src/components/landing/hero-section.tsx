"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-chart-4/8 blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-0 h-[300px] w-[300px] rounded-full bg-chart-2/6 blur-[80px] animate-pulse [animation-delay:4s]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground shadow-sm mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by Google Gemini AI</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                NEW
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              All Your{" "}
              <span className="bg-gradient-to-r from-primary via-chart-1 to-primary bg-clip-text text-transparent">
                AI Tools
              </span>
              <br />
              in One Platform
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              From resume building to legal drafts, tax assistance to interview
              coaching — access 10+ professional AI tools without switching
              platforms.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="w-full sm:w-auto shadow-lg shadow-primary/20">
                <Link href="#tools">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="#tools">Explore AI Tools</Link>
              </Button>
            </div>
          </FadeIn>

          {/* Floating glass cards */}
          <FadeIn delay={0.5}>
            <div className="relative mt-20">
              <div className="mx-auto max-w-3xl">
                {/* Main glass card preview */}
                <div className="rounded-2xl border bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 p-1">
                  <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-3 w-3 rounded-full bg-destructive/60" />
                      <div className="h-3 w-3 rounded-full bg-warning/60" />
                      <div className="h-3 w-3 rounded-full bg-success/60" />
                      <div className="ml-4 h-5 w-48 rounded-md bg-muted-foreground/10" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Resume Studio", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
                        { label: "Legal Draft", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
                        { label: "Tax Assistant", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
                        { label: "Interview Coach", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
                        { label: "Content Studio", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
                        { label: "Travel Planner", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`rounded-xl ${item.color} p-3 text-xs font-medium text-center`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="h-3 w-full rounded-full bg-muted-foreground/8" />
                      <div className="h-3 w-4/5 rounded-full bg-muted-foreground/6" />
                      <div className="h-3 w-3/5 rounded-full bg-muted-foreground/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative blurs behind the card */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-20 w-3/4 rounded-full bg-primary/10 blur-3xl -z-10" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
