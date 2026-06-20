import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s | Aditya Gupta',
  },
  description:
    'Technical articles on software engineering, AI systems, and cloud-native development.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="main-content" className="min-h-screen bg-transparent">
      {children}
    </div>
  );
}
