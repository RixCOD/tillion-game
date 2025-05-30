import React from 'react';
import { Filter, Star, MapPin } from 'lucide-react';
import { ChargingStation } from '../types';
import StationList from './StationList';
import FilterPanel from './FilterPanel';

interface SidebarProps {
  isOpen: boolean;
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  setSelectedStation: (station: ChargingStation | null) => void;
  activeFilters: {
    available: boolean;
    inUse: boolean;
    offline: boolean;
    fastCharging: boolean;
  };
  toggleFilter: (filter: keyof typeof activeFilters) => void;
  loading: boolean;
  error: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  stations,
  selectedStation,
  setSelectedStation,
  activeFilters,
  toggleFilter,
  loading,
  error,
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Charging Stations</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-md ${
              showFilters ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
            }`}
            aria-label="Toggle filters"
          >
            <Filter size={20} />
          </button>
        </div>
        
        {showFilters && (
          <FilterPanel 
            activeFilters={activeFilters} 
            toggleFilter={toggleFilter} 
          />
        )}
        
        <div className="flex space-x-2 mt-2">
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
            <MapPin size={14} className="mr-1" />
            Near Me
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
            <Star size={14} className="mr-1" />
            Favorites
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500">{error}</div>
        ) : (
          <StationList 
            stations={stations} 
            selectedStation={selectedStation} 
            setSelectedStation={setSelectedStation}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;