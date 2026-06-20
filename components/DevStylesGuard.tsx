'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clearDevReloadKey, reloadDevOnce } from '@/lib/dev-reload';

function isNextAsset(target: EventTarget | null): boolean {
  if (!target || !('tagName' in target)) return false;

  const el = target as HTMLLinkElement | HTMLScriptElement;

  if (el.tagName === 'LINK') {
    const link = el as HTMLLinkElement;
    return link.rel === 'stylesheet' && (link.href.includes('_next') || link.href.includes('layout.css'));
  }

  if (el.tagName === 'SCRIPT') {
    const script = el as HTMLScriptElement;
    return Boolean(script.src?.includes('_next'));
  }

  return false;
}

/**
 * In dev, stale HMR or multiple `next dev` instances can leave routes pointing at 404 CSS/JS chunks.
 * Reload once when Next assets fail or Tailwind is clearly not applied.
 */
export function DevStylesGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const onResourceError = (event: Event) => {
      if (!isNextAsset(event.target)) return;
      reloadDevOnce('Next.js asset failed to load');
    };

    document.addEventListener('error', onResourceError, true);

    const timer = window.setTimeout(() => {
      const html = document.documentElement;
      const bg = getComputedStyle(html).backgroundColor;
      const isDark =
        bg.includes('5, 5, 8') ||
        bg.includes('10, 10, 15') ||
        bg.includes('oklch') ||
        bg === 'rgb(0, 0, 0)';

      if (isDark || bg === 'rgba(0, 0, 0, 0)') {
        clearDevReloadKey();
        return;
      }

      reloadDevOnce('Dark theme styles missing');
    }, 800);

    return () => {
      document.removeEventListener('error', onResourceError, true);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
