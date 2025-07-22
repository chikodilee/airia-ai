import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import ChatInterface from './Chat/ChatInterface';
import MapView from './Map/MapView';
import { useMap } from '../context/MapContext';

const Layout: React.FC = () => {
  const { isFullscreen } = useMap();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />
      
      <main className="flex flex-1 flex-col p-4 md:p-6">
        <div className="flex flex-1 flex-col gap-4 lg:flex-row">
          <motion.div
            className="relative flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatInterface />
          </motion.div>
          
          {!isFullscreen && (
            <motion.div
              className="sticky top-20 hidden h-[500px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm lg:block lg:max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MapView />
            </motion.div>
          )}
        </div>
      </main>
      
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MapView />
        </motion.div>
      )}
    </div>
  );
};

export default Layout;