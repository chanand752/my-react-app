
import React from 'react';
import { Search, MessageSquarePlus, File } from 'lucide-react';
import ChatTopicsList from './ChatTopicsList';
import MeetingsList from './MeetingsList';
import ProjectsList from './ProjectsList';
import { ChatTopic, Meeting, Project } from './types';

interface SidebarContentProps {
  collapsed: boolean;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredItems: ChatTopic[] | Meeting[] | Project[];
  toggleItem: (id: string) => void;
  addChatToItem?: (id: string) => void;
  addNewItem: () => void;
  dashboardType: 1 | 2 | 3;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  collapsed,
  searchQuery,
  handleSearch,
  filteredItems,
  toggleItem,
  addChatToItem,
  addNewItem,
  dashboardType
}) => {
  const renderNewButtonText = () => {
    switch (dashboardType) {
      case 1:
        return "New Chat";
      case 2:
        return "New Meeting";
      case 3:
        return "New Project";
      default:
        return "New";
    }
  };

  const renderItems = () => {
    switch (dashboardType) {
      case 1:
        return <ChatTopicsList 
                 items={filteredItems as ChatTopic[]} 
                 toggleItem={toggleItem} 
                 addChatToItem={addChatToItem}
               />;
      case 2:
        return <MeetingsList items={filteredItems as Meeting[]} toggleItem={toggleItem} />;
      case 3:
        return <ProjectsList 
                 items={filteredItems as Project[]} 
                 toggleItem={toggleItem} 
                 addChatToItem={addChatToItem}
               />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-60 opacity-100'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <button 
          onClick={addNewItem}
          className="w-full mb-4 py-2 px-3 rounded-md flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-600"
        >
          <span className="text-sm font-medium">{renderNewButtonText()}</span>
          {dashboardType === 2 ? <File size={18} /> : <MessageSquarePlus size={18} />}
        </button>
        
        <div className="overflow-y-auto flex-1 hover-scrollbar">
          {renderItems()}
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
