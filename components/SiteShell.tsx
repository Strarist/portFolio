'use client';

import dynamic from 'next/dynamic';

const BackgroundParticles = dynamic(
  () => import('@/components/ui/BackgroundParticles'),
  { ssr: false }
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-frame">
      <BackgroundParticles />
      <div className="site-header-glow" aria-hidden="true" />
      <div className="site-body">{children}</div>
    </div>
  );
}
