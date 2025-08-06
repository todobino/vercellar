
import type { VercelApp } from './types';

const MOCK_APPS: VercelApp[] = [
  {
    id: 'shadcn-ui',
    name: 'Shadcn/UI',
    vercelUrl: 'https://ui.shadcn.com/',
    githubUrl: 'https://github.com/shadcn/ui',
    description: 'Beautifully designed components that you can copy and paste into your apps.',
    longDescription: 'An open-source component library. Unlike other libraries, it is not a dependency. You can pick and choose the components you need, copy them into your project, and customize them to your heart\'s content. It is built on top of Tailwind CSS and Radix UI.',
    tags: ['components', 'react', 'tailwind', 'radix'],
    categories: ['Developer Tools', 'UI/UX'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'ui library',
    upvotes: 1250,
    downvotes: 23,
    submittedBy: 'shadcn',
    createdAt: '2023-01-15T10:30:00Z',
  },
  {
    id: 'cal-com',
    name: 'Cal.com',
    vercelUrl: 'https://cal.com/',
    githubUrl: 'https://github.com/calcom/cal.com',
    description: 'Scheduling infrastructure for everyone. An open-source alternative to Calendly.',
    longDescription: 'Cal.com is an open-source scheduling platform that helps you schedule meetings without the back-and-forth emails. It offers a flexible and customizable solution for individuals and businesses alike.',
    tags: ['scheduling', 'productivity', 'open-source'],
    categories: ['Productivity', 'Business'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'calendar product',
    upvotes: 980,
    downvotes: 15,
    submittedBy: 'peer',
    createdAt: '2023-02-20T14:00:00Z',
  },
  {
    id: 'dub-co',
    name: 'Dub.co',
    vercelUrl: 'https://dub.co/',
    githubUrl: 'https://github.com/steven-tey/dub',
    description: 'The open-source link shortener with built-in analytics and free custom domains.',
    longDescription: 'Dub.co provides a powerful and easy-to-use link management solution. Shorten, brand, and track your links with detailed analytics, all under your own custom domain. It is a great alternative to Bitly and other proprietary services.',
    tags: ['links', 'analytics', 'marketing'],
    categories: ['Marketing', 'Developer Tools'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'link analytics',
    upvotes: 760,
    downvotes: 8,
    submittedBy: 'steven-tey',
    createdAt: '2023-03-10T09:00:00Z',
  },
    {
    id: 'midjourney',
    name: 'Midjourney',
    vercelUrl: 'https://www.midjourney.com/',
    githubUrl: '',
    description: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    longDescription: 'Midjourney is a generative artificial intelligence program and service created and hosted by a San Francisco-based independent research lab, Midjourney, Inc. Midjourney generates images from natural language descriptions, called "prompts", similar to OpenAI\'s DALL-E and Stability AI\'s Stable Diffusion.',
    tags: ['ai', 'images', 'generative-art'],
    categories: ['AI', 'Art & Design'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'AI art',
    upvotes: 2100,
    downvotes: 50,
    submittedBy: 'davidh',
    createdAt: '2022-07-12T18:00:00Z',
  },
  {
    id: 'tiny-wow',
    name: 'TinyWow',
    vercelUrl: 'https://tinywow.com/',
    githubUrl: '',
    description: 'Free online conversion, pdf, and other handy tools to help you solve problems of all types.',
    longDescription: 'TinyWow provides a collection of free online tools for various purposes, including PDF editing, video manipulation, image processing, and more. It aims to offer simple solutions for everyday digital tasks without requiring software installation.',
    tags: ['tools', 'free', 'online-tools', 'pdf'],
    categories: ['Productivity', 'Developer Tools'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'utility tools',
    upvotes: 650,
    downvotes: 12,
    submittedBy: 'anon',
    createdAt: '2024-05-01T11:00:00Z',
  },
  {
    id: 'vercel-quest',
    name: 'Vercel Quest',
    vercelUrl: 'https://vercel.com/quest',
    githubUrl: '',
    description: 'An interactive game to learn about the latest features of Next.js and Vercel.',
    longDescription: 'Vercel Quest is a fun, interactive tutorial that guides you through the features of the Vercel platform and Next.js. Complete quests, earn points, and learn how to build high-performance web applications.',
    tags: ['nextjs', 'gamedev', 'learning'],
    categories: ['Developer Tools', 'Games'],
    image: 'https://placehold.co/1200x630.png',
    'data-ai-hint': 'coding game',
    upvotes: 430,
    downvotes: 5,
    submittedBy: 'vercel',
    createdAt: '2023-10-27T16:00:00Z',
  },
];

export function getApps(): VercelApp[] {
  return MOCK_APPS;
}

export function getAppById(id: string): VercelApp | undefined {
  return MOCK_APPS.find((app) => app.id === id);
}

export function getCategories(): string[] {
    const allCategories = MOCK_APPS.flatMap(app => app.categories);
    return ['All', ...Array.from(new Set(allCategories))];
}
