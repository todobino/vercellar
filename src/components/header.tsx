
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-provider';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import { PlusCircle, Search } from 'lucide-react';
import { MainNav } from './main-nav';
import { getApps } from '@/lib/data';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { VercelApp } from '@/lib/types';
import { AppCard } from './app-card';

export function Header() {
  const { isAuthenticated, login } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VercelApp[]>([]);
  const apps = getApps();

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = apps.filter(
        (app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, apps]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <MainNav apps={apps} />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-full md:h-auto md:max-h-[80vh] overflow-y-auto">
              <SheetHeader className="text-left">
                <SheetTitle>Search Vercellar</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <Input
                  placeholder="Search for apps, tools, games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="mt-6">
                {searchResults.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {searchResults.map((app) => (
                            <AppCard key={app.id} app={app} layout="list" />
                        ))}
                    </div>
                ) : (
                  searchQuery.length > 1 && (
                    <p className="text-center text-muted-foreground py-8">
                      No results found for &quot;{searchQuery}&quot;.
                    </p>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>

          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button asChild>
                  <Link href="/submit">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Submit App
                  </Link>
                </Button>
                <UserNav />
              </>
            ) : (
              <Button onClick={login}>Login with Vercel</Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
