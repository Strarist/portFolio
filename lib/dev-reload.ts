export const DEV_RELOAD_KEY = 'portfolio-dev-reload-once';

export function reloadDevOnce(reason: string): boolean {
  if (process.env.NODE_ENV !== 'development') return false;

  try {
    if (sessionStorage.getItem(DEV_RELOAD_KEY) === '1') return false;
    sessionStorage.setItem(DEV_RELOAD_KEY, '1');
  } catch {
    /* private browsing */
  }

  console.warn(`[portfolio] ${reason} — reloading once.`);
  window.location.reload();
  return true;
}

export function clearDevReloadKey(): void {
  try {
    sessionStorage.removeItem(DEV_RELOAD_KEY);
  } catch {
    /* ignore */
  }
}
