declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = 'G-Y3VZK11R6P';

/**
 * Fire a custom GA4 event.
 * Safe to call even before the gtag script loads — silently no-ops if unavailable.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  window.gtag?.('event', eventName, params);
}

/**
 * Notify GA4 of a client-side navigation (SPA page view).
 * Call this on every route change so state pages and other routes are tracked.
 */
export function trackPageView(path: string) {
  window.gtag?.('config', GA_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
