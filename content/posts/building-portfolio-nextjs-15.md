---
title: "Building a Portfolio on Next.js 15 — What I Optimized Before Shipping"
date: "2026-06-05"
summary: "From static generation and SEO metadata to performance hygiene and deploy config — lessons from shipping my own engineering portfolio on Vercel."
tags: ["Next.js", "React", "Performance", "SEO", "Vercel"]
---

Personal portfolios are deceptively complex. They look simple, but you still need routing, metadata, content management, contact forms, and performance discipline — without over-engineering.

Here is what I prioritized when building my portfolio on **Next.js 15** and preparing it for production.

---

## Static-first where possible

The home page and blog posts are statically generated at build time. That means:

- Fast TTFB on Vercel's edge
- Predictable deploys
- No database required for blog content

Blog posts live as Markdown files in `content/posts/` and are parsed at build time. For a personal site with a handful of articles, file-based content beats CMS overhead.

---

## Metadata that recruiters and crawlers actually see

Every page defines meaningful titles and descriptions. The root layout sets `metadataBase`, Open Graph defaults, Twitter cards, `robots`, and a sitemap.

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  openGraph: { type: "website", url: siteUrl, siteName, title: siteTitle },
};
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs resolve correctly.

---

## Performance hygiene beats micro-optimizations

Before chasing exotic optimizations, I fixed the basics:

- Dynamic import for below-the-fold sections
- Particles and cursor effects loaded client-side only
- Removed unused dependencies and fonts
- Production build kept First Load JS around **~196 kB** on `/`

Run `npm run build` locally before every deploy. If the build fails or bundle size jumps, fix it before pushing.

---

## Dev stability matters too

Corrupted `.next` caches during HMR caused CSS chunk 404s in development. A `dev:clean` script (delete `.next`, restart dev) saved hours of debugging.

This does not affect production, but unstable dev erodes confidence fast.

---

## Deploy checklist on Vercel

1. Push to GitHub and import the repo
2. Set environment variables (`NEXT_PUBLIC_SITE_URL`, EmailJS keys)
3. Verify contact form, blog routes, and hash navigation on the preview URL
4. Connect custom domain and re-run smoke tests

---

## What I would add next

- Custom OG image for social previews
- Real project screenshots instead of placeholder mockups
- One live deployed demo link

The goal is not a perfect site — it is a **credible, fast, maintainable** site you are not embarrassed to send in an application.

Ship early, iterate in public.
