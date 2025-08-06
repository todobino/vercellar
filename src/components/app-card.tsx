import Link from 'next/link';
import Image from 'next/image';
import type { VercelApp } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface AppCardProps {
  app: VercelApp;
}

export function AppCard({ app }: AppCardProps) {
  const netVotes = app.upvotes - app.downvotes;

  return (
    <Link href={`/app/${app.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out border-border hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline group-hover:text-primary transition-colors">
                {app.name}
              </CardTitle>
              <CardDescription className="mt-1">{app.description}</CardDescription>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground ml-4 shrink-0">
                <ArrowUp className={`h-4 w-4 ${netVotes > 0 ? 'text-green-500' : ''}`} />
                <span>{netVotes}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
           <div className="aspect-video rounded-md overflow-hidden border border-border">
                <Image
                    src={app.image}
                    alt={app.name}
                    width={1200}
                    height={630}
                    className="object-cover w-full h-full"
                    {...(app['data-ai-hint'] && {'data-ai-hint': app['data-ai-hint']})}
                />
            </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-wrap gap-2">
            {app.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
