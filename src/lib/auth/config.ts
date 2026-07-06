export const AUTH_CONFIG = {
  sessionCookieName: "session_token",
  sessionMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  secureCookies: process.env.NODE_ENV === "production",
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://nexus-ai-two-indol.vercel.app"}/api/auth/callback/google`,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL ?? "https://nexus-ai-two-indol.vercel.app"}/api/auth/callback/github`,
  },
} as const;
