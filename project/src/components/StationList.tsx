import React from 'react';
import { ChargingStation } from '../types';
import StationCard from './StationCard';

interface StationListProps {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  setSelectedStation: (station: ChargingStation | null) => void;
}

const StationList: React.FC<StationListProps> = ({ 
  stations, 
  selectedStation,
  setSelectedStation 
}) => {
  if (stations.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No charging stations match your criteria.</p>
        <p className="mt-2 text-sm">Try adjusting your filters or search area.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          isSelected={selectedStation?.id === station.id}
          onClick={() => setSelectedStation(station)}
        />
      ))}
    </div>
  );
};

export default StationList;