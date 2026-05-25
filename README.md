# Developer Portfolio (Next.js)

Next.js 15 App Router port of the Gatsby portfolio. Content is loaded from JSON files in `data/` instead of GraphQL.

## Prerequisites

- Node.js 18.17 or later
- npm

## Setup

```bash
cd My_portfolio-next
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Environment variables

Optional:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata (default: `https://yourportfolio.netlify.app`) |

## Pages

| Route | Description |
|-------|-------------|
| `/playground` | JS, React, and Next.js tabs with live console + preview |

## Project structure

- `app/` — App Router pages and layout
- `components/` — UI components (client components use `"use client"` for Framer Motion and forms)
- `context/` — Theme provider
- `data/` — Site, skills, and projects JSON
- `lib/` — Data helpers and metadata builder

## Editing content

Update JSON in:

- `data/site/site.json`
- `data/skills/skills.json`
- `data/projects/projects.json`

No GraphQL or CMS required for local edits.
