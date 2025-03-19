export interface ContentProps {
  dashboardType: 1 | 2 | 3;
  textSize?: 'small' | 'medium' | 'large';
  searchQuery?: string;
  headerSearchQuery?: string;
  showMetricScreen: boolean
  setShowMetricScreen: (show: boolean) => void
}

export interface Message {
  type: 'query' | 'response';
  content: string;
  minimized?: boolean;
}

export interface TextSizeStyles {
  question: string;
  answer: string;
  spacing: string;
  heading: string;
}

export const textSizeStyles = {
  small: {
    question: 'text-sm',
    answer: 'text-sm',
    spacing: 'mb-2',
    heading: 'text-base'
  },
  medium: {
    question: 'text-base',
    answer: 'text-base',
    spacing: 'mb-2',
    heading: 'text-lg'
  },
  large: {
    question: 'text-lg',
    answer: 'text-lg',
    spacing: 'mb-2',
    heading: 'text-xl'
  }
};

// Define file upload related interfaces
export interface UploadedFile {
  name: string;
  type: string;
  size: number;
  section: TranscriptTab[]
  url?: string;
}

// Tab types for Transcript view
export type TranscriptTab = 'transcript' | 'summary' | 'actionItems' | 'openQuestions';

export interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  duration: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: number;
  progress: number;
}

export interface ChatTopic {
  id: string;
  title: string;
  messages: number;
  lastMessageTime: string;
}
