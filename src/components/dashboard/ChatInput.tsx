
import React from 'react';
import { Mic, Send, Paperclip  } from 'lucide-react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  activateVoiceInput: () => void;
}

const ChatInput = ({ inputValue, setInputValue, handleSubmit, activateVoiceInput }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center px-4">
      <input
        type="text"
        placeholder="Ask anything..."
        className="block w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-7">
        <button 
          type="button" 
          className="p-1 text-gray-500 hover:text-gray-700 mr-1"
          onClick={activateVoiceInput}
        >
          <Mic size={18} />
        </button>
        <button 
          type="submit" 
          className="p-1 text-blue-500 hover:text-blue-700"
        >
          <Paperclip  size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
