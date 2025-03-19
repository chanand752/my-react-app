
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Dashboard Layout Components
import Header from '@/components/dashboard/Header';
import LeftSidebar from '@/components/dashboard/LeftSidebar';
import RightSidebar from '@/components/dashboard/RightSidebar';
import Content from '@/components/dashboard/Content';

// Add scrollbar showing styles
const scrollbarShowStyles = `
  /* Always show scrollbars on hover */
  .scrollbar-show::-webkit-scrollbar,
  .overflow-auto::-webkit-scrollbar,
  div[style*="overflow"]::-webkit-scrollbar,
  div[class*="overflow"]::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    display: initial;
  }
  
  .scrollbar-show::-webkit-scrollbar-thumb,
  .overflow-auto::-webkit-scrollbar-thumb,
  div[style*="overflow"]::-webkit-scrollbar-thumb,
  div[class*="overflow"]::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  .scrollbar-show::-webkit-scrollbar-track,
  .overflow-auto::-webkit-scrollbar-track,
  div[style*="overflow"]::-webkit-scrollbar-track,
  div[class*="overflow"]::-webkit-scrollbar-track {
    background: transparent;
  }
  
  /* Initially hide scrollbars but show on hover */
  .hover-scrollbar {
    overflow: hidden auto;
    overflow-anchor: unset;
  }
  
  .hover-scrollbar:hover {
    overflow: auto;
  }
`;

// Text size classes for dynamic sizing
const textSizeClasses = {
  small: {
    base: 'text-sm',
    heading: 'text-base',
    spacing: 'space-y-3'
  },
  medium: {
    base: 'text-base',
    heading: 'text-lg',
    spacing: 'space-y-4'
  },
  large: {
    base: 'text-lg',
    heading: 'text-xl',
    spacing: 'space-y-5'
  }
};

interface DashboardProps {
  initialDashboard?: 1 | 2 | 3;
}

const Dashboard: React.FC<DashboardProps> = ({ initialDashboard }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  // Get dashboard type from props, location state, or default to 1
  const [activeDashboard, setActiveDashboard] = useState<1 | 2 | 3>(
    initialDashboard || 
    (location.state && location.state.dashboard ? 
      Number(location.state.dashboard) as 1 | 2 | 3 : 1)
  );

  // Effect to update active dashboard when location state changes
  useEffect(() => {
    if (initialDashboard) {
      setActiveDashboard(initialDashboard);
    } else if (location.state && location.state.dashboard) {
      const dashboardType = Number(location.state.dashboard);
      if ([1, 2, 3].includes(dashboardType)) {
        setActiveDashboard(dashboardType as 1 | 2 | 3);
      }
    }
  }, [location, initialDashboard]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(!rightSidebarVisible);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleHeaderSearch = (query: string) => {
    setHeaderSearchQuery(query);
  };
  
  const handleNewChat = () => {
    // Logic for creating a new chat
    console.log("Creating new chat");
  };

  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    setTextSize(size);
    console.log(`Text size changed to: ${size}`);
  };

  const getDashboardName = () => {
    return `Dashboard-${activeDashboard}`;
  };

  // Function to filter projects based on header search
  const filterProjects = (query: string) => {
    console.log(`Filtering projects with query: ${query}`);
    // This would typically filter projects in a real application
  };

  useEffect(() => {
    // Apply text size to body
    document.body.classList.remove('text-sm', 'text-base', 'text-lg');
    document.body.classList.add(textSizeClasses[textSize].base);
    
    // Filter projects when header search changes
    if (headerSearchQuery) {
      filterProjects(headerSearchQuery);
    }
  }, [textSize, headerSearchQuery]);

  return (
    <>
      {/* Add the style for showing scrollbars */}
      <style>{scrollbarShowStyles}</style>
      
      <div className={`h-screen flex flex-col bg-gray-50 overflow-hidden ${textSizeClasses[textSize].base}`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarCollapsed={sidebarCollapsed}
          rightSidebarVisible={rightSidebarVisible}
          dashboardName={getDashboardName()}
          toggleRightSidebar={toggleRightSidebar}
          onHeaderSearch={handleHeaderSearch}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar 
            collapsed={sidebarCollapsed} 
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            searchResults={[]}
            onNewChat={handleNewChat}
            onTextSizeChange={handleTextSizeChange}
            dashboardType={activeDashboard}
          />
          
          {/* Content area that expands when sidebars collapse */}
          <div className={`flex-1 transition-all duration-300 ${
            (!rightSidebarVisible && !sidebarCollapsed) ? 'flex-grow' : 
            (rightSidebarVisible && sidebarCollapsed) ? 'flex-grow' : 
            (!rightSidebarVisible && sidebarCollapsed) ? 'flex-grow' : ''
          }`}>
            <Content 
              dashboardType={activeDashboard} 
              textSize={textSize}
              searchQuery={searchQuery}
              headerSearchQuery={headerSearchQuery}
            />
          </div>
          
          {rightSidebarVisible && (
            <RightSidebar 
              dashboardType={activeDashboard} 
              toggleVisibility={toggleRightSidebar}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
