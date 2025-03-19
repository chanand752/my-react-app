
import React from 'react';
import { MessageCircle, Maximize, Minimize, Share, FolderInput, Edit, ThumbsUp, ThumbsDown, Copy, Trash } from 'lucide-react';
import { Message, TextSizeStyles } from './models';

interface MessageItemProps {
  message: Message;
  index: number;
  textSizeStyles: TextSizeStyles;
  toggleMinimizeMessage: (index: number) => void;
  handleDeleteMessage: (index: number) => void;
}

const MessageItem = ({ message, index, textSizeStyles, toggleMinimizeMessage, handleDeleteMessage }: MessageItemProps) => {
  if (message.type === 'query') {
    return (
      <div className={`flex items-start ${textSizeStyles.spacing}`}>
        <div className="w-6 mr-2 text-black-400">
          <MessageCircle size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className={`text-black-600 ${textSizeStyles.question}`}>{message.content}</p>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => toggleMinimizeMessage(index + 1)} 
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label={message.minimized ? "Maximize" : "Minimize"}
              >
                {message.minimized ? <Maximize size={18} /> : <Minimize size={18} />}
              </button>
              <button 
                onClick={() => handleDeleteMessage(index)} 
                className="p-1 text-gray-400 hover:text-red-500"
                aria-label="Delete"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={textSizeStyles.spacing}>
        {!message.minimized ? (
          <div className="flex items-start mb-4">
            <div className="w-full">
              <p className={`font-medium ${textSizeStyles.heading} mb-2`}>Answer</p>
              <p className={textSizeStyles.answer}>{message.content}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-2 py-1 bg-gray-50 rounded">
            <span className="text-sm text-gray-500">[Answer minimized]</span>
            <button 
              onClick={() => toggleMinimizeMessage(index)}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Maximize"
            >
              <Maximize size={16} />
            </button>
          </div>
        )}
        
        {!message.minimized && (
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <Share size={16} className="mr-1" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <FolderInput size={16} className="mr-1" />
                <span className="text-sm">Export</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700">
                <Edit size={16} className="mr-1" />
                <span className="text-sm">Rewrite</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ThumbsUp size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <ThumbsDown size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Copy size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default MessageItem;
