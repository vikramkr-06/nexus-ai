import { NextResponse } from "next/server";
import {
  getSessionToken,
  deleteSession,
  clearSessionCookie,
} from "@/lib/auth/session";

export async function POST() {
  try {
    const token = await getSessionToken();
    if (token) {
      await deleteSession(token);
    }
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  } catch {
    await clearSessionCookie();
    return NextResponse.json({ success: true });
  }
}
