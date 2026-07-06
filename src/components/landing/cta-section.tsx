"use client";

import { Section } from "@/components/shared/section";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuthModalStore } from "@/store/use-auth-modal-store";
import { useUserStore } from "@/store/use-user-store";

export function CtaSection() {
  const user = useUserStore((s) => s.user);
  const openAuthModal = useAuthModalStore((s) => s.open);

  return (
    <Section container={false}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 p-10 sm:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-0">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground mb-6">
                <Sparkles className="h-4 w-4" />
                Start building with AI today
              </div>

              <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl tracking-tight">
                Ready to Supercharge
                <br />
                Your Workflow?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
                Join thousands of professionals using NexusAI to save time and
                produce better results with AI-powered tools.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="xl"
                  variant="secondary"
                  asChild
                  className="w-full sm:w-auto text-foreground font-semibold shadow-lg"
                >
                  <Link href="#tools">
                    Explore Tools
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {!user ? (
                  <Button
                    size="xl"
                    variant="outline"
                    className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                    onClick={() => openAuthModal()}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    size="xl"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                  >
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
