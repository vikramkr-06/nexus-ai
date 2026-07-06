import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { findOrCreateOAuthUser } from "@/lib/auth/oauth";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const callbackUrl = cookieStore.get("oauth_callback")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_state", request.url)
    );
  }

  cookieStore.delete("oauth_state");
  cookieStore.delete("oauth_callback");

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: AUTH_CONFIG.google.clientId,
        client_secret: AUTH_CONFIG.google.clientSecret,
        redirect_uri: AUTH_CONFIG.google.redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      console.error(await tokenResponse.text());
      return NextResponse.redirect(
        new URL("/login?error=token_exchange_failed", request.url)
      );
    }

    const tokens = await tokenResponse.json();

    console.log("Google Token Response:", tokens);

    // Get user info
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    if (!userInfoResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=user_info_failed", request.url)
      );
    }

    const userInfo = await userInfoResponse.json();
    console.log("Google User Info:", userInfo);

    const userId = await findOrCreateOAuthUser({
      provider: "google",
      providerAccountId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name ?? null,
      avatarUrl: userInfo.picture ?? null,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";

    const token = await createSession(userId, ip, ua);
    await setSessionCookie(token);

    // Redirect to callback URL or dashboard
    const redirectUrl = callbackUrl ?? "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch {
    console.error("Google OAuth Error:", error);
    return NextResponse.redirect(
      new URL("/login?error=auth_failed", request.url)
    );
  }
}
