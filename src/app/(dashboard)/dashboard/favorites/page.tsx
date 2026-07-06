"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { aiTools } from "@/lib/ai-tools";
import { Star, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";

// Demo favorites - first 4 tools
const favoriteToolIds = [
  "resume-studio",
  "interview-coach",
  "content-studio",
  "travel-planner",
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(
    aiTools.filter((t) => favoriteToolIds.includes(t.id))
  );

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">Favorite Tools</h1>
          <p className="text-muted-foreground">
            Quick access to your most-used AI tools.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        {favorites.length === 0 ? (
          <EmptyState
            icon={<Star className="h-8 w-8 text-muted-foreground" />}
            title="No favorite tools"
            description="Star your favorite tools to access them quickly from here"
            action={{
              label: "Browse Tools",
              onClick: () => (window.location.href = "/dashboard/tools"),
            }}
          />
        ) : (
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((tool) => (
              <StaggerItem key={tool.id}>
                <Card className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                      >
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeFavorite(tool.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>

                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tool.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <Badge
                        variant={tool.tier === "free" ? "success" : "default"}
                        className="text-xs"
                      >
                        {tool.tier.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={tool.href}>
                          Use Tool
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </FadeIn>
    </div>
  );
}
