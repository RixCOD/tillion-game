import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ChargingStation } from '../types';
import { Navigation } from 'lucide-react';

// Custom marker icons based on status
const createMarkerIcon = (status: string) => {
  const color = 
    status === 'available' ? '#2ecc71' : 
    status === 'in-use' ? '#f39c12' : '#7f8c8d';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color}; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" fill="none" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to handle map center changes
const MapController = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  
  return null;
};

interface MapViewProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  setSelectedStation: (station: ChargingStation | null) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  stations, 
  selectedStation, 
  setSelectedStation 
}) => {
  const defaultCenter: [number, number] = [37.7749, -122.4194]; // San Francisco by default
  
  const selectedCenter: [number, number] | null = selectedStation 
    ? [selectedStation.location.latitude, selectedStation.location.longitude]
    : null;

  return (
    <div className="h-full w-full">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.location.latitude, station.location.longitude]}
            icon={createMarkerIcon(station.status)}
            eventHandlers={{
              click: () => {
                setSelectedStation(station);
              },
            }}
          >
            <Popup className="station-popup">
              <div>
                <h3 className="font-medium text-gray-900">{station.name}</h3>
                <p className="text-sm text-gray-600">{station.location.address}</p>
                <div className="mt-2 flex items-center text-sm">
                  <span className={`
                    inline-block w-2 h-2 rounded-full mr-1
                    ${station.status === 'available' 
                      ? 'bg-success-500' 
                      : station.status === 'in-use' 
                        ? 'bg-warning-500' 
                        : 'bg-neutral-500'
                    }
                  `}></span>
                  <span className="capitalize">{station.status.replace('-', ' ')}</span>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <p>{station.chargingSpeed} kW · {station.pricing}</p>
                </div>
                <div className="mt-2">
                  <button className="flex items-center text-xs text-primary-600 hover:text-primary-800">
                    <Navigation size={12} className="mr-1" />
                    Get Directions
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapController center={selectedCenter} />
      </MapContainer>
    </div>
  );
};

export default MapView;