export const HELLO_STORAGE_KEY = 'portfolio-hello-seen';

/** Runs before React hydrates to prevent a flash of page content on first visit. */
export const HELLO_BOOT_SCRIPT = `(function(){try{if(sessionStorage.getItem('${HELLO_STORAGE_KEY}')!=='1')document.documentElement.classList.add('hello-pending')}catch(e){document.documentElement.classList.add('hello-pending')}})();`;

export function shouldShowHelloPreloader(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(HELLO_STORAGE_KEY) !== '1';
  } catch {
    return true;
  }
}

export function markHelloPreloaderSeen(): void {
  try {
    sessionStorage.setItem(HELLO_STORAGE_KEY, '1');
  } catch {
    /* private browsing */
  }
}

export function clearHelloPending(): void {
  document.documentElement.classList.remove('hello-pending');
}
