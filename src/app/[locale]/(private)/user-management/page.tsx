import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Management — Next Architecture',
  description: 'Manage users, roles, and permissions.',
};

export default function UserManagementPage() {
  return <div className="w-full">User Management Page</div>;
}
