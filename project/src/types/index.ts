// Message Types
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: MessageOptions;
}

export interface MessageOptions {
  options?: Option[];
  listings?: Listing[];
  dateSelection?: boolean;
  multiSelect?: boolean;
}

export interface Option {
  text: string;
  value: any;
}

// Location Types
export interface POI {
  name: string;
  city: string;
  lat: number;
  lng: number;
}

export interface MapLocation {
  id: string;
  lat: number;
  lng: number;
  type: 'poi' | 'listing';
  tooltip: string;
  icon: string;
  selected?: boolean;
}

// Preference Types
export interface Preference {
  budget: {
    min: number;
    max: number;
  };
  safety: 'low' | 'medium' | 'high';
  cleanliness: 'low' | 'medium' | 'high';
  proximity: 'close' | 'medium' | 'far';
  amenities: string[];
}

// Listing Types
export interface Listing {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  beds: number;
  baths: number;
  lat: number;
  lng: number;
  distanceMinutes: number;
  travelMode: 'walk' | 'drive' | 'transit';
  amenities: string[];
  tags: string[];
  host: {
    name: string;
    isSuperhost: boolean;
  };
}