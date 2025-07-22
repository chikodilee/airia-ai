import React from 'react';
import { motion } from 'framer-motion';
import ListingCard from './ListingCard';
import type { Listing } from '../../types';

interface ListingListProps {
  listings: Listing[];
}

const ListingList: React.FC<ListingListProps> = ({ listings }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3 text-lg font-medium">Recommended Places to Stay</h3>
      
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </motion.div>
    </div>
  );
};

export default ListingList;