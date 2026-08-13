import Razorpay from 'razorpay';
import dayjs from 'dayjs';
import { env } from '../config/env';
import { prisma } from '../lib/prisma';
import { findDatabaseConflict, hasCalendarConflict } from './calendar.service';

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

const usingMockPayment =
  env.RAZORPAY_KEY_ID.toLowerCase().includes('placeholder') ||
  env.RAZORPAY_KEY_SECRET.toLowerCase().includes('placeholder');

export class PaymentOrderCreationError extends Error {
  constructor(
    message: string,
    public readonly statusCode: 400 | 401 | 500,
  ) {
    super(message);
    this.name = 'PaymentOrderCreationError';
  }
}

type BookingPayload = {
  serviceId: string;
  bookingDateTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientTimezone: string;
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
  keyConcern?: string;
  customQuestions?: string;
};

const createRazorpayOrder = async (serviceTitle: string, amount: number) => {
  const amountInPaise = Math.round(amount * 100);

  if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
    throw new PaymentOrderCreationError('Payment amount must be at least 100 paise', 400);
  }

  if (usingMockPayment) {
    return {
      id: `order_${Math.random().toString(36).slice(2, 11)}`,
      amount: amountInPaise,
      currency: 'INR',
      paymentMode: 'mock' as const,
      keyId: env.RAZORPAY_KEY_ID,
    };
  }

  try {
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        serviceTitle,
      },
    });

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentMode: 'razorpay' as const,
      keyId: env.RAZORPAY_KEY_ID,
    };
  } catch (error: any) {
    const statusCode = error?.statusCode ?? error?.status;
    const isAuthFailure = statusCode === 401;

    throw new PaymentOrderCreationError(
      isAuthFailure
        ? 'Razorpay authentication failed'
        : 'Razorpay order creation failed',
      isAuthFailure ? 401 : 500,
    );
  }
};

export const createPendingBooking = async (payload: BookingPayload) => {
  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId },
  });

  if (!service || !service.isActive) {
    throw new Error('Service not found');
  }

  const bookingDateTime = new Date(payload.bookingDateTime);
  const bookingDayKey = dayjs(bookingDateTime).format('YYYY-MM-DD');
  const calendarConflict = await hasCalendarConflict(bookingDateTime, service.durationMin);

  if (calendarConflict) {
    throw new Error('Slot unavailable due to calendar conflict');
  }

  // Charge exactly the configured service price. Razorpay expects INR in paise.
  const totalAmount = service.price;
  const order = await createRazorpayOrder(service.title, totalAmount);

  return prisma.$transaction(async (tx: any) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`booking-day:${bookingDayKey}`}))`;

    const conflict = await findDatabaseConflict(tx, bookingDateTime, service.durationMin);
    if (conflict) {
      throw new Error('Slot already booked or pending');
    }

    const booking = await tx.booking.create({
      data: {
        serviceId: service.id,
        bookingDateTime,
        clientName: payload.clientName,
        clientEmail: payload.clientEmail,
        clientPhone: payload.clientPhone,
        clientTimezone: payload.clientTimezone,
        intakeForm: {
          create: {
            dob: payload.dob ? new Date(payload.dob) : null,
            birthTime: payload.birthTime,
            birthPlace: payload.birthPlace,
            keyConcern: payload.keyConcern,
            customQuestions: payload.customQuestions,
          },
        },
      },
    });

    await tx.payment.create({
      data: {
        bookingId: booking.id,
        orderId: order.id,
        amount: totalAmount,
        currency: 'INR',
        status: 'PENDING',
      },
    });

    return {
      booking,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentMode: order.paymentMode,
      razorpayKeyId: order.keyId,
    };
  });
};
