
import { ReactNode } from 'react';

export interface ChatTopic {
  id: string;
  name: string;
  chats: string[];
  expanded: boolean;
}

export interface Meeting {
  id: string;
  name: string;
  items: { name: string; type: 'transcript' | 'summary' | 'action' | 'question' }[];
  expanded: boolean;
}

export interface Project {
  id: string;
  name: string;
  chats: string[];
  expanded: boolean;
}

export interface SidebarNavProps {
  activeDashboard: 1 | 2 | 3;
}

export interface SidebarProps {
  collapsed: boolean;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults?: string[];
  onNewChat?: () => void;
  onTextSizeChange?: (size: 'small' | 'medium' | 'large') => void;
  dashboardType: 1 | 2 | 3;
}

export interface ItemProps {
  item: ChatTopic | Meeting | Project;
  toggleItem: (id: string) => void;
  dashboardType: 1 | 2 | 3;
}
