"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useSidebarStore } from "@/store/use-sidebar-store";
import { useUserStore } from "@/store/use-user-store";
import { dashboardNavigation, type NavGroup } from "@/lib/navigation";
import { ChevronsLeft, ChevronsRight, LogOut, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardSidebarProps {
  navGroups?: NavGroup[];
}

export function DashboardSidebar({
  navGroups = dashboardNavigation,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, isCollapsed, close, toggleCollapse } = useSidebarStore();
  const user = useUserStore((s) => s.user);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
      }
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[68px]" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Logo collapsed={isCollapsed} />
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden lg:flex"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav
            className="flex flex-col gap-6 px-3"
            aria-label="Dashboard navigation"
          >
            {navGroups.map((group) => (
              <div key={group.title}>
                {!isCollapsed && (
                  <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </p>
                )}
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        item.href !== "/admin" &&
                        pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/70",
                          isCollapsed && "justify-center px-2"
                        )}
                        title={isCollapsed ? item.title : undefined}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isActive && "text-primary"
                          )}
                        />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Logout */}
            <div className="border-t pt-4">
              <button
                onClick={handleLogout}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </ScrollArea>

        {/* Upgrade card */}
        {!isCollapsed && user?.plan === "free" && (
          <div className="border-t p-4">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Upgrade to Pro</p>
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">
                Unlock unlimited AI tools and premium features.
              </p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/dashboard/subscription">Upgrade Now</Link>
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
