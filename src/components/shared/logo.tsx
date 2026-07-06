"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-bold text-xl tracking-tight",
        className
      )}
      aria-label="NexusAI Home"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
        <Sparkles className="h-5 w-5 text-primary-foreground" />
      </div>
      {!collapsed && (
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          NexusAI
        </span>
      )}
    </Link>
  );
}
