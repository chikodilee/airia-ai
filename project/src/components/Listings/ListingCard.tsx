import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import type { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { setSelectedListing, selectedListing } = useChat();
  
  const isSelected = selectedListing?.id === listing.id;
  
  const handleSelect = () => {
    setSelectedListing(listing);
  };

  return (
    <motion.div
      className={`listing-card cursor-pointer ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      onClick={handleSelect}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="listing-image">
        <img
          src={listing.image}
          alt={listing.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="listing-details">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="text-base font-medium line-clamp-1">{listing.name}</h3>
          <div className="listing-price">${listing.price}</div>
        </div>
        
        <div className="mb-1 flex items-center gap-1">
          <div className="listing-rating">
            <Star className="h-4 w-4 fill-current text-primary" />
            <span>{listing.rating}</span>
            <span className="text-neutral-500">({listing.reviews})</span>
          </div>
        </div>
        
        <div className="listing-distance flex items-center gap-1">
          <span>{listing.distanceMinutes}-min {listing.travelMode}</span>
          <ArrowRight className="h-3 w-3" />
          <span className="font-medium">POI</span>
        </div>
        
        <div className="listing-tags">
          {listing.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="tag tag-neutral text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;