'use client';

import dynamic from 'next/dynamic';

const Cursor = dynamic(
  () => import('@/components/ui/Cursor').then((mod) => ({ default: mod.Cursor })),
  { ssr: false }
);

const Toaster = dynamic(
  () => import('sonner').then((mod) => ({ default: mod.Toaster })),
  { ssr: false }
);

export function DeferredUi() {
  return (
    <>
      <Cursor />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
