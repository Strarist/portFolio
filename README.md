# Aditya Gupta — Portfolio

Personal portfolio site built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

## Features

- Dark premium UI with engineering-focused sections
- Projects, experience, certifications, publications, and blog
- Contact form via EmailJS
- Command palette (`Ctrl+K` / `⌘K`)
- SEO: sitemap, robots, Open Graph metadata

## Local development

```bash
npm install
cp .env.example .env.local   # add EmailJS keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**If styles disappear in dev** (404 on CSS chunks), stop the server and run:

```bash
npm run dev:clean
```

Then hard refresh the browser (`Ctrl+Shift+R`).

## Production build

```bash
npm run build
npm run start
```

## Deploy (recommended: Vercel)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — your production URL (no trailing slash)
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Deploy

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run dev:clean` | Clear `.next` cache, then start dev |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Contact

- **Email:** 2002guptaadi@gmail.com
- **GitHub:** [Strarist](https://github.com/Strarist)
- **LinkedIn:** [adigupta1620](https://linkedin.com/in/adigupta1620)
