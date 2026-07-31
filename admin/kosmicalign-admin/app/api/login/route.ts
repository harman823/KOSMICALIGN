import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PORTAL_PASSWORD || password !== process.env.ADMIN_PORTAL_PASSWORD) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("kosmicalign_admin", "authenticated", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return response;
}
