import React from 'react';
import { ChargingStation } from '../types';
import { MapPin, Star, Navigation, Zap, WifiOff, Battery } from 'lucide-react';

interface StationCardProps {
  station: ChargingStation;
  isSelected: boolean;
  onClick: () => void;
}

const StationCard: React.FC<StationCardProps> = ({ station, isSelected, onClick }) => {
  // Helper to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-success-500 bg-success-50';
      case 'in-use':
        return 'text-warning-500 bg-warning-50';
      case 'offline':
        return 'text-neutral-500 bg-neutral-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  // Helper to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Zap size={16} />;
      case 'in-use':
        return <Battery size={16} />;
      case 'offline':
        return <WifiOff size={16} />;
      default:
        return null;
    }
  };

  const statusClass = getStatusColor(station.status);
  const StatusIcon = getStatusIcon(station.status);
  
  // Calculate available connectors
  const totalAvailable = station.connectors.reduce((sum, c) => sum + c.available, 0);
  const totalConnectors = station.connectors.reduce((sum, c) => sum + c.count, 0);

  return (
    <div 
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-primary-50 border-l-4 border-primary-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{station.name}</h3>
        <button className="text-gray-400 hover:text-primary-500" aria-label="Favorite">
          <Star size={18} className={station.isFavorite ? "fill-warning-500 text-warning-500" : ""} />
        </button>
      </div>
      
      <div className="mt-1 flex items-center text-sm text-gray-500">
        <MapPin size={16} className="mr-1" />
        <span className="truncate">{station.location.address}, {station.location.city}</span>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`${statusClass} px-2 py-1 rounded-full flex items-center text-xs font-medium`}>
            {StatusIcon}
            <span className="ml-1 capitalize">{station.status.replace('-', ' ')}</span>
          </div>
          <span className="ml-2 text-xs text-gray-500">
            {totalAvailable} of {totalConnectors} available
          </span>
        </div>
        
        <div className="text-sm font-medium text-primary-600">
          {station.distance ? `${station.distance} mi` : ''}
        </div>
      </div>
      
      <div className="mt-2 flex text-xs text-gray-600">
        <div className="mr-3">
          <span className="font-semibold">{station.chargingSpeed} kW</span>
        </div>
        <div>
          <span className="font-semibold">{station.pricing}</span>
        </div>
      </div>
      
      <div className="mt-2 flex space-x-2">
        <button className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100 transition">
          Details
        </button>
        <button className="px-2 py-1 text-xs flex items-center bg-primary-50 text-primary-600 rounded hover:bg-primary-100 transition">
          <Navigation size={12} className="mr-1" />
          Directions
        </button>
      </div>
    </div>
  );
};

export default StationCard;