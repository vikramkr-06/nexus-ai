"use client";

import { Section, SectionHeader } from "@/components/shared/section";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { aiTools } from "@/lib/ai-tools";
import { useUserStore } from "@/store/use-user-store";
import { useAuthModalStore } from "@/store/use-auth-modal-store";
import Link from "next/link";

export function ToolsSection() {
  const user = useUserStore((s) => s.user);
  const openAuthModal = useAuthModalStore((s) => s.open);

  const handleUseTool = (toolHref: string) => {
    if (!user) {
      openAuthModal(toolHref);
    } else {
      window.location.href = toolHref;
    }
  };

  return (
    <Section id="tools">
      <FadeIn>
        <SectionHeader
          badge="AI Tools Suite"
          title="Powerful AI Tools for Every Need"
          description="From career advancement to business strategy — our AI-powered tools help you accomplish more in less time."
        />
      </FadeIn>

      <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiTools.map((tool) => (
          <StaggerItem key={tool.id}>
            <ScaleOnHover>
              <div className="group relative flex flex-col h-full rounded-2xl border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
                {/* Top gradient accent */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${tool.gradient}`}
                />

                <div className="flex flex-col flex-1 p-6">
                  {/* Icon and Badge row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                    >
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <Badge
                      variant={tool.tier === "free" ? "success" : "default"}
                      className="text-[10px]"
                    >
                      {tool.tier === "free" ? "FREE" : "PREMIUM"}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {tool.description}
                  </p>

                  {/* Category tag */}
                  <div className="mt-4 mb-5">
                    <span className="text-[11px] font-medium text-muted-foreground bg-muted rounded-md px-2 py-1">
                      {tool.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUseTool(tool.href)}
                    >
                      Use Tool
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={tool.href}>
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="sr-only">Learn More</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScaleOnHover>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
