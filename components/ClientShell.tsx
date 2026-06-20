'use client';

import dynamic from 'next/dynamic';
import { RuntimeErrorGuard } from '@/components/RuntimeErrorGuard';

const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const ScrollToTopBtn = dynamic(() => import('@/components/ScrollToTop'), { ssr: false });
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

export function ClientShell() {
  return (
    <>
      <RuntimeErrorGuard />
      <Preloader />
      <ScrollProgress />
      <ScrollToTopBtn />
    </>
  );
}
