"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBox } from "@/components/ui/search-box";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { aiTools } from "@/lib/ai-tools";
import { formatDate } from "@/lib/utils";
import {
  BookmarkCheck,
  Star,
  StarOff,
  Eye,
  Trash2,
  Download,
  LayoutGrid,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo data
const demoSaved = [
  {
    id: "1",
    toolId: "resume-studio",
    title: "Software Engineer Resume v2",
    preview: "Updated resume with new project experience and skills...",
    createdAt: new Date().toISOString(),
    isFavorite: true,
  },
  {
    id: "2",
    toolId: "content-studio",
    title: "Marketing Copy - Product Launch",
    preview: "Compelling marketing copy for our new product launch campaign...",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isFavorite: true,
  },
  {
    id: "3",
    toolId: "legal-draft",
    title: "NDA Template",
    preview: "Non-disclosure agreement template for business partnerships...",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isFavorite: false,
  },
  {
    id: "4",
    toolId: "travel-planner",
    title: "Europe Trip 2026",
    preview: "Complete 14-day itinerary covering Paris, Rome, and Barcelona...",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isFavorite: false,
  },
];

export function SavedContent() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(demoSaved.filter((s) => s.isFavorite).map((s) => s.id))
  );

  const filteredSaved = demoSaved.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.preview.toLowerCase().includes(search.toLowerCase())
  );

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

  const getTool = (toolId: string) => {
    return aiTools.find((t) => t.id === toolId);
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Saved Results</h1>
            <p className="text-muted-foreground">
              Access and manage your saved AI-generated content.
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search saved results..."
            className="sm:w-80"
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border p-1">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon-sm"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        {filteredSaved.length === 0 ? (
          <EmptyState
            icon={<BookmarkCheck className="h-8 w-8 text-muted-foreground" />}
            title="No saved results"
            description={
              search
                ? "Try adjusting your search"
                : "Save AI-generated content to access it here"
            }
            action={
              search
                ? {
                    label: "Clear search",
                    onClick: () => setSearch(""),
                  }
                : undefined
            }
          />
        ) : (
          <StaggerContainer
            className={cn(
              view === "grid"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-3"
            )}
          >
            {filteredSaved.map((item) => {
              const tool = getTool(item.toolId);
              const isFavorite = favorites.has(item.id);

              if (view === "grid") {
                return (
                  <StaggerItem key={item.id}>
                    <Card className="group h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          {tool && (
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient}`}
                            >
                              <tool.icon
                                className={`h-5 w-5 ${tool.color}`}
                              />
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            {isFavorite ? (
                              <Star className="h-4 w-4 text-warning fill-warning" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <h3 className="font-semibold line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">
                          {item.preview}
                        </p>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.createdAt)}
                          </span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon-sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              }

              return (
                <StaggerItem key={item.id}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {tool && (
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                          >
                            <tool.icon className={`h-6 w-6 ${tool.color}`} />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold truncate">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {item.preview}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground mr-2 hidden sm:block">
                            {formatDate(item.createdAt)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            {isFavorite ? (
                              <Star className="h-4 w-4 text-warning fill-warning" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

        {filteredSaved.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={2}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </FadeIn>
    </div>
  );
}
