import Link from 'next/link';
import Image from 'next/image';
import type { VercelApp } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowUp, MessageSquare } from 'lucide-react';

interface AppCardProps {
  app: VercelApp;
  rank: number;
}

export function AppCard({ app, rank }: AppCardProps) {
  const netVotes = app.upvotes - app.downvotes;

  return (
    <div className="flex items-center gap-4 md:gap-6 p-4 rounded-lg border border-transparent hover:border-primary/20 hover:bg-card transition-all group">
      <Link href={`/app/${app.id}`} className="flex-shrink-0">
        <Image
          src={app.image}
          alt={app.name}
          width={80}
          height={80}
          className="rounded-md object-cover w-16 h-16 md:w-20 md:h-20 border"
          {...(app['data-ai-hint'] && {'data-ai-hint': app['data-ai-hint']})}
        />
      </Link>
      <div className="flex-grow">
        <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-muted-foreground">{rank}.</span>
            <Link href={`/app/${app.id}`}>
                <h3 className="text-lg font-bold font-headline group-hover:text-primary transition-colors">
                    {app.name}
                </h3>
            </Link>
        </div>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">{app.description}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {app.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 flex-shrink-0 ml-4">
        <Button variant="outline" className="w-[80px] flex-col h-auto py-2">
           <ArrowUp className="h-4 w-4" />
           <span className="font-bold mt-1">{netVotes}</span>
        </Button>
      </div>
    </div>
  );
}
