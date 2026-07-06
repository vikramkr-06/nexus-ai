import { db } from "@/db";
import {
  users,
  profiles,
  authAccounts,
  subscriptions,
  userSettings,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { AuthProvider } from "@/types";

interface OAuthUserData {
  provider: AuthProvider;
  providerAccountId: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  accessToken: string;
  refreshToken?: string;
}

export async function findOrCreateOAuthUser(
  data: OAuthUserData
): Promise<string> {
  // Check if auth account already exists
  const existingAccount = await db
    .select({ userId: authAccounts.userId })
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.provider, data.provider),
        eq(authAccounts.providerAccountId, data.providerAccountId)
      )
    )
    .limit(1);

  if (existingAccount.length > 0) {
    // Update tokens
    await db
      .update(authAccounts)
      .set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(authAccounts.provider, data.provider),
          eq(authAccounts.providerAccountId, data.providerAccountId)
        )
      );
    return existingAccount[0].userId;
  }

  // Check if user with this email exists
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  let userId: string;

  if (existingUser.length > 0) {
    userId = existingUser[0].id;
  } else {
    // Create new user
    const newUser = await db
      .insert(users)
      .values({ email: data.email })
      .returning({ id: users.id });
    userId = newUser[0].id;

    // Create profile
    await db.insert(profiles).values({
      userId,
      fullName: data.name,
      avatarUrl: data.avatarUrl,
    });

    // Create default subscription
    await db.insert(subscriptions).values({
      userId,
      plan: "free",
      status: "active",
    });

    // Create default settings
    await db.insert(userSettings).values({
      userId,
      theme: "system",
    });
  }

  // Link auth account
  await db.insert(authAccounts).values({
    userId,
    provider: data.provider,
    providerAccountId: data.providerAccountId,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken ?? null,
  });

  return userId;
}
