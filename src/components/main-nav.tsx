
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
import { Badge } from './ui/badge';

interface MainNavProps {
  apps: VercelApp[];
}

export function MainNav({ apps }: MainNavProps) {
  const pathname = usePathname();
  const newApps = [...apps]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  const toolCategories = [
      {title: "Developer Tools", description: "Tools for software developers.", href: "/tools?category=Developer+Tools"},
      {title: "Productivity", description: "Boost your efficiency.", href: "/tools?category=Productivity"},
      {title: "Marketing", description: "Tools for marketing and growth.", href: "/tools?category=Marketing"},
      {title: "AI", description: "The future is now.", href: "/tools?category=AI"}
  ]

  const gameCategories = [
      {title: "Games", description: "Fun and interactive experiences.", href: "/games?category=Games"},
      {title: "Art & Design", description: "Create and explore visuals.", href: "/games?category=Art+%26+Design"}
  ]

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
                <NavigationMenuTrigger>
                    <Link href="/tools">Tools</Link>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {toolCategories.map((cat) => (
                    <ListItem
                      key={cat.title}
                      title={cat.title}
                      href={cat.href}
                    >
                      {cat.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/games">Games</Link>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   {gameCategories.map((cat) => (
                    <ListItem
                      key={cat.title}
                      title={cat.title}
                      href={cat.href}
                    >
                      {cat.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
             <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="#">Resources</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="#">Community</Link>
                </NavigationMenuLink>
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
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || '#'}
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
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
