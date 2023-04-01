export interface Tool {
  name: string;
  url: string;
}

export interface Job {
  company: string;
  location: string;
  position: string;
  startedAt: string;
  left: string;
  description: string;
  accomplishments: string[];
  responsibilities: string[];
  tools: Tool[];
}

export interface Project {
  name: string;
  repository: string;
  description: string;
  toolsUsed: Tool[];
}

export interface Keyboard {
  name: string;
  link: string;
  imageUrl: string;
  description: string;
}
