import { Router } from 'express';
import { z } from 'zod';
import { BookingStatus, SessionMode } from '@prisma/client';
import { getDashboardAnalytics } from '../services/analytics.service';
import { prisma } from '../lib/prisma';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

const serviceSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  title: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().or(z.literal('')).optional(),
  durationMin: z.coerce.number().int().min(15).max(480),
  price: z.coerce.number().min(0),
  sessionMode: z.nativeEnum(SessionMode),
  isActive: z.boolean().optional(),
});

router.use(adminMiddleware);

router.get('/dashboard', async (_req, res) => {
  try {
    res.json({ success: true, data: await getDashboardAnalytics() });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ success: false, message: 'Unable to load the admin dashboard.' });
  }
});

router.get('/services', async (_req, res) => {
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
  res.json({ success: true, data: services });
});

router.post('/services', async (req, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, message: 'Invalid service details.', errors: parsed.error.flatten() });
  try {
    const service = await prisma.service.create({ data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null } });
    res.status(201).json({ success: true, data: service });
  } catch (error: any) {
    res.status(409).json({ success: false, message: error.code === 'P2002' ? 'A service with this slug already exists.' : 'Unable to create service.' });
  }
});

router.patch('/services/:id', async (req, res) => {
  const parsed = serviceSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, message: 'Invalid service details.', errors: parsed.error.flatten() });
  try {
    const service = await prisma.service.update({ where: { id: req.params.id }, data: { ...parsed.data, imageUrl: parsed.data.imageUrl === '' ? null : parsed.data.imageUrl } });
    res.json({ success: true, data: service });
  } catch {
    res.status(404).json({ success: false, message: 'Service not found.' });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    const service = await prisma.service.update({ where: { id: req.params.id }, data: { isActive: false } });
    res.json({ success: true, data: service });
  } catch {
    res.status(404).json({ success: false, message: 'Service not found.' });
  }
});

router.patch('/bookings/:id/status', async (req, res) => {
  const parsed = z.object({ status: z.nativeEnum(BookingStatus) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ success: false, message: 'Invalid booking status.' });
  try {
    const booking = await prisma.booking.update({ where: { id: req.params.id }, data: parsed.data });
    res.json({ success: true, data: booking });
  } catch {
    res.status(404).json({ success: false, message: 'Booking not found.' });
  }
});

export default router;
