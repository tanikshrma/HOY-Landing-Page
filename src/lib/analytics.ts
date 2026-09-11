/**
 * One place that every conversion event goes through.
 *
 * Ad platforms are wired up by setting the env vars below at build time —
 * no code change needed to add a pixel:
 *
 *   VITE_META_PIXEL_ID=123456789
 *   VITE_GA4_ID=G-XXXXXXXXXX
 *   VITE_GTM_ID=GTM-XXXXXXX
 *
 * If none are set, everything below is an inert no-op, so local dev and
 * preview builds do not pollute your ad reporting.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    _hoyPixelReady?: boolean;
  }
}

export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
export const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
export const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

type EventName =
  | 'page_view'
  | 'form_start'
  | 'form_error'
  | 'lead'
  | 'lead_duplicate'
  | 'sold_out_view'
  | 'cta_click'
  | 'faq_open';

/** Meta's standard event names, so the pixel reports against the right column. */
const META_EVENT: Partial<Record<EventName, string>> = {
  page_view: 'PageView',
  form_start: 'InitiateCheckout',
  lead: 'Lead',
};

function loadScript(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

let initialised = false;

/**
 * Injects whichever tags are configured. Called once, deferred until the page
 * is interactive so third-party scripts never compete with the hero image.
 */
export function initAnalytics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;

  window.dataLayer = window.dataLayer || [];

  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  }

  if (GA4_ID) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
    // Google's own snippet pushes the `arguments` object, not an array — gtag.js
    // identifies commands by that shape, so keep it verbatim.
    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { send_page_view: false });
  }

  if (META_PIXEL_ID) {
    /* Meta's loader, transcribed rather than eval'd from a blob. */
    const q: unknown[] = [];
    const fbq = ((...args: unknown[]) => {
      // @ts-expect-error — callMethod is attached by the real script once loaded.
      if (fbq.callMethod) fbq.callMethod(...args);
      else q.push(args);
    }) as typeof window.fbq & { queue: unknown[]; loaded: boolean; version: string };
    fbq.queue = q;
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window._hoyPixelReady = true;
  }

  track('page_view');
}

/** Fires a single logical event out to every configured destination. */
export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer?.push({ event: `hoy_${event}`, ...params });

  if (GA4_ID && window.gtag) {
    window.gtag('event', event === 'page_view' ? 'page_view' : event, params);
  }

  if (META_PIXEL_ID && window.fbq) {
    const standard = META_EVENT[event];
    if (standard) window.fbq('track', standard, params);
    else window.fbq('trackCustom', event, params);
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', event, params);
  }
}

/**
 * Captures the campaign parameters the visitor arrived with and holds them for
 * the session, so a lead submitted after scrolling still carries its source.
 */
const TRACKED_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid',
] as const;

const STORAGE_KEY = 'hoy_attribution';

export function captureAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    /* private mode, or someone cleared it mid-session */
  }

  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of TRACKED_KEYS) {
    const v = params.get(key);
    if (v) fresh[key] = v;
  }

  // Keys from the current URL win; otherwise keep what the session already had.
  const merged = { ...stored, ...fresh };
  if (Object.keys(fresh).length) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* non-fatal */
    }
  }
  return merged;
}
