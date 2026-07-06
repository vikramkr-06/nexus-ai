import { getCurrentUser } from "@/lib/auth/session";
import { SubscriptionContent } from "./subscription-content";

export const metadata = {
  title: "Subscription — NexusAI",
  description: "Manage your subscription",
};

export default async function SubscriptionPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return <SubscriptionContent user={user} />;
}
