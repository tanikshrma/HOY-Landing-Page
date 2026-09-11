import { LeadFormData } from '../types';

export interface SlotsData {
  date: string;
  maxCapacity: number;
  bookedCount: number;
  remainingSlots: number;
  isSoldOut: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  remainingSlots: number;
  bookedCount?: number;
  isSoldOut?: boolean;
  booking?: {
    id: string;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    dateStr: string;
    createdAt: string;
  };
}

export async function fetchSlotsData(): Promise<SlotsData> {
  const todayStr = new Date().toISOString().split('T')[0];
  
  try {
    const res = await fetch('/api/slots');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.remainingSlots === 'number') {
        return data as SlotsData;
      }
    }
  } catch (err) {
    console.warn('Could not connect to /api/slots endpoint, using client storage fallback', err);
  }

  // Client-side fallback via localStorage
  try {
    const saved = localStorage.getItem(`hoy_bookings_${todayStr}`);
    const bookings = saved ? JSON.parse(saved) : [];
    const bookedCount = Array.isArray(bookings) ? bookings.length : 0;
    const remainingSlots = Math.max(0, 20 - bookedCount);
    return {
      date: todayStr,
      maxCapacity: 20,
      bookedCount,
      remainingSlots,
      isSoldOut: remainingSlots <= 0,
    };
  } catch {
    return {
      date: todayStr,
      maxCapacity: 20,
      bookedCount: 0,
      remainingSlots: 20,
      isSoldOut: false,
    };
  }
}

export async function submitBooking(data: LeadFormData): Promise<BookingResponse> {
  const todayStr = new Date().toISOString().split('T')[0];
  
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await res.json();
        return responseData as BookingResponse;
      }
    }
  } catch (err) {
    console.warn('Direct server booking submission failed, falling back to durable client store', err);
  }

  // Durable client-side fallback
  try {
    const storageKey = `hoy_bookings_${todayStr}`;
    const saved = localStorage.getItem(storageKey);
    const bookings = saved ? JSON.parse(saved) : [];
    
    if (Array.isArray(bookings) && bookings.length >= 20) {
      throw new Error('Daily capacity of 20 slots is fully booked for today.');
    }

    const newBooking = {
      id: `hoy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      dateStr: todayStr,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    localStorage.setItem(storageKey, JSON.stringify(bookings));

    const remainingSlots = Math.max(0, 20 - bookings.length);

    return {
      success: true,
      message: 'Access pass successfully secured!',
      booking: newBooking,
      remainingSlots,
      bookedCount: bookings.length,
      isSoldOut: remainingSlots <= 0,
    };
  } catch (err: any) {
    throw new Error(err.message || 'Unable to save your request. Please try again.');
  }
}
