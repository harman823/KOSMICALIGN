"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const login = async (event: React.FormEvent) => { event.preventDefault(); const response = await fetch("/api/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) }); if (!response.ok) return setError("Incorrect password."); router.push("/dashboard"); };
  return (
    <main className="grid min-h-svh place-items-center bg-muted/30 p-4"><Card className="w-full max-w-sm"><CardHeader><CardTitle>KosmicAlign admin</CardTitle><CardDescription>Manage services, client bookings, and upcoming sessions.</CardDescription></CardHeader><CardContent><form onSubmit={login} className="flex flex-col gap-4"><Input type="password" aria-label="Admin password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />{error && <p className="text-sm text-destructive">{error}</p>}<Button type="submit">Sign in</Button></form></CardContent></Card></main>
  )
}
