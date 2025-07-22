import React, { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import { MapProvider } from './context/MapContext';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-ping rounded-full bg-primary-400 p-3"></div>
          <h2 className="text-xl font-medium text-neutral-800">Starting Airia...</h2>
        </div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <MapProvider>
        <BookingProvider>
          <Layout />
        </BookingProvider>
      </MapProvider>
    </ChatProvider>
  );
};

export default App;