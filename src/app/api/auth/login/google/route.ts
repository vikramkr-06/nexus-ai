import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const state = uuidv4();
  const cookieStore = await cookies();

  // Get callback URL from query params
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  
  // Store state and callback URL
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: AUTH_CONFIG.secureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  if (callbackUrl) {
    cookieStore.set("oauth_callback", callbackUrl, {
      httpOnly: true,
      secure: AUTH_CONFIG.secureCookies,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
  }

  const params = new URLSearchParams({
    client_id: AUTH_CONFIG.google.clientId,
    redirect_uri: AUTH_CONFIG.google.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}
