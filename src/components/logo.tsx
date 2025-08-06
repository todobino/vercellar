import Link from 'next/link';

function VercelIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path d="M12 2L2 19.5H22L12 2Z" fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Vercellar Home">
      <VercelIcon />
      <h1 className="text-xl font-bold font-headline text-white">Vercellar</h1>
    </Link>
  );
}
