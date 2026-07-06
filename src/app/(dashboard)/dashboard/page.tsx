import { getCurrentUser } from "@/lib/auth/session";
import { DashboardContent } from "./dashboard-content";

export const metadata = {
  title: "Dashboard — NexusAI",
  description: "Your AI tools dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return <DashboardContent user={user} />;
}
