import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Maximize2, Minimize2, Map as MapIcon } from 'lucide-react';
import { useMap as useMapContext } from '../../context/MapContext';
import MapMarker from './MapMarker';

// Component to update map view when center or zoom changes
const MapUpdater: React.FC = () => {
  const map = useMap();
  const { center, zoom } = useMapContext();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const MapView: React.FC = () => {
  const { center, zoom, markers, isFullscreen, toggleFullscreen } = useMapContext();

  return (
    <div className="relative h-full w-full">
      <div className="absolute right-3 top-3 z-50 flex gap-2">
        <motion.button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
          onClick={toggleFullscreen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </motion.button>
      </div>
      
      {markers.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-neutral-50 p-8 text-center">
          <MapIcon className="h-16 w-16 text-neutral-300" />
          <p className="text-lg text-neutral-500">
            Share your destination to see it on the map
          </p>
        </div>
      ) : (
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {markers.map((marker) => (
              <MapMarker key={marker.id} marker={marker} />
            ))}
            
            <MapUpdater />
          </MapContainer>
        </motion.div>
      )}
    </div>
  );
};

export default MapView;