"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBox } from "@/components/ui/search-box";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";
import { aiTools } from "@/lib/ai-tools";
import { useUserStore } from "@/store/use-user-store";
import { useAuthModalStore } from "@/store/use-auth-modal-store";
import { ArrowRight, Star, StarOff, Sparkles } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Career",
  "Business",
  "Education",
  "Legal",
  "Finance",
  "Marketing",
  "Productivity",
  "Lifestyle",
];

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(["resume-studio", "interview-coach"])
  );
  const user = useUserStore((s) => s.user);
  const openAuthModal = useAuthModalStore((s) => s.open);

  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleUseTool = (toolHref: string) => {
    if (!user) {
      openAuthModal(toolHref);
    } else {
      window.location.href = toolHref;
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold">AI Tools</h1>
          <p className="text-muted-foreground">
            Explore our collection of AI-powered tools.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search tools..."
            className="sm:w-80"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <StaggerItem key={tool.id}>
              <ScaleOnHover>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                      >
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge
                          variant={tool.tier === "free" ? "success" : "default"}
                          className="text-xs"
                        >
                          {tool.tier.toUpperCase()}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => toggleFavorite(tool.id)}
                        >
                          {favorites.has(tool.id) ? (
                            <Star className="h-4 w-4 text-warning fill-warning" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-semibold">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">
                      {tool.description}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUseTool(tool.href)}
                      >
                        Use Tool
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={tool.href}>Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>
    </div>
  );
}
