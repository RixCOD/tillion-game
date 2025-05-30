import React, { useState } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import { ChargingStation } from './types';
import { useStations } from './hooks/useStations';

function App() {
  const { stations, loading, error } = useStations();
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    available: false,
    inUse: false,
    offline: false,
    fastCharging: false,
  });

  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const filteredStations = stations.filter((station) => {
    // If no filters are active, show all stations
    if (!Object.values(activeFilters).some(Boolean)) {
      return true;
    }

    return (
      (activeFilters.available && station.status === 'available') ||
      (activeFilters.inUse && station.status === 'in-use') ||
      (activeFilters.offline && station.status === 'offline') ||
      (activeFilters.fastCharging && station.chargingSpeed >= 50)
    );
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isSidebarOpen={sidebarOpen} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          stations={filteredStations}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          loading={loading}
          error={error}
        />
        <main className="flex-1">
          <MapView 
            stations={filteredStations}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;