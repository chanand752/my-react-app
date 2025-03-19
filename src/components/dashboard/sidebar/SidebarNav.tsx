
import React from 'react';
import { MessageSquare, Folder, Type, Clipboard,BarChart2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SidebarNavProps } from './types';

const SidebarNav: React.FC<SidebarNavProps & {
  textSize: 'small' | 'medium' | 'large';
  handleTextSizeChange: (size: 'small' | 'medium' | 'large') => void;
}> = ({ textSize, handleTextSizeChange, onMetricIconClick }) => {
  const handleMetricClick = () => {
    console.log("SidebarNav: Metric icon clicked")
    if (typeof onMetricIconClick === "function") {
      onMetricIconClick()
    } else {
      console.error("onMetricIconClick is not a function", onMetricIconClick)
    }
  }
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 justify-between h-full">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-orange-500 text-xl">&#129333;</span>
        </div>
        
        <nav className="flex flex-col space-y-6">
          <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500">
            <MessageSquare size={20} />
          </button>
          <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500">
            <Folder size={20} />
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500">
                <Type size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Text size and spacing</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-600 mb-4">This will change the font size and number of messages.</p>
                <RadioGroup 
                  value={textSize} 
                  onValueChange={(value) => handleTextSizeChange(value as 'small' | 'medium' | 'large')}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Large</Label>
                  </div>
                </RadioGroup>
              </div>
            </DialogContent>
          </Dialog>
          <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500">
            <Clipboard size={20} />
          </button>
          <button 
            className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 text-gray-500"
            onClick={handleMetricClick}
          >
            <BarChart2 size={20} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;
