
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { VercelApp } from '@/lib/types';

interface MainNavProps {
  apps: VercelApp[];
}

export function MainNav({ apps }: MainNavProps) {
  const pathname = usePathname();
  const newApps = [...apps]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  const toolApps = apps
    .filter((app) => app.categories.includes('Developer Tools'))
    .slice(0, 5);
  const gameApps = apps
    .filter((app) => app.categories.includes('Games'))
    .slice(0, 5);

  return (
    <div className="mr-4 hidden md:flex">
      <nav className="flex items-center gap-6 text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>New</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {newApps.map((app) => (
                    <ListItem
                      key={app.name}
                      title={app.name}
                      href={`/app/${app.id}`}
                    >
                      {app.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {toolApps.map((app) => (
                    <ListItem
                      key={app.name}
                      title={app.name}
                      href={`/app/${app.id}`}
                    >
                      {app.description}
                    </ListItem>
                  ))}
                   {!toolApps.length && <p className="p-4 text-sm text-muted-foreground">No tools yet. Submit one!</p>}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Games</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   {gameApps.map((app) => (
                    <ListItem
                      key={app.name}
                      title={app.name}
                      href={`/app/${app.id}`}
                    >
                      {app.description}
                    </ListItem>
                  ))}
                  {!gameApps.length && <p className="p-4 text-sm text-muted-foreground">No games yet. Submit one!</p>}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
