# AI Lab Schools Preview

Standalone preview of the AI Lab Schools cohort announcement and experience pages, extracted from the main Playlab app so they can be deployed without the full backend.

## Live

- https://ai-lab-schools-preview.vercel.app/ai-lab-schools
- https://ai-lab-schools-preview.vercel.app/ai-lab-schools/experience

## Stack

- Vite + React + React Router 7 in SPA mode (`ssr: false`)
- Tailwind CSS with Livvic + Montserrat fonts
- react-intl (with babel-plugin-formatjs for stable ids)
- d3-geo + topojson-client + us-atlas for the US map
- lucide-react icons

## Dev

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Deploy

Linked to `wyman-8003s-projects/ai-lab-schools-preview` on Vercel. Deployment Protection is off so the URL is publicly shareable.

```bash
vercel deploy --yes --prod
```

## Why this exists

The main playlab app's fullstack runtime (Prisma, Redis, auth middleware, LLM providers) crashes without env vars. These two routes don't actually need any of that, so they were extracted into a pure SPA for team review. Source of truth for future edits is still the `ai-lab-schools-cohort-announcement` branch on `playlab-education/playlab`; this folder is a publish target, not the canonical code.
