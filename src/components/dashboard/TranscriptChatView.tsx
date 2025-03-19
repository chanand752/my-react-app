
import React, { useState } from 'react';
import { Trash, Send } from 'lucide-react';
import { Message } from './models';
import ChatInput from './ChatInput';

interface TranscriptChatViewProps {
  onSendMessage: (message: string) => void;
  onClearHistory: () => void;
}

const TranscriptChatView = ({ onSendMessage, onClearHistory }: TranscriptChatViewProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'query', content: 'What are the key points of the announcement?', minimized: false },
    { type: 'response', content: 'The key points are: 1) Trump announced a U.S. Crypto Strategic Reserve, 2) It will include Bitcoin, Ethereum, XRP, Solana, and Cardano, 3) The announcement led to significant price increases for these cryptocurrencies.', minimized: false },
    { type: 'query', content: 'How did Bitcoin price change?', minimized: false },
    { type: 'response', content: 'Bitcoin climbed to approximately $90,000-$95,000, rebounding from a recent dip below $80,000.', minimized: false },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      type: 'query',
      content: inputValue,
      minimized: false
    };
    
    setMessages([...messages, newUserMessage]);
    
    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        type: 'response',
        content: 'This is a simulated response to your question about the transcript.',
        minimized: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleClearHistory = () => {
    setMessages([]);
    onClearHistory();
  };

  const activateVoiceInput = () => {
    // This would integrate with browser's speech recognition API
    console.log("Voice input activated");
    // Example implementation would use the Web Speech API
    // For now, we'll just simulate it for the UI demo
    alert("Voice input activated. This would use the browser's speech recognition API in a real implementation.");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <button 
          onClick={handleClearHistory}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Clear Chat History
        </button>
        <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
          Save
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages && messages.map((message, index) => (
          <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
            <div className="p-2 bg-gray-50 border-b border-gray-200">
              {message.type === 'query' ? 'Question' : 'Chat result'}
            </div>
            <div className="p-3">
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-2 pb-2 border-t border-gray-200">
        <ChatInput 
          inputValue={inputValue} 
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          activateVoiceInput={activateVoiceInput}
        />
      </div>
    </div>
  );
};

export default TranscriptChatView;
