/**
 * Centralised environment variables for the React client.
 * ─────────────────────────────────────────────────────────
 * • If VITE_APP_API_BASE_URL is set → use it.
 * • Otherwise, always fall back to the Render backend URL.
 *      – No localhost/port juggling in production.
 * • Booleans are normalised from string values.
 */

export const ENV_VARs = {
  // Base URL the frontend will use for every API request
  URL:
    (import.meta.env.VITE_APP_API_BASE_URL as string | undefined) ||
    "https://accordantai2back.onrender.com",

  // Feature flags
  IS_DEMO_APP: import.meta.env.VITE_IS_DEMO_APP === "true",
  IS_MULTI_TENANT: import.meta.env.VITE_IS_MULTI_TENANT === "true",
} as const;
