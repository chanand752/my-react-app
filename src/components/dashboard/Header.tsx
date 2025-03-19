
import React, { useState } from 'react';
import { PanelLeftClose, PanelLeftOpen, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
  rightSidebarVisible: boolean;
  dashboardName: string;
  toggleRightSidebar?: () => void;
  onHeaderSearch?: (query: string) => void;
}

const Header = ({ 
  toggleSidebar, 
  sidebarCollapsed, 
  dashboardName, 
  rightSidebarVisible, 
  toggleRightSidebar,
  onHeaderSearch 
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  
  // Map dashboard names to the new requested names
  const getDashboardTitle = () => {
    switch (dashboardName) {
      case 'Dashboard-1':
        return 'MLZ Chatbot';
      case 'Dashboard-2':
        return 'MLZ Transcript AI';
      case 'Dashboard-3':
        return 'MLZ DADA AI';
      default:
        return dashboardName;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onHeaderSearch) {
      onHeaderSearch(value);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 z-10 sticky top-0">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-gray-100 transition-colors mr-2"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </button>
          <div className="font-medium pl-2">{getDashboardTitle()}</div>
        </div>
        
        {/* Center search input */}
        <div className="flex-1 max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-2 bg-blue-600 text-white placeholder-white/70 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium">{user?.username || 'User'}</span>
          <button 
            className="text-gray-700 hover:text-gray-900"
            aria-label="Logout"
            onClick={logout}
          >
            <LogOut size={24} />
          </button>
          
          {toggleRightSidebar && (
            <button 
              onClick={toggleRightSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label={rightSidebarVisible ? "Collapse right sidebar" : "Expand right sidebar"}
            >
              {rightSidebarVisible ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
