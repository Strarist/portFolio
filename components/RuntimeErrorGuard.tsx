'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'portfolio-chunk-reload';

function isChunkLoadFailure(reason: unknown): boolean {
  if (reason instanceof Event) return true;

  if (reason instanceof Error) {
    const msg = reason.message.toLowerCase();
    return (
      reason.name === 'ChunkLoadError' ||
      msg.includes('loading chunk') ||
      msg.includes('failed to fetch dynamically imported module')
    );
  }

  if (typeof reason === 'string') {
    const lower = reason.toLowerCase();
    return lower.includes('chunk') || lower.includes('dynamically imported');
  }

  return false;
}

/**
 * Recovers from stale dev HMR / chunk 404s that reject with [object Event].
 * Reloads once per session instead of showing the Next.js error overlay.
 */
export function RuntimeErrorGuard() {
  useEffect(() => {
    const onRejection = (event: PromiseRejectionEvent) => {
      if (!isChunkLoadFailure(event.reason)) return;

      event.preventDefault();

      if (process.env.NODE_ENV === 'development') {
        console.warn('[portfolio] Recovering from chunk load failure — reloading once.');
      }

      try {
        if (sessionStorage.getItem(RELOAD_KEY) === '1') return;
        sessionStorage.setItem(RELOAD_KEY, '1');
      } catch {
        /* private browsing */
      }

      window.location.reload();
    };

    window.addEventListener('unhandledrejection', onRejection);
    return () => window.removeEventListener('unhandledrejection', onRejection);
  }, []);

  return null;
}
