"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { getInitials } from "@/lib/utils";
import { aiTools } from "@/lib/ai-tools";
import type { SessionUser } from "@/types";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Crown,
  Zap,
  History,
  BookmarkCheck,
  Star,
  TrendingUp,
  Clock,
  Bell,
} from "lucide-react";

interface DashboardContentProps {
  user: SessionUser | null;
}

// Mock data for demo
const recentActivity = [
  { id: "1", tool: "Resume Studio", action: "Created resume", time: "2 hours ago" },
  { id: "2", tool: "Content Studio", action: "Generated blog post", time: "5 hours ago" },
  { id: "3", tool: "Interview Coach", action: "Completed practice", time: "1 day ago" },
];

const announcements = [
  {
    id: "1",
    title: "New: AI Travel Planner",
    description: "Plan your perfect trip with AI-powered itineraries.",
    type: "new",
  },
  {
    id: "2",
    title: "Performance Improvements",
    description: "AI responses are now 40% faster across all tools.",
    type: "update",
  },
];

export function DashboardContent({ user }: DashboardContentProps) {
  const greeting = getGreeting();
  const displayName = user?.fullName?.split(" ")[0] || "there";
  const isPremium = user?.plan !== "free";

  // Get favorite tools (first 4 for demo)
  const favoriteTools = aiTools.slice(0, 4);
  const recentlyUsed = aiTools.slice(4, 7);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <FadeIn>
        <Card glass className="overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-4 ring-background shadow-xl">
                    {user?.avatarUrl && (
                      <AvatarImage src={user.avatarUrl} alt={user.fullName ?? ""} />
                    )}
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {user?.fullName ? getInitials(user.fullName) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {greeting}, {displayName}!
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Welcome back to your AI workspace.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={isPremium ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {isPremium ? (
                          <>
                            <Crown className="h-3 w-3 mr-1" />
                            {user?.plan.toUpperCase()}
                          </>
                        ) : (
                          "FREE PLAN"
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/tools">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Explore Tools
                    </Link>
                  </Button>
                  {!isPremium && (
                    <Button asChild>
                      <Link href="/dashboard/subscription">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Pro
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </FadeIn>

      {/* Stats */}
      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tools Used Today</p>
                  <p className="text-3xl font-bold mt-1">3</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isPremium ? "Unlimited" : "5 / day limit"}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved Results</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                  <p className="text-xs text-success mt-1">+3 this week</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <BookmarkCheck className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">History Items</p>
                  <p className="text-3xl font-bold mt-1">28</p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center">
                  <History className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Favorite Tools</p>
                  <p className="text-3xl font-bold mt-1">4</p>
                  <p className="text-xs text-muted-foreground mt-1">Quick access</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Favorite Tools */}
        <FadeIn className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-warning" />
                  Favorite Tools
                </CardTitle>
                <CardDescription>Quick access to your preferred AI tools</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/favorites">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {favoriteTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="flex items-center gap-3 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors group"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tool.gradient}`}
                    >
                      <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{tool.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {tool.category}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Recent Activity */}
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.tool} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                <Link href="/dashboard/history">
                  View all history
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recently Used */}
        <FadeIn className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Recently Used
              </CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-3">
                {recentlyUsed.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="flex flex-col items-center p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors text-center"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} mb-3`}
                    >
                      <tool.icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <p className="font-medium text-sm">{tool.name}</p>
                    <Badge
                      variant={tool.tier === "free" ? "success" : "default"}
                      className="text-[10px] mt-2"
                    >
                      {tool.tier.toUpperCase()}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Announcements */}
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-muted/50 border"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={item.type === "new" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {item.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
