
import React from 'react';
import { Share, Plus, Minus } from 'lucide-react';
import { ChatTopic } from './types';

interface ChatTopicsListProps {
  items: ChatTopic[];
  toggleItem: (id: string) => void;
  addChatToItem?: (id: string) => void;
}

const ChatTopicsList: React.FC<ChatTopicsListProps> = ({ 
  items, 
  toggleItem,
  addChatToItem 
}) => {
  return (
    <>
      {items.map((topic) => (
        <div key={topic.id} className="mb-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center" onClick={() => toggleItem(topic.id)}>
              {/* {topic.expanded ? 
                <Minus size={16} className="mr-2 text-gray-500" /> : 
                <Plus size={16} className="mr-2 text-gray-500" />
              } */}
              <span className="text-sm text-gray-700">{topic.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => addChatToItem && addChatToItem(topic.id)}
              >
                <Plus size={16} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Share size={16} />
              </button>
            </div>
          </div>
          
          {topic.expanded && topic.chats && topic.chats.length > 0 && (
            <div className="ml-8">
              {topic.chats.map((chat, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-600"
                >
                  {chat}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ChatTopicsList;
