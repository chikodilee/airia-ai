import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useMap as useMapContext } from '../../context/MapContext';
import type { MapLocation } from '../../types';

interface MapMarkerProps {
  marker: MapLocation;
}

// Custom icon creator
const createCustomIcon = (marker: MapLocation) => {
  const iconHtml = `<div class="${
    marker.selected ? 'custom-marker-icon custom-marker-icon-selected' : 'custom-marker-icon'
  }">${marker.icon}</div>`;
  
  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const MapMarker: React.FC<MapMarkerProps> = ({ marker }) => {
  const { setSelectedMarker } = useMapContext();
  
  const handleMarkerClick = () => {
    setSelectedMarker(marker.id);
  };

  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={createCustomIcon(marker)}
      eventHandlers={{
        click: handleMarkerClick,
      }}
    >
      <Tooltip className="custom-marker-tooltip" direction="top" offset={[0, -40]} opacity={1}>
        {marker.tooltip}
      </Tooltip>
    </Marker>
  );
};

export default MapMarker;