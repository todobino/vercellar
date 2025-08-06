
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-provider';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { Logo } from '@/components/logo';
import { PlusCircle } from 'lucide-react';
import { MainNav } from './main-nav';
import { getApps } from '@/lib/data';

export function Header() {
  const { isAuthenticated, login } = useAuth();
  const apps = getApps();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <MainNav apps={apps}/>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button asChild variant="ghost">
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
