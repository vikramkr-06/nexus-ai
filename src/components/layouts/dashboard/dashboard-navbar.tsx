"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { UserNav } from "@/components/shared/user-nav";
import { MobileNavToggle } from "@/components/shared/mobile-nav";
import { NotificationPopover } from "@/components/shared/notification-popover";
import { SearchBox } from "@/components/ui/search-box";
import { useState } from "react";

export function DashboardNavbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <MobileNavToggle />
        <div className="hidden sm:block">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search tools, results..."
            className="w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NotificationPopover />
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
