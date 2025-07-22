import React, { createContext, useContext, useState } from 'react';
import type { Listing } from '../types';

interface BookingDetails {
  listing: Listing | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  total: number;
}

interface BookingContextProps {
  bookingDetails: BookingDetails;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  confirmBooking: () => Promise<boolean>;
  isProcessing: boolean;
  isConfirmed: boolean;
  resetBooking: () => void;
}

const initialBookingDetails: BookingDetails = {
  listing: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
  total: 0,
};

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(initialBookingDetails);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails(prev => ({ ...prev, ...details }));
  };

  const confirmBooking = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setIsConfirmed(true);
    
    return true;
  };

  const resetBooking = () => {
    setBookingDetails(initialBookingDetails);
    setIsConfirmed(false);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingDetails,
        updateBookingDetails,
        confirmBooking,
        isProcessing,
        isConfirmed,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextProps => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};