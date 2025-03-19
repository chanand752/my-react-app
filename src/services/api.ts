
import { Meeting, Project, ChatTopic } from '@/components/dashboard/models';

// Mock API functions to fetch data
export async function fetchMeetings(): Promise<Meeting[]> {
  try {
    const response = await fetch('/src/mockData/meetings.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/src/mockData/projects.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchChatTopics(): Promise<ChatTopic[]> {
  try {
    const response = await fetch('/src/mockData/chatTopics.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat topics:', error);
    return [];
  }
}
