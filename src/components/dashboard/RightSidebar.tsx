
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Share, Copy, Edit, Trash, Plus, ChevronRight } from 'lucide-react';
import TranscriptChatView from './TranscriptChatView';

interface RightSidebarProps {
  dashboardType: 1 | 2 | 3;
  toggleVisibility?: () => void;
}

const RightSidebar = ({ dashboardType, toggleVisibility }: RightSidebarProps) => {
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(true);
  const [showTopQueries, setShowTopQueries] = useState(true);
  const [showUserPrompts, setShowUserPrompts] = useState(true);

  const relatedQuestions = [
    "What are the latest advancements in AI hardware?",
    "How are big tech companies investing in AI infrastructure?",
    "What new AI models have been recently released?",
    "How is Tesla planning to challenge ride-hailing giants?",
    "What are the key features of Meta's new humanoid robotics team?",
    "How is Tesla planning to challenge ride-hailing giants?",
    "How are big tech companies investing in AI infrastructure?",
    "What are the latest advancements in AI hardware?",
    "How are big tech companies investing in AI infrastructure?",
    "How is Tesla planning to challenge ride-hailing giants?",
  ];

  const topQueries = [
    {
      title: "Trump sends crypto prices on a brief deep dive after announcement",
      source: "cointimes",
      image: "public/lovable-uploads/e6c565c5-c088-48e7-a4dc-71d21aec14df.png"
    },
    {
      title: "Trump's Crypto Reserve: A Date The President Doesn't Remember",
      source: "blocknews",
      image: "public/lovable-uploads/e6c565c5-c088-48e7-a4dc-71d21aec14df.png"
    },
    {
      title: "Trump's US Crypto Reserve Being More Questioned",
      source: "krypton",
      image: "public/lovable-uploads/e6c565c5-c088-48e7-a4dc-71d21aec14df.png"
    }
  ];

  const userPrompts = [
    "What happened with Trump's crypto announcement?",
    "How did the market react?",
    "What are the latest trends in crypto markets?",
    "Explain blockchain technology"
  ];

  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
  };

  const handleClearHistory = () => {
    console.log("Chat history cleared");
  };

  if (dashboardType === 2) {
    // For Dashboard-2, show transcript chat view
    return (
      <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col overflow-hidden">
        <TranscriptChatView 
          onSendMessage={handleSendMessage} 
          onClearHistory={handleClearHistory} 
        />
        
        {/* Toggle button to close sidebar */}
        <button 
          onClick={toggleVisibility}
          className="absolute top-4 left-1 text-gray-400 hover:text-gray-600"
          aria-label="Close sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  if (dashboardType === 3) {
    // For Dashboard-3, only show top queries section
    return (
      <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col overflow-hidden">
        {/* Section Header: Top 10 Queries - Fixed */}
        <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm font-medium">Top 10 Queries</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowTopQueries(!showTopQueries)}
          >
            {showTopQueries ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        {/* Top 10 Queries Content - Full height */}
        {showTopQueries && (
          <div 
            className="flex-1 p-4 overflow-y-auto hover-scrollbar" 
          >
            <div className="grid grid-cols-1 gap-3">
              {topQueries.map((query, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="font-medium mb-1">{query.title}</div>
                  <div className="text-gray-500 flex items-center text-xs">
                    <span className="w-3 h-3 bg-blue-100 rounded-full mr-1"></span>
                    {query.source}
                  </div>
                </div>
              ))}
              
              {/* Additional queries */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={`extra-${i}`} className="bg-gray-50 p-3 rounded text-sm hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="font-medium mb-1">Additional crypto news item {i}</div>
                  <div className="text-gray-500 flex items-center text-xs">
                    <span className="w-3 h-3 bg-blue-100 rounded-full mr-1"></span>
                    crypto-news-{i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Toggle button to close sidebar */}
        <button 
          onClick={toggleVisibility}
          className="absolute top-4 left-1 text-gray-400 hover:text-gray-600"
          aria-label="Close sidebar"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  // For Dashboard-1 (default)
  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      {/* First Section Header: Related Questions - Fixed at top */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-medium mb-1 flex items-center">
          <span className="w-5 h-5 bg-gray-200 flex items-center justify-center rounded mr-2">
            ℹ️
          </span>
          Related Questions
        </h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowRelatedQuestions(!showRelatedQuestions)}
        >
          {showRelatedQuestions ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      
      {/* First Section: Related Questions - 50% height */}
      {showRelatedQuestions && (
        <div 
          className="flex-1 p-4 overflow-y-auto hover-scrollbar" 
        >
          <div className="space-y-3 mb-6">
            {relatedQuestions.map((question, index) => (
              <div 
                key={index} 
                className="text-sm hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Separator className="mx-4" />
      
      {/* Toggle button to close sidebar */}
      <button 
        onClick={toggleVisibility}
        className="absolute top-4 left-1 text-gray-400 hover:text-gray-600"
        aria-label="Close sidebar"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default RightSidebar;
