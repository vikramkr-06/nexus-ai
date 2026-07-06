"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserNav } from "@/components/shared/user-nav";
import { MobileNavToggle } from "@/components/shared/mobile-nav";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <MobileNavToggle />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
