import { NotFound } from '@/assets/images';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const CatchAll = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <Image
          width={256}
          height={256}
          fetchPriority="high"
          alt="Not Found"
          src={NotFound}
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            The page you are looking for does not exist or has been moved.
            Please return to the home page to continue.
          </p>
        </div>
        <Button asChild size="lg" className="px-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default CatchAll;
