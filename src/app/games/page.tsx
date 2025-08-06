import { AppDirectory } from '@/components/app-directory';
import { BrowseSidebar } from '@/components/browse-sidebar';
import { getApps, getCategories } from '@/lib/data';

export default function GamesPage() {
   const apps = getApps().filter(app => 
    app.categories.includes('Games') || 
    app.categories.includes('Art & Design')
  );
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
            <BrowseSidebar />
            <div className="flex-1">
                <AppDirectory apps={apps} />
            </div>
        </div>
    </div>
  );
}
