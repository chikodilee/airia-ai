import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Minus } from 'lucide-react';

interface DateSelectorProps {
  onSelect: (dates: { start: string; end: string }) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onSelect }) => {
  const [startDate, setStartDate] = useState('2025-05-15');
  const [endDate, setEndDate] = useState('2025-05-20');
  const [guests, setGuests] = useState(2);
  
  const handleSubmit = () => {
    onSelect({ start: startDate, end: endDate });
  };

  return (
    <motion.div
      className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-4">
        <h3 className="mb-2 font-medium">Select dates</h3>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 flex-col">
            <label htmlFor="check-in" className="mb-1 text-sm text-neutral-600">
              Check in
            </label>
            <div className="relative">
              <input
                type="date"
                id="check-in"
                className="input pr-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col">
            <label htmlFor="check-out" className="mb-1 text-sm text-neutral-600">
              Check out
            </label>
            <div className="relative">
              <input
                type="date"
                id="check-out"
                className="input pr-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="mb-2 font-medium">Guests</h3>
        
        <div className="flex items-center">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-100"
            onClick={() => setGuests(Math.max(1, guests - 1))}
          >
            <Minus className="h-4 w-4" />
          </button>
          
          <span className="mx-4 w-8 text-center">{guests}</span>
          
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-100"
            onClick={() => setGuests(Math.min(10, guests + 1))}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </motion.div>
  );
};

export default DateSelector;