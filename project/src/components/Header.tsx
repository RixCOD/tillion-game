import React from 'react';
import { Menu, X, Zap, Search } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-3 p-1 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <Zap className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">BoltPlug</h1>
          </div>
        </div>
        
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a location..."
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-primary-400 text-white placeholder-gray-300 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <button className="hover:bg-primary-600 px-3 py-1 rounded">Map</button>
          <button className="hover:bg-primary-600 px-3 py-1 rounded">Favorites</button>
          <button className="hover:bg-primary-600 px-3 py-1 rounded">Help</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;