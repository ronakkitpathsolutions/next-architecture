import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Next Architecture',
  description:
    'Read our privacy policy to understand how we handle your personal data.',
};

export default function PrivacyPolicyPage() {
  return <div className="w-full">Privacy Policy Page</div>;
}
