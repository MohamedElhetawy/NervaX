import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || !ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid password." },
        { status: 401 }
      );
    }

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("nervax_admin_token", generateToken(ADMIN_PASSWORD), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 365 * 10, // 10 years (stays logged in until manual logout)
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

function generateToken(password: string): string {
  // Simple hash-based token for session validation
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "_nervax_admin_" + Date.now().toString(36));
  let hash = 0;
  for (const byte of data) {
    hash = ((hash << 5) - hash + byte) | 0;
  }
  return Math.abs(hash).toString(36) + "_" + Date.now().toString(36);
}
