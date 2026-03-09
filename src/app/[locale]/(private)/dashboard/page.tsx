import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Next Architecture',
  description: 'Your personal dashboard overview.',
};

export default function DashboardPage() {
  return <div className="w-full">Dashboard Page</div>;
}
