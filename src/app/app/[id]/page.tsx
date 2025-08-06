import { getAppById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { VoteButtons } from '@/components/vote-buttons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AppDetailPageProps {
  params: {
    id: string;
  };
}

export default function AppDetailPage({ params }: AppDetailPageProps) {
  const app = getAppById(params.id);

  if (!app) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{app.name}</h1>
        <p className="text-xl text-muted-foreground">{app.description}</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden border border-border mb-8 shadow-lg">
            <Image
              src={app.image}
              alt={app.name}
              width={1200}
              height={630}
              className="object-cover w-full h-full"
              priority
              {...(app['data-ai-hint'] && {'data-ai-hint': app['data-ai-hint']})}
            />
          </div>
          <div className="prose prose-invert max-w-none prose-p:text-lg prose-p:text-muted-foreground">
             <p>{app.longDescription}</p>
          </div>
        </div>

        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Vote</CardTitle>
            </CardHeader>
            <CardContent>
                <VoteButtons
                    initialUpvotes={app.upvotes}
                    initialDownvotes={app.downvotes}
                    appId={app.id}
                />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                 <Button asChild className="w-full justify-start" variant="outline">
                    <a href={app.vercelUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" /> Visit Website
                        <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                    <a href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> View on GitHub
                        <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                    </a>
                </Button>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Submitted by</span>
                        <span>{app.submittedBy}</span>
                    </div>
                     <Separator />
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Published</span>
                        <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                     <Separator />
                    <div className="space-y-2">
                         <span className="text-muted-foreground d-block mb-2">Categories</span>
                        <div className="flex flex-wrap gap-2">
                            {app.categories.map((category) => (
                                <Badge key={category} variant="secondary">{category}</Badge>
                            ))}
                        </div>
                    </div>
                     <Separator />
                     <div className="space-y-2">
                         <span className="text-muted-foreground d-block mb-2">Tags</span>
                        <div className="flex flex-wrap gap-2">
                            {app.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
