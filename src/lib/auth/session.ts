import { db } from "@/db";
import { sessions, users, profiles, subscriptions } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { AUTH_CONFIG } from "./config";
import type { SessionUser } from "@/types";

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const token = uuidv4();
  const expiresAt = new Date(
    Date.now() + AUTH_CONFIG.sessionMaxAge * 1000
  );

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
    ipAddress: ipAddress ?? null,
    userAgent: userAgent ?? null,
  });

  return token;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_CONFIG.sessionCookieName, token, {
    httpOnly: true,
    secure: AUTH_CONFIG.secureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_CONFIG.sessionMaxAge,
  });
}

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_CONFIG.sessionCookieName)?.value ?? null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const result = await db
    .select({
      userId: users.id,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
      fullName: profiles.fullName,
      avatarUrl: profiles.avatarUrl,
      plan: subscriptions.plan,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .leftJoin(profiles, eq(users.id, profiles.userId))
    .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
    .where(
      and(eq(sessions.token, token), gt(sessions.expiresAt, new Date()))
    )
    .limit(1);

  if (result.length === 0) return null;

  const row = result[0];
  if (!row.isActive) return null;

  return {
    id: row.userId,
    email: row.email,
    role: row.role,
    fullName: row.fullName,
    avatarUrl: row.avatarUrl,
    plan: row.plan ?? "free",
  };
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.token, token));
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONFIG.sessionCookieName);
}
