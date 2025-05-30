import React from 'react';
import { Zap, Battery, WifiOff, Gauge } from 'lucide-react';

interface FilterPanelProps {
  activeFilters: {
    available: boolean;
    inUse: boolean;
    offline: boolean;
    fastCharging: boolean;
  };
  toggleFilter: (filter: keyof typeof activeFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ activeFilters, toggleFilter }) => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-3">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Filters</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          className={`flex items-center p-2 rounded-md text-sm ${
            activeFilters.available
              ? 'bg-success-100 text-success-800 border border-success-300'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => toggleFilter('available')}
        >
          <Zap
            size={16}
            className={`mr-1 ${activeFilters.available ? 'text-success-500' : 'text-gray-500'}`}
          />
          Available
        </button>

        <button
          className={`flex items-center p-2 rounded-md text-sm ${
            activeFilters.inUse
              ? 'bg-warning-100 text-warning-800 border border-warning-300'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => toggleFilter('inUse')}
        >
          <Battery
            size={16}
            className={`mr-1 ${activeFilters.inUse ? 'text-warning-500' : 'text-gray-500'}`}
          />
          In Use
        </button>

        <button
          className={`flex items-center p-2 rounded-md text-sm ${
            activeFilters.offline
              ? 'bg-neutral-100 text-neutral-800 border border-neutral-300'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => toggleFilter('offline')}
        >
          <WifiOff
            size={16}
            className={`mr-1 ${activeFilters.offline ? 'text-neutral-500' : 'text-gray-500'}`}
          />
          Offline
        </button>

        <button
          className={`flex items-center p-2 rounded-md text-sm ${
            activeFilters.fastCharging
              ? 'bg-primary-100 text-primary-800 border border-primary-300'
              : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => toggleFilter('fastCharging')}
        >
          <Gauge
            size={16}
            className={`mr-1 ${activeFilters.fastCharging ? 'text-primary-500' : 'text-gray-500'}`}
          />
          Fast Charging
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;