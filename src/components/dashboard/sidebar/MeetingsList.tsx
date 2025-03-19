
import React from 'react';
import { Share, Plus, Minus } from 'lucide-react';
import { Meeting } from './types';

interface MeetingsListProps {
  items: Meeting[];
  toggleItem: (id: string) => void;
}

const MeetingsList: React.FC<MeetingsListProps> = ({ items, toggleItem }) => {
  return (
    <>
      {items.map((meeting) => (
        <div key={meeting.id} className="mb-2">
          <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer">
            <div className="flex items-center" onClick={() => toggleItem(meeting.id)}>
              {/* {meeting.expanded ? 
                <Minus size={16} className="mr-2 text-gray-500" /> : 
                <Plus size={16} className="mr-2 text-gray-500" />
              } */}
              <span className="text-sm text-gray-700">{meeting.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Share size={16} />
              </button>
            </div>
          </div>
          
          {meeting.expanded && meeting.items && meeting.items.length > 0 && (
            <div className="ml-8">
              {meeting.items.map((item, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-600"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default MeetingsList;
