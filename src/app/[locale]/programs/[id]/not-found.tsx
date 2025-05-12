import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-neutral-100">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Program Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The program you are looking for does not exist or may have been removed.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
} 