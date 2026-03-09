import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile — Next Architecture',
  description: 'View and manage your user profile.',
};

export default function ProfilePage() {
  return <div className="w-full">Profile Page</div>;
}
