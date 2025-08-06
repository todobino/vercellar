import { AppDirectory } from '@/components/app-directory';
import { getApps } from '@/lib/data';

export default function Home() {
  const apps = getApps();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
          Welcome to Vercellar
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover, vote, and submit the best applications hosted on Vercel.
        </p>
      </section>

      <AppDirectory apps={apps} />
    </div>
  );
}
