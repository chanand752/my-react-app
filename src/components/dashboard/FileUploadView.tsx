
import React, { useState, useRef,useEffect } from 'react';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { TranscriptTab, UploadedFile } from './models';
import { fetchUploadedFiles, uploadFile } from '../../services/api';



interface FileUploadViewProps {
  onFileUpload: (file: UploadedFile) => void;
}

const FileUploadView = ({ onFileUpload }: FileUploadViewProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]); // Initialize with an empty array

  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
  //   { name: 'Trump_Crypto_Announcement.mp4', type: 'video/mp4', section:'transcript', size: 1024 * 1024 * 5 },
  //   { name: 'Crypto_Market_Analysis.mp3', type: 'audio/mp3', section:'summary', size: 1024 * 1024 * 3 },
  //   { name: 'Blockchain_Documents.zip', type: 'application/zip',section:'action items', size: 1024 * 1024 * 10 },
  //   { name: 'TestingFile.mp3', type: 'audio/mp3', section:'open questions', size: 1024 * 1024 * 3 }
  // ]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFileSelector, setShowFileSelector] = useState(false);
  const [activeTab, setActiveTab] = useState<TranscriptTab>('transcript');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await fetchUploadedFiles();
      setUploadedFiles(files);
    };
    fetchFiles();
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newFile: UploadedFile = {
        name: file.name,
        type: file.type,
        size: file.size,
        section: ['transcript', 'summary', 'actionItems', 'openQuestions'], // Example sections
        url: URL.createObjectURL(file)
      };
      
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(newFile);
      setShowFileSelector(true);
      // onFileUpload(newFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const selectFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setDropdownOpen(false);
  };

  const clearFileInput = () => {
    fileInputRef.current.value = null;
    setSelectedFile(null);
    setShowFileSelector(false);
    setIsSubmitted(false)
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        const file = new File([selectedFile.url], selectedFile.name, { type: selectedFile.type });
        const response = await uploadFile(file);
        console.log(response);
        onFileUpload(selectedFile);
        setIsSubmitted(true);
      } catch (error) {
        console.error('File upload failed', error);
      }
    }
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

  // const availableTabs: TranscriptTab[] = ['transcript', 'summary', 'actionItems', 'openQuestions'].filter((tab): tab is TranscriptTab =>
  //   uploadedFiles.some(file => file.section.includes(tab as TranscriptTab))
  // );
  const availableTabs: TranscriptTab[] = selectedFile ? selectedFile.section : [];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div 
          className="border border-gray-300 rounded p-3 flex items-center justify-between cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="text-gray-500"> {selectedFile ? selectedFile.name : 'Upload files (video, audio, .zip)'}</div>
          <Upload size={20} className="text-gray-400" />
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept="video/*,audio/*,.zip"
          />
        </div>
        <div className="mt-2 flex space-x-2">
              <button 
                className={`px-4 py-1 rounded ${selectedFile ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
                disabled={!selectedFile}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button 
                className="px-4 py-1 rounded bg-red-500 text-white"
                onClick={clearFileInput}
              >
                Clear
              </button>
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

      {/* {selectedFile && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium">Selected File</h3>
          <p className="text-sm mt-2"><strong>Name:</strong> {selectedFile.name}</p>
          <p className="text-sm"><strong>Type:</strong> {selectedFile.type}</p>
          <p className="text-sm"><strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )} */}

      {isSubmitted && selectedFile && (
        <>
          <div className="flex border-b border-gray-200">
          {availableTabs.includes('transcript') && (
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'transcript' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('transcript')}
            >
              Transcript
            </button>
          )}

{availableTabs.includes('summary') && (
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
)}
{availableTabs.includes('actionItems') && (
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'actionItems' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('actionItems')}
            >
              Action Items
            </button>
)}
{availableTabs.includes('openQuestions') && (
            <button 
              className={`px-6 py-3 font-medium text-sm ${activeTab === 'openQuestions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('openQuestions')}
            >
              Open Questions
            </button>
)}
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
