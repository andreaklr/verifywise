export const ENV_VARs = {
  URL:
    import.meta.env.VITE_APP_API_BASE_URL ??
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}${
          window.location.protocol === "https:" ? "" : ":3000"
        }`
      : "https://accordantai2back.onrender.com"), // fallback per SSR o ambienti server

  IS_DEMO_APP: import.meta.env.VITE_IS_DEMO_APP === "true",
  IS_MULTI_TENANT: import.meta.env.VITE_IS_MULTI_TENANT === "true",
};
