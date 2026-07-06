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
    // Exchange code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: AUTH_CONFIG.github.clientId,
          client_secret: AUTH_CONFIG.github.clientSecret,
          code,
          redirect_uri: AUTH_CONFIG.github.redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=token_exchange_failed", request.url)
      );
    }

    const tokens = await tokenResponse.json();

    if (tokens.error) {
      return NextResponse.redirect(
        new URL(`/login?error=${tokens.error}`, request.url)
      );
    }

    // Get user info
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!userResponse.ok) {
      return NextResponse.redirect(
        new URL("/login?error=user_info_failed", request.url)
      );
    }

    const userInfo = await userResponse.json();

    // Get user email (may be private)
    let email = userInfo.email;
    if (!email) {
      const emailsResponse = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find(
          (e: { primary: boolean; verified: boolean }) =>
            e.primary && e.verified
        );
        email = primaryEmail?.email ?? emails[0]?.email;
      }
    }

    if (!email) {
      return NextResponse.redirect(
        new URL("/login?error=no_email", request.url)
      );
    }

    const userId = await findOrCreateOAuthUser({
      provider: "github",
      providerAccountId: String(userInfo.id),
      email,
      name: userInfo.name ?? userInfo.login ?? null,
      avatarUrl: userInfo.avatar_url ?? null,
      accessToken: tokens.access_token,
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
    return NextResponse.redirect(
      new URL("/login?error=auth_failed", request.url)
    );
  }
}
