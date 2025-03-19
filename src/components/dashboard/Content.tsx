
import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';
import SqlResultView from './SqlResultView';
import ChatInput from './ChatInput';
import FileUploadView from './FileUploadView';
import MetricScreen from './MetricScreen';
import { ContentProps, textSizeStyles, Message, UploadedFile } from './models';

const Content = ({ dashboardType, textSize = 'medium', searchQuery, headerSearchQuery,showMetricScreen, setShowMetricScreen  }: ContentProps) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'query',
      content: 'What happened with Trump\'s crypto announcement?',
      minimized: false
    },
    {
      type: 'response',
      content: 'President Trump announced plans to establish a U.S. Crypto Strategic Reserve, causing a brief surge in cryptocurrency prices. The proposed reserve will include Bitcoin, Ethereum, XRP, Solana, and Cardano.',
      minimized: false
    },
    {
      type: 'query',
      content: 'How did the market react?',
      minimized: false
    },
    {
      type: 'response',
      content: 'Bitcoin climbed to approximately $90,000-$95,000, rebounding from a recent dip below $80,000. XRP, Solana, and Cardano experienced even more substantial gains, with Cardano\'s ADA surging over 60%.',
      minimized: false
    }
  ]);

  const [filteredMessages, setFilteredMessages] = useState<Message[]>(messages);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

     // Log when showMetricScreen changes
     useEffect(() => {
      console.log("Content component - showMetricScreen:", showMetricScreen)
    }, [showMetricScreen])

  // Filter messages based on search query
  useEffect(() => {
    if (!searchQuery && !headerSearchQuery) {
      setFilteredMessages(messages);
      return;
    }

    const query = searchQuery || headerSearchQuery || '';
    
    const filtered = messages.filter(message => 
      message.content.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredMessages(filtered);
  }, [searchQuery, headerSearchQuery, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user query to messages
    const newUserQuery = { 
      type: 'query' as const, 
      content: inputValue,
      minimized: false
    };
    
    setMessages([...messages, newUserQuery]);
    setInputValue('');

    // Simulate response (in a real app, this would come from an API call)
    setTimeout(() => {
      const sampleResponses = [
        "Based on the latest information, cryptocurrency markets have been experiencing significant volatility in recent months. Regulatory announcements and macroeconomic factors continue to influence prices.",
        "According to recent reports, several major financial institutions are increasing their cryptocurrency holdings despite market uncertainty. This trend suggests growing institutional confidence in digital assets as a long-term investment.",
        "The information available shows that technological advancements in blockchain are improving scalability issues that have historically limited widespread adoption. These improvements could potentially lead to increased transaction speeds and lower fees.",
        "Recent data indicates that regulatory frameworks for cryptocurrencies are evolving globally, with some jurisdictions adopting more supportive approaches while others implement stricter controls.",
        "Analysis of market trends suggests that despite short-term volatility, long-term adoption metrics for cryptocurrencies continue to show growth in both retail and institutional sectors."
      ];
      
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          type: 'response' as const,
          content: randomResponse,
          minimized: false
        }
      ]);
    }, 1500);
  };

  const handleDeleteMessage = (index: number) => {
    // Remove the message and its response if it's a query
    if (messages[index].type === 'query' && index + 1 < messages.length && messages[index + 1].type === 'response') {
      // Delete both query and its response
      const newMessages = [...messages];
      newMessages.splice(index, 2);
      setMessages(newMessages);
    } else {
      // Just delete the single message
      const newMessages = [...messages];
      newMessages.splice(index, 1);
      setMessages(newMessages);
    }
  };

  const toggleMinimizeMessage = (index: number) => {
    if (index >= messages.length) return;
    
    const updatedMessages = [...messages];
    updatedMessages[index] = {
      ...updatedMessages[index],
      minimized: !updatedMessages[index].minimized
    };
    setMessages(updatedMessages);
  };

  const activateVoiceInput = () => {
    // This would integrate with browser's speech recognition API
    console.log("Voice input activated");
    // Example implementation would use the Web Speech API
    // For now, we'll just simulate it for the UI demo
    alert("Voice input activated. This would use the browser's speech recognition API in a real implementation.");
  };

  const handleFileUpload = (file: UploadedFile) => {
    setUploadedFile(file);
    console.log("File uploaded:", file);
  };

  // For Dashboard 2 (Transcript AI), render file upload view
  if (dashboardType === 2 && !showMetricScreen) {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <FileUploadView onFileUpload={handleFileUpload} />
        </div>
      </div>
    );
  }

  // If metric screen is active, show only the metric screen
  if (showMetricScreen) {
    console.log("Rendering MetricScreen")
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="max-w-4xl mx-auto w-full flex flex-col h-full pt-4">
          <div className="flex-1 overflow-y-auto px-4 hover-scrollbar">
            <MetricScreen onClose={() => setShowMetricScreen(false)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full pt-4">
        {/* Main content area with messages - scrollable */}
        <div 
          className={`flex-1 overflow-y-auto px-4 hover-scrollbar ${textSizeStyles[textSize].spacing}`}
        >
          {filteredMessages.map((message, index) => (
            <div key={index} className={textSizeStyles[textSize].spacing}>
              {dashboardType === 3 ? (
                <SqlResultView 
                  message={message} 
                  index={index} 
                  toggleMinimizeMessage={toggleMinimizeMessage} 
                  handleDeleteMessage={handleDeleteMessage} 
                />
              ) : (
                <MessageItem 
                  message={message} 
                  index={index} 
                  textSizeStyles={textSizeStyles[textSize]} 
                  toggleMinimizeMessage={toggleMinimizeMessage} 
                  handleDeleteMessage={handleDeleteMessage} 
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Input at the bottom - fixed position */}
        <div className="sticky bottom-0 bg-white pt-2 pb-4 border-t">
          <ChatInput 
            inputValue={inputValue} 
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            activateVoiceInput={activateVoiceInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
