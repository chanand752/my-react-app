
import React, { useState, useRef } from 'react';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { TranscriptTab, UploadedFile } from './models';

interface FileUploadViewProps {
  onFileUpload: (file: UploadedFile) => void;
}

const FileUploadView = ({ onFileUpload }: FileUploadViewProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: 'Trump_Crypto_Announcement.mp4', type: 'video/mp4', size: 1024 * 1024 * 5 },
    { name: 'Crypto_Market_Analysis.mp3', type: 'audio/mp3', size: 1024 * 1024 * 3 },
    { name: 'Blockchain_Documents.zip', type: 'application/zip', size: 1024 * 1024 * 10 }
  ]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFileSelector, setShowFileSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<TranscriptTab>('transcript');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file)
      };
      
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(newFile);
      setShowFileSelector(true);
      onFileUpload(newFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const selectFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setDropdownOpen(false);
  };

  // Example transcript content
  const getContentByTab = () => {
    switch (activeTab) {
      case 'transcript':
        return (
          <div className="p-4">
            <h3 className="text-sm font-medium flex items-center mb-3">
              <span className="w-5 h-5 bg-gray-200 flex items-center justify-center rounded mr-2">ℹ️</span>
              Answer
            </h3>
            <p className="text-sm">
              President Donald Trump announced plans to establish a U.S. Crypto Strategic Reserve, causing
              a brief surge in cryptocurrency prices. On Sunday, March 2, 2025, Trump revealed via
              social media that his administration is working towards creating this reserve, which will include
              various digital currencies.
            </p>
            <p className="text-sm mt-3">The proposed reserve will encompass:</p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Bitcoin (BTC)</li>
              <li>Ethereum (ETH)</li>
              <li>XRP</li>
              <li>Solana (SOL)</li>
              <li>Cardano (ADA)</li>
            </ul>
            <p className="text-sm mt-3">
              This announcement led to significant price increases for the mentioned cryptocurrencies.
              Bitcoin climbed to approximately $90,000-$95,000, rebounding from a recent dip below
              $80,000. XRP, Solana, and Cardano experienced even more substantial gains, with
              Cardano's ADA surging over 60%.
            </p>
            <div className="mt-4">
              <h4 className="font-medium text-sm">Key Points</h4>
              <ol className="list-decimal pl-6 mt-2 text-sm">
                <li>
                  <span className="font-medium">Executive Order:</span> The initiative stems from Trump's January 2025 executive order on
                  "Strengthening American Leadership in Digital Financial Technology"
                </li>
                <li>
                  <span className="font-medium">Market Impact:</span> The total cryptocurrency market capitalization expanded by over $300
                  billion shortly after the announcement
                </li>
              </ol>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="p-4">
            <p className="text-sm">
              President Trump announced the creation of a U.S. Crypto Strategic Reserve that will include Bitcoin, 
              Ethereum, XRP, Solana, and Cardano. This announcement caused cryptocurrency prices to surge, with 
              Bitcoin reaching $90,000-$95,000 and Cardano rising over 60%. The initiative is part of Trump's 
              executive order on digital financial technology leadership, and resulted in a $300 billion increase 
              in total cryptocurrency market capitalization.
            </p>
          </div>
        );
      case 'actionItems':
        return (
          <div className="p-4">
            <ul className="list-disc pl-6 text-sm space-y-2">
              <li>Monitor cryptocurrency market trends following the announcement</li>
              <li>Research implementation timeline for the U.S. Crypto Strategic Reserve</li>
              <li>Analyze potential regulatory implications for cryptocurrency holders</li>
              <li>Review investment strategies based on the selected cryptocurrencies</li>
              <li>Prepare report on economic impact of government crypto holdings</li>
            </ul>
          </div>
        );
      case 'openQuestions':
        return (
          <div className="p-4">
            <ul className="list-disc pl-6 text-sm space-y-2">
              <li>How will the U.S. Crypto Strategic Reserve be funded?</li>
              <li>What security measures will be implemented to protect the government's crypto holdings?</li>
              <li>Will other cryptocurrencies be added to the reserve in the future?</li>
              <li>How might this initiative affect global cryptocurrency regulations?</li>
              <li>What is the expected timeline for establishing the reserve?</li>
              <li>How will this impact private cryptocurrency investors?</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div 
          className="border border-gray-300 rounded p-3 flex items-center justify-between cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="text-gray-500">Upload files (video, audio, .zip)</div>
          <Upload size={20} className="text-gray-400" />
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="video/*,audio/*,.zip"
          />
        </div>

        {(showFileSelector || selectedFile) && (
          <div className="relative mt-3">
            <div 
              className="border border-gray-300 rounded p-3 flex items-center justify-between cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div>{selectedFile ? selectedFile.name : 'Select a file'}</div>
              {dropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectFile(file)}
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedFile && (
        <>
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'transcript' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('transcript')}
            >
              Transcript
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'actionItems' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('actionItems')}
            >
              Action Items
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'openQuestions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('openQuestions')}
            >
              Open Questions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {getContentByTab()}
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploadView;
