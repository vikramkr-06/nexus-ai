"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBox } from "@/components/ui/search-box";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { aiTools } from "@/lib/ai-tools";
import { formatDate } from "@/lib/utils";
import {
  History,
  Star,
  StarOff,
  Eye,
  Trash2,
  Download,
  Filter,
  Calendar,
} from "lucide-react";

// Demo data
const demoHistory = [
  {
    id: "1",
    toolId: "resume-studio",
    title: "Software Engineer Resume",
    preview: "Created a professional resume for a senior software engineer position...",
    createdAt: new Date().toISOString(),
    isFavorite: true,
  },
  {
    id: "2",
    toolId: "content-studio",
    title: "Blog Post: AI in 2026",
    preview: "The future of artificial intelligence is rapidly evolving...",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isFavorite: false,
  },
  {
    id: "3",
    toolId: "interview-coach",
    title: "Technical Interview Practice",
    preview: "Practiced answering common technical interview questions...",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isFavorite: true,
  },
  {
    id: "4",
    toolId: "travel-planner",
    title: "Tokyo 7-Day Itinerary",
    preview: "Complete travel plan for a week-long trip to Tokyo, Japan...",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isFavorite: false,
  },
  {
    id: "5",
    toolId: "document-translator",
    title: "Contract Translation EN-ES",
    preview: "Translated business contract from English to Spanish...",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    isFavorite: false,
  },
];

const tabs = [
  { value: "all", label: "All History" },
  { value: "resume", label: "Resume" },
  { value: "content", label: "Content" },
  { value: "translation", label: "Translation" },
  { value: "assignment", label: "Assignments" },
  { value: "interview", label: "Interview" },
  { value: "business", label: "Business" },
  { value: "travel", label: "Travel" },
  { value: "legal", label: "Legal" },
  { value: "tax", label: "Tax" },
];

export function HistoryContent() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(demoHistory.filter((h) => h.isFavorite).map((h) => h.id))
  );

  const filteredHistory = demoHistory.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.preview.toLowerCase().includes(search.toLowerCase());
    const matchesTab =
      activeTab === "all" || item.toolId.includes(activeTab);
    return matchesSearch && matchesTab;
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

  const getTool = (toolId: string) => {
    return aiTools.find((t) => t.id === toolId);
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">History</h1>
            <p className="text-muted-foreground">
              View and manage your AI tool usage history.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search history..."
            className="sm:w-80"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-max">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            {filteredHistory.length === 0 ? (
              <EmptyState
                icon={<History className="h-8 w-8 text-muted-foreground" />}
                title="No history found"
                description={
                  search
                    ? "Try adjusting your search or filters"
                    : "Start using AI tools to see your history here"
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
              <StaggerContainer className="space-y-3">
                {filteredHistory.map((item) => {
                  const tool = getTool(item.toolId);
                  const isFavorite = favorites.has(item.id);

                  return (
                    <StaggerItem key={item.id}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {tool && (
                              <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient}`}
                              >
                                <tool.icon
                                  className={`h-6 w-6 ${tool.color}`}
                                />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold truncate">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {item.preview}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  {tool && (
                                    <Badge variant="secondary" className="text-xs">
                                      {tool.name}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {formatDate(item.createdAt)}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}

            {filteredHistory.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={3}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}
