import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { fetchSlotsData, submitBooking, SlotsData, BookingResponse } from '../services/api';
import { LeadFormData } from '../types';

interface SlotsContextType {
  slots: SlotsData;
  isLoading: boolean;
  refreshSlots: () => Promise<void>;
  createBooking: (data: LeadFormData) => Promise<BookingResponse>;
}

const defaultSlots: SlotsData = {
  date: new Date().toISOString().split('T')[0],
  maxCapacity: 20,
  bookedCount: 0,
  remainingSlots: 20,
  isSoldOut: false,
};

const SlotsContext = createContext<SlotsContextType>({
  slots: defaultSlots,
  isLoading: true,
  refreshSlots: async () => {},
  createBooking: async () => ({ success: false, message: '', remainingSlots: 20 }),
});

export const SlotsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<SlotsData>(defaultSlots);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSlots = useCallback(async () => {
    const data = await fetchSlotsData();
    setSlots(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshSlots();

    // Poll every 10 seconds to keep real-time accuracy across tabs
    const interval = setInterval(refreshSlots, 10000);

    // Refresh on window focus
    const handleFocus = () => refreshSlots();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshSlots]);

  const createBooking = async (data: LeadFormData): Promise<BookingResponse> => {
    try {
      const response = await submitBooking(data);
      // Immediately refresh local slot state from server truth
      await refreshSlots();
      return response;
    } catch (err) {
      await refreshSlots();
      throw err;
    }
  };

  return (
    <SlotsContext.Provider value={{ slots, isLoading, refreshSlots, createBooking }}>
      {children}
    </SlotsContext.Provider>
  );
};

export const useSlots = () => useContext(SlotsContext);
