import React, { createContext, useContext, useState, useEffect } from 'react';
import { useChat } from './ChatContext';
import type { MapLocation, POI } from '../types';

interface MapContextProps {
  center: [number, number];
  zoom: number;
  markers: MapLocation[];
  selectedMarker: string | null;
  setSelectedMarker: (id: string | null) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const defaultCenter: [number, number] = [48.856614, 2.3522219]; // Paris by default

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userPOI, activeListings, selectedListing, setSelectedListing } = useChat();
  
  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState<MapLocation[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update map when POI changes
  useEffect(() => {
    if (userPOI) {
      setCenter([userPOI.lat, userPOI.lng]);
      setZoom(14);
      
      // Add POI marker
      const poiMarker: MapLocation = {
        id: 'poi',
        lat: userPOI.lat,
        lng: userPOI.lng,
        type: 'poi',
        tooltip: userPOI.name,
        icon: '📍',
      };
      
      // Build marker array starting with POI
      const newMarkers = [poiMarker];
      
      // Add listing markers if available
      if (activeListings.length > 0) {
        const listingMarkers = activeListings.map(listing => ({
          id: listing.id,
          lat: listing.lat,
          lng: listing.lng,
          type: 'listing',
          tooltip: `${listing.name} - $${listing.price}/night`,
          icon: '🏠',
          selected: listing.id === selectedListing?.id,
        }));
        
        newMarkers.push(...listingMarkers);
      }
      
      setMarkers(newMarkers);
    }
  }, [userPOI, activeListings, selectedListing]);

  // Handle marker selection
  useEffect(() => {
    if (selectedMarker && selectedMarker !== 'poi') {
      const listing = activeListings.find(l => l.id === selectedMarker);
      if (listing) {
        setSelectedListing(listing);
      }
    }
  }, [activeListings, selectedMarker, setSelectedListing]);
  
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  return (
    <MapContext.Provider
      value={{
        center,
        zoom,
        markers,
        selectedMarker,
        setSelectedMarker,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextProps => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};