import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { DashboardSidebar } from "@/components/layouts/dashboard/dashboard-sidebar";
import { DashboardNavbar } from "@/components/layouts/dashboard/dashboard-navbar";
import { UserProvider } from "@/components/providers/user-provider";
import { AuthModal } from "@/components/shared/auth-modal";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <UserProvider user={user}>
      <div className="min-h-screen">
        <DashboardSidebar />
        <div className="lg:pl-64 transition-all duration-300">
          <DashboardNavbar />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
      <AuthModal />
    </UserProvider>
  );
}
