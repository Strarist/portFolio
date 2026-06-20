export const HELLO_STORAGE_KEY = 'portfolio-hello-seen';

/** Inlined in <head> — must run before body paints. */
export const HELLO_CRITICAL_CSS = `
html:not(.hello-ready) .site-frame {
  visibility: hidden !important;
}
#hello-static-splash {
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: none;
  align-items: center;
  justify-content: center;
  background: #050508;
}
html:not(.hello-ready) #hello-static-splash {
  display: flex;
}
`;

/** Return visitors: unlock portfolio before first paint. First visit: stay locked until hello finishes. */
export const HELLO_BOOT_SCRIPT = `(function(){try{if(sessionStorage.getItem('${HELLO_STORAGE_KEY}')==='1'){document.documentElement.classList.add('hello-ready')}}catch(e){}})();`;

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
  document.documentElement.classList.add('hello-ready');
}
