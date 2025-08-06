
import Link from 'next/link';
import { Pyramid } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mr-6" aria-label="Vercellar Home">
      <Pyramid className="h-6 w-6 text-white" />
      <h1 className="text-xl font-bold font-headline text-white">Vercellar</h1>
    </Link>
  );
}
