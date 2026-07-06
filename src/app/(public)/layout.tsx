"use client";

import { PublicNavbar } from "@/components/layouts/public/public-navbar";
import { PublicFooter } from "@/components/layouts/public/public-footer";
import { AuthModal } from "@/components/shared/auth-modal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen">{children}</main>
      <PublicFooter />
      <AuthModal />
    </>
  );
}
