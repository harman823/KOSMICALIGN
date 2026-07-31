"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Service = { id: string; slug: string; title: string; description: string; durationMin: number; price: number; sessionMode: "ONLINE" | "OFFLINE"; isActive: boolean };
type Booking = { id: string; clientName: string; clientEmail: string; clientPhone: string; bookingDateTime: string; status: string; service: { title: string } };
type Dashboard = { summary: { totalBookings: number; bookingsConfirmed: number; pendingBookings: number; upcomingSessions: number; uniqueCustomers: number }; recentBookings: Booking[]; upcomingSchedule: Booking[] };
type ServiceDraft = Omit<Service, "id">;

const emptyService: ServiceDraft = { slug: "", title: "", description: "", durationMin: 60, price: 0, sessionMode: "ONLINE", isActive: true };

export default function DashboardPage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [draft, setDraft] = useState(emptyService);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const [dashboardResponse, servicesResponse] = await Promise.all([fetch("/api/admin/dashboard"), fetch("/api/admin/services")]);
    if (dashboardResponse.status === 401) return router.replace("/");
    const [dashboardJson, servicesJson] = await Promise.all([dashboardResponse.json(), servicesResponse.json()]);
    setDashboard(dashboardJson.data);
    setServices(servicesJson.data || []);
  };

  useEffect(() => { load().catch(() => toast.error("Could not load admin data.")); }, []);

  const saveService = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(editingId ? `/api/admin/services/${editingId}` : "/api/admin/services", {
      method: editingId ? "PATCH" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(draft),
    });
    const json = await response.json();
    if (!response.ok) return toast.error(json.message || "Could not save service.");
    toast.success(editingId ? "Service updated." : "Service saved.");
    setDraft(emptyService); setEditingId(null); load();
  };

  const editService = (service: Service) => {
    setEditingId(service.id);
    setDraft({ slug: service.slug, title: service.title, description: service.description, durationMin: service.durationMin, price: service.price, sessionMode: service.sessionMode, isActive: service.isActive });
  };
  const archiveService = async (id: string) => { await fetch(`/api/admin/services/${id}`, { method: "DELETE" }); toast.success("Service archived."); load(); };
  const changeStatus = async (id: string, status: string) => { await fetch(`/api/admin/bookings/${id}/status`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) }); toast.success("Booking updated."); load(); };
  const logout = async () => { await fetch("/api/logout", { method: "POST" }); router.replace("/"); };
  const metrics = dashboard ? [["Bookings", dashboard.summary.totalBookings], ["Confirmed", dashboard.summary.bookingsConfirmed], ["Awaiting", dashboard.summary.pendingBookings], ["Next sessions", dashboard.summary.upcomingSessions], ["Clients", dashboard.summary.uniqueCustomers]] : [];

  return <main className="mx-auto min-h-svh max-w-7xl p-4 sm:p-8"><header className="mb-8 flex items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">KosmicAlign</p><h1 className="text-2xl font-semibold">Admin workspace</h1></div><Button variant="outline" onClick={logout}>Sign out</Button></header><Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="services">Services</TabsTrigger><TabsTrigger value="bookings">Bookings</TabsTrigger></TabsList><TabsContent value="overview" className="mt-6 flex flex-col gap-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{metrics.map(([label, value]) => <Card key={String(label)}><CardHeader><CardDescription>{label}</CardDescription><CardTitle>{value}</CardTitle></CardHeader></Card>)}</div><BookingTable title="Upcoming sessions" bookings={dashboard?.upcomingSchedule || []} onStatus={changeStatus} /></TabsContent><TabsContent value="services" className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]"><Card><CardHeader><CardTitle>Services</CardTitle><CardDescription>Prices and service details shown on the storefront.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Service</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader><TableBody>{services.map(service => <TableRow key={service.id}><TableCell><p className="font-medium">{service.title}</p><p className="text-xs text-muted-foreground">{service.durationMin} min · {service.sessionMode}</p></TableCell><TableCell>₹{service.price}</TableCell><TableCell><Badge variant={service.isActive ? "secondary" : "outline"}>{service.isActive ? "Active" : "Archived"}</Badge></TableCell><TableCell className="space-x-1"><Button size="sm" variant="ghost" onClick={() => editService(service)}>Edit</Button><Button size="sm" variant="ghost" disabled={!service.isActive} onClick={() => archiveService(service.id)}>Archive</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card><Card><CardHeader><CardTitle>{editingId ? "Edit service" : "Add service"}</CardTitle><CardDescription>Changes become available to the storefront immediately.</CardDescription></CardHeader><CardContent><form className="flex flex-col gap-4" onSubmit={saveService}><Input placeholder="Service title" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} required /><Input placeholder="service-slug" value={draft.slug} onChange={e => setDraft({ ...draft, slug: e.target.value })} required /><Textarea placeholder="Service description" value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} required /><div className="grid grid-cols-2 gap-3"><Input type="number" min="0" placeholder="Price" value={draft.price} onChange={e => setDraft({ ...draft, price: Number(e.target.value) })} required /><Input type="number" min="15" placeholder="Minutes" value={draft.durationMin} onChange={e => setDraft({ ...draft, durationMin: Number(e.target.value) })} required /></div><div className="flex gap-2"><Button type="submit">{editingId ? "Update service" : "Save service"}</Button>{editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setDraft(emptyService); }}>Cancel</Button>}</div></form></CardContent></Card></TabsContent><TabsContent value="bookings" className="mt-6"><BookingTable title="Client bookings" bookings={dashboard?.recentBookings || []} onStatus={changeStatus} /></TabsContent></Tabs></main>;
}

function BookingTable({ title, bookings, onStatus }: { title: string; bookings: Booking[]; onStatus: (id: string, status: string) => void }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>Client contact details are retained with each booking in Supabase.</CardDescription></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Client</TableHead><TableHead>Session</TableHead><TableHead>When</TableHead><TableHead>Status</TableHead><TableHead /></TableRow></TableHeader><TableBody>{bookings.map(booking => <TableRow key={booking.id}><TableCell><p className="font-medium">{booking.clientName}</p><p className="text-xs text-muted-foreground">{booking.clientEmail}<br />{booking.clientPhone}</p></TableCell><TableCell>{booking.service.title}</TableCell><TableCell>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(booking.bookingDateTime))}</TableCell><TableCell><Badge variant="secondary">{booking.status}</Badge></TableCell><TableCell><Button size="sm" variant="outline" onClick={() => onStatus(booking.id, booking.status === "PENDING" ? "CONFIRMED" : "CANCELLED")}>{booking.status === "PENDING" ? "Confirm" : "Cancel"}</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}
