'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getApps } from '@/lib/data';
import Link from 'next/link';

export function BrowseSidebar() {
  const apps = getApps();
  const allCategories = Array.from(new Set(apps.flatMap((app) => app.categories)));
  const allTags = Array.from(new Set(apps.flatMap((app) => app.tags)));
  const topBuilders = Array.from(new Set(apps.map(app => app.submittedBy))).slice(0, 10);

  return (
    <aside className="w-full md:w-64 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {allCategories.map((category) => (
              <li key={category}>
                <Link href="#" className="hover:text-primary transition-colors">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
             {allTags.slice(0, 15).map((tag) => (
               <Link href="#" key={tag} className="bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full transition-colors">
                  {tag}
                </Link>
            ))}
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Top Builders</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {topBuilders.map((builder) => (
              <li key={builder}>
                <Link href="#" className="hover:text-primary transition-colors">
                  @{builder}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
