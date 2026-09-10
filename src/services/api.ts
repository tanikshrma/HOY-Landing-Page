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
  try {
    const res = await fetch('/api/slots');
    if (!res.ok) {
      throw new Error(`Failed to fetch slots: ${res.statusText}`);
    }
    const data = await res.json();
    return data as SlotsData;
  } catch (err) {
    console.error('API Error fetching slots:', err);
    // Safe fallback object matching 20 capacity if offline
    return {
      date: new Date().toISOString().split('T')[0],
      maxCapacity: 20,
      bookedCount: 0,
      remainingSlots: 20,
      isSoldOut: false,
    };
  }
}

export async function submitBooking(data: LeadFormData): Promise<BookingResponse> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || 'Failed to submit booking');
  }

  return responseData as BookingResponse;
}
