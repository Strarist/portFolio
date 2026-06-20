/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. Vercel env). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://adityagupta.dev";

export const siteName = "Aditya Gupta";
export const siteTitle = "Aditya Gupta — Full Stack / Backend Engineer";
export const siteDescription =
  "Software Engineer Portfolio — building production-ready, AI-powered platforms and high-performance backends with React, FastAPI, PostgreSQL, Docker, Kubernetes, and AWS.";
