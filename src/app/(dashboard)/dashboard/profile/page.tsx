import { getCurrentUser } from "@/lib/auth/session";
import { ProfileContent } from "./profile-content";
import { db } from "@/db";
import { profiles, users, subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const metadata = {
  title: "Profile — NexusAI",
  description: "Manage your profile settings",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Fetch full profile data
  const profileData = await db
    .select({
      profile: profiles,
      user: users,
      subscription: subscriptions,
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
    .where(eq(users.id, user.id))
    .limit(1);

  const data = profileData[0];

  return (
    <ProfileContent
      user={user}
      profile={data?.profile ?? null}
      joinedAt={data?.user?.createdAt?.toISOString() ?? new Date().toISOString()}
    />
  );
}
