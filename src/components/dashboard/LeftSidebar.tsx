
import React, { useState, useEffect } from 'react';
import SidebarNav from './sidebar/SidebarNav';
import SidebarContent from './sidebar/SidebarContent';
import { ChatTopic, Meeting, Project } from './sidebar/types';

interface LeftSidebarProps {
  collapsed: boolean;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults?: string[];
  onNewChat?: () => void;
  onTextSizeChange?: (size: 'small' | 'medium' | 'large') => void;
  dashboardType: 1 | 2 | 3;
}

const LeftSidebar = ({ 
  collapsed,
  searchQuery, 
  handleSearch,
  onTextSizeChange,
  dashboardType
}: LeftSidebarProps) => {
  const [chatTopics, setChatTopics] = useState<ChatTopic[]>([
    {
      id: '1',
      name: 'ChatTopic1',
      chats: ['Chat1', 'Chat2', 'Chat3'],
      expanded: true
    },
    {
      id: '2',
      name: 'ChatTopic2',
      chats: ['ChatA', 'ChatB'],
      expanded: false
    },
    {
      id: '3',
      name: 'ChatTopic3',
      chats: [],
      expanded: false
    }
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      name: 'Meeting1',
      items: [
        { name: 'Transcript', type: 'transcript' },
        { name: 'Summary', type: 'summary' },
        { name: 'Action Items', type: 'action' },
        { name: 'Open Questions', type: 'question' }
      ],
      expanded: true
    },
    {
      id: '2',
      name: 'Meeting2',
      items: [
        { name: 'Transcript', type: 'transcript' },
        { name: 'Summary', type: 'summary' },
        { name: 'Action Items', type: 'action' },
        { name: 'Open Questions', type: 'question' }
      ],
      expanded: false
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Project1',
      chats: ['Chat1', 'Chat2', 'Chat3'],
      expanded: true
    },
    {
      id: '2',
      name: 'Project2',
      chats: ['ChatA', 'ChatB'],
      expanded: false
    },
    {
      id: '3',
      name: 'Project3',
      chats: [],
      expanded: false
    }
  ]);

  const [filteredItems, setFilteredItems] = useState<ChatTopic[] | Meeting[] | Project[]>([]);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Effect to set appropriate filtered items based on dashboard type
  useEffect(() => {
    switch (dashboardType) {
      case 1:
        setFilteredItems(chatTopics);
        break;
      case 2:
        setFilteredItems(meetings);
        break;
      case 3:
        setFilteredItems(projects);
        break;
      default:
        setFilteredItems([]);
    }
  }, [dashboardType, chatTopics, meetings, projects]);

  // Effect to filter items based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      switch (dashboardType) {
        case 1:
          setFilteredItems(chatTopics);
          break;
        case 2:
          setFilteredItems(meetings);
          break;
        case 3:
          setFilteredItems(projects);
          break;
        default:
          setFilteredItems([]);
      }
      return;
    }

    const filterQuery = searchQuery.toLowerCase();

    switch (dashboardType) {
      case 1:
        // Filter chat topics
        const filteredTopics = chatTopics.map(topic => {
          const topicMatches = topic.name.toLowerCase().includes(filterQuery);
          
          const filteredChats = topic.chats.filter(chat => 
            chat.toLowerCase().includes(filterQuery)
          );
          
          if (topicMatches || filteredChats.length > 0) {
            return {
              ...topic,
              chats: filteredChats,
              expanded: true
            };
          }
          
          return null;
        }).filter(Boolean) as ChatTopic[];
        
        setFilteredItems(filteredTopics);
        break;
      
      case 2:
        // Filter meetings
        const filteredMeetings = meetings.map(meeting => {
          const meetingMatches = meeting.name.toLowerCase().includes(filterQuery);
          
          const filteredItems = meeting.items.filter(item => 
            item.name.toLowerCase().includes(filterQuery)
          );
          
          if (meetingMatches || filteredItems.length > 0) {
            return {
              ...meeting,
              items: filteredItems,
              expanded: true
            };
          }
          
          return null;
        }).filter(Boolean) as Meeting[];
        
        setFilteredItems(filteredMeetings);
        break;
      
      case 3:
        // Filter projects
        const filteredProjects = projects.map(project => {
          const projectMatches = project.name.toLowerCase().includes(filterQuery);
          
          const filteredChats = project.chats.filter(chat => 
            chat.toLowerCase().includes(filterQuery)
          );
          
          if (projectMatches || filteredChats.length > 0) {
            return {
              ...project,
              chats: filteredChats,
              expanded: true
            };
          }
          
          return null;
        }).filter(Boolean) as Project[];
        
        setFilteredItems(filteredProjects);
        break;
    }
  }, [searchQuery, dashboardType, chatTopics, meetings, projects]);

  const toggleItem = (itemId: string) => {
    switch (dashboardType) {
      case 1:
        setChatTopics(prevTopics => 
          prevTopics.map(topic => 
            topic.id === itemId 
              ? { ...topic, expanded: !topic.expanded } 
              : topic
          )
        );
        break;
      case 2:
        setMeetings(prevMeetings => 
          prevMeetings.map(meeting => 
            meeting.id === itemId 
              ? { ...meeting, expanded: !meeting.expanded } 
              : meeting
          )
        );
        break;
      case 3:
        setProjects(prevProjects => 
          prevProjects.map(project => 
            project.id === itemId 
              ? { ...project, expanded: !project.expanded } 
              : project
          )
        );
        break;
    }
  };

  const addChatToItem = (itemId: string) => {
    switch (dashboardType) {
      case 1:
        setChatTopics(prevTopics => 
          prevTopics.map(topic => {
            if (topic.id === itemId) {
              const chatNumber = topic.chats.length + 1;
              return {
                ...topic,
                chats: [...topic.chats, `Chat${chatNumber}`],
                expanded: true
              };
            }
            return topic;
          })
        );
        break;
      case 3:
        setProjects(prevProjects => 
          prevProjects.map(project => {
            if (project.id === itemId) {
              const chatNumber = project.chats.length + 1;
              return {
                ...project,
                chats: [...project.chats, `Chat${chatNumber}`],
                expanded: true
              };
            }
            return project;
          })
        );
        break;
    }
  };

  const addNewItem = () => {
    switch (dashboardType) {
      case 1:
        const newTopicId = (chatTopics.length + 1).toString();
        setChatTopics([
          ...chatTopics,
          {
            id: newTopicId,
            name: `ChatTopic${newTopicId}`,
            chats: [],
            expanded: false
          }
        ]);
        break;
      case 2:
        const newMeetingId = (meetings.length + 1).toString();
        setMeetings([
          ...meetings,
          {
            id: newMeetingId,
            name: `Meeting${newMeetingId}`,
            items: [
              { name: 'Transcript', type: 'transcript' },
              { name: 'Summary', type: 'summary' },
              { name: 'Action Items', type: 'action' },
              { name: 'Open Questions', type: 'question' }
            ],
            expanded: false
          }
        ]);
        break;
      case 3:
        const newProjectId = (projects.length + 1).toString();
        setProjects([
          ...projects,
          {
            id: newProjectId,
            name: `Project${newProjectId}`,
            chats: [],
            expanded: false
          }
        ]);
        break;
    }
  };

  const handleTextSizeChange = (size: 'small' | 'medium' | 'large') => {
    setTextSize(size);
    if (onTextSizeChange) {
      onTextSizeChange(size);
    }
  };

  return (
    <div className="flex h-full">
      <SidebarNav 
        activeDashboard={dashboardType} 
        textSize={textSize} 
        handleTextSizeChange={handleTextSizeChange} 
      />
      <SidebarContent 
        collapsed={collapsed}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        filteredItems={filteredItems}
        toggleItem={toggleItem}
        addChatToItem={addChatToItem}
        addNewItem={addNewItem}
        dashboardType={dashboardType}
      />
    </div>
  );
};

export default LeftSidebar;
