import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function GET() {
  const state = uuidv4();
  const cookieStore = await cookies();

  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: AUTH_CONFIG.secureCookies,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: AUTH_CONFIG.github.clientId,
    redirect_uri: AUTH_CONFIG.github.redirectUri,
    scope: "read:user user:email",
    state,
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}
