import React, { useState } from 'react';

interface MetricScreenProps {
  onClose: () => void;
}

const steps = [
  { title: 'Define', content: 'Define Content' },
  { title: 'Select', content: 'Select Content' },
  { title: 'Review', content: 'Review Content' },
  { title: 'Approve', content: 'Approve Content' },
  { title: 'Publish', content: 'Publish Content' },
];

const MetricScreen: React.FC<MetricScreenProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <div key={index} className={`flex-1 text-center ${index <= currentStep ? 'text-blue-500' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
        <p>{steps[currentStep].content}</p>
      </div>
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default MetricScreen;