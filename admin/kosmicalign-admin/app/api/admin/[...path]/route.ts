import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function forward(request: Request, context: { params: Promise<{ path: string[] }> }) {
  if ((await cookies()).get("kosmicalign_admin")?.value !== "authenticated") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { path } = await context.params;
  const baseUrl = process.env.BACKEND_API_URL;
  const adminKey = process.env.BACKEND_ADMIN_KEY;
  if (!baseUrl || !adminKey) return NextResponse.json({ message: "Admin API is not configured." }, { status: 500 });
  const url = `${baseUrl.replace(/\/$/, "")}/admin/${path.join("/")}`;
  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.text();
  const response = await fetch(url, {
    method: request.method,
    headers: { "content-type": "application/json", "x-admin-key": adminKey },
    body,
    cache: "no-store",
  });
  return new NextResponse(await response.text(), { status: response.status, headers: { "content-type": response.headers.get("content-type") || "application/json" } });
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
export const DELETE = forward;
