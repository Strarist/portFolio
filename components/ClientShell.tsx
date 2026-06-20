'use client';

import dynamic from 'next/dynamic';
import { RuntimeErrorGuard } from '@/components/RuntimeErrorGuard';
import { DevStylesGuard } from '@/components/DevStylesGuard';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const ScrollToTopBtn = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });

export function ClientShell() {
  return (
    <>
      <RuntimeErrorGuard />
      <DevStylesGuard />
      <ScrollProgress />
      <ScrollToTopBtn />
    </>
  );
}
