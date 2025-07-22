import React from 'react';
import { Map, MapPin, Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../context/ChatContext';

const Header: React.FC = () => {
  const { resetChat } = useChat();

  return (
    <motion.header
      className="sticky top-0 z-40 bg-white shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={resetChat}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          role="button"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            <Compass className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Airia AI</h1>
        </motion.div>
        
        <motion.nav
          className="flex items-center gap-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button className="hidden items-center gap-1 rounded-lg px-3 py-2 font-medium text-neutral-800 transition-colors hover:bg-neutral-100 md:flex">
            <Map className="h-4 w-4" />
            <span>Explore</span>
          </button>
          
          <button className="hidden items-center gap-1 rounded-lg px-3 py-2 font-medium text-neutral-800 transition-colors hover:bg-neutral-100 md:flex">
            <MapPin className="h-4 w-4" />
            <span>Destinations</span>
          </button>
          
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100">
            <User className="h-5 w-5" />
          </button>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;