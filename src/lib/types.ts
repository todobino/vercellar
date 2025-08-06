
export interface VercelApp {
  id: string;
  name: string;
  vercelUrl: string;
  githubUrl: string;
  description: string;
  longDescription: string;
  tags: string[];
  categories: string[];
  image: string;
  'data-ai-hint'?: string;
  upvotes: number;
  downvotes: number;
  submittedBy: string; // user name
  createdAt: string; // ISO date string
}
