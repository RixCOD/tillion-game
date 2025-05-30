export type ChargingStatus = 'available' | 'in-use' | 'offline';

export type ConnectorType = 
  | 'CCS1' 
  | 'CCS2' 
  | 'CHAdeMO' 
  | 'Type1' 
  | 'Type2' 
  | 'Tesla';

export interface ChargingStation {
  id: string;
  name: string;
  operator: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  connectors: {
    type: ConnectorType;
    count: number;
    available: number;
  }[];
  status: ChargingStatus;
  pricing: string;
  chargingSpeed: number; // kW
  amenities: string[];
  lastReported: string; // ISO date string
  distance?: number; // in miles/km, calculated based on user location
  isFavorite?: boolean;
}