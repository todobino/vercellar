'use client';
import type { VercelApp } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';
import { AppCard } from './app-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { getCategories } from '@/lib/data';
import { Button } from './ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppDirectoryProps {
  apps: VercelApp[];
}

export function AppDirectory({ apps }: AppDirectoryProps) {
  const [category, setCategory] = useState('All Types');
  const [sortBy, setSortBy] = useState('votes');
  const [layout, setLayout] = useState<'list' | 'grid'>('list');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const sortedApps = useMemo(() => {
    let filtered = apps;

    if (category !== 'All Types') {
      filtered = filtered.filter((app) => app.categories.includes(category));
    }
    
    return filtered.sort((a, b) => {
        if (sortBy === 'votes') {
            return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        }
        if (sortBy === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
  }, [apps, category, sortBy]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
         <h2 className="text-2xl font-bold font-headline">Latest</h2>
         <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg">
                <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setLayout('list')}>
                    <List className="h-4 w-4" />
                </Button>
                <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setLayout('grid')}>
                    <LayoutGrid className="h-4 w-4" />
                </Button>
            </div>
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                    {cat}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="votes">Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                </SelectContent>
            </Select>
         </div>
      </div>

      <div className={cn(
        layout === 'list' 
          ? 'flex flex-col gap-4' 
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      )}>
          {sortedApps.map((app, index) => (
            <AppCard key={app.id} app={app} rank={layout === 'list' ? index + 1 : undefined} layout={layout} />
          ))}
      </div>
       {sortedApps.length === 0 && (
          <div className="text-center col-span-full py-12 text-muted-foreground">
            No applications found. Try adjusting your filters.
          </div>
        )}
    </div>
  );
}
