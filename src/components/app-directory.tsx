'use client';
import type { VercelApp } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';
import { AppCard } from './app-card';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { getCategories } from '@/lib/data';
import { AnimatePresence, motion } from 'framer-motion';

interface AppDirectoryProps {
  apps: VercelApp[];
}

export function AppDirectory({ apps }: AppDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('votes');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const filteredAndSortedApps = useMemo(() => {
    let filtered = apps;

    if (category !== 'All') {
      filtered = filtered.filter((app) => app.categories.includes(category));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
  }, [apps, category, searchTerm, sortBy]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-xs"
        />
        <div className="flex gap-4">
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
              <SelectItem value="votes">Most Votes</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
      </div>
       {filteredAndSortedApps.length === 0 && (
          <div className="text-center col-span-full py-12 text-muted-foreground">
            No applications found. Try adjusting your search or filters.
          </div>
        )}
    </div>
  );
}
