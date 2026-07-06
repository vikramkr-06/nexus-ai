"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { useAuthModalStore } from "@/store/use-auth-modal-store";
import { UserNav } from "@/components/shared/user-nav";

const navLinks = [
  { title: "Features", href: "#features" },
  { title: "Tools", href: "#tools" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
];

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useUserStore((s) => s.user);
  const openAuthModal = useAuthModalStore((s) => s.open);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild size="sm" variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserNav />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openAuthModal()}
              >
                Log in
              </Button>
              <Button size="sm" onClick={() => openAuthModal()}>
                Get Started
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out border-t",
          mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}
          {user ? (
            <div className="mt-2 pt-2 border-t">
              <Button size="sm" asChild className="w-full">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal();
                }}
              >
                Log in
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal();
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
