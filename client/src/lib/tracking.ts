declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a GTM event. Never pass personal data (names, phone numbers, emails). */
export function trackEvent(event: "fragebogen_start" | "fragebogen_submit") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}
