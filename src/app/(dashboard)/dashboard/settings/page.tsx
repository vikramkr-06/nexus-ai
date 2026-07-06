import { getCurrentUser } from "@/lib/auth/session";
import { SettingsContent } from "./settings-content";

export const metadata = {
  title: "Settings — NexusAI",
  description: "Manage your account settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <SettingsContent user={user} />;
}
