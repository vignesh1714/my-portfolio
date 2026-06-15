# Developer Portfolio (Next.js)

Personal developer portfolio built with Next.js 15 App Router. Content is loaded from JSON files in `data/`—no CMS or GraphQL required.

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
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |
| `SMTP_HOST` | SMTP server (Gmail: `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (Gmail: `587`) |
| `SMTP_SECURE` | `true` for port 465, otherwise `false` |
| `SMTP_USER` | SMTP login email |
| `SMTP_PASS` | SMTP password or Gmail [app password](https://myaccount.google.com/apppasswords) |
| `SMTP_FROM` | Optional `From` header (defaults to `SMTP_USER`) |

Copy `.env.example` to `.env.local` and fill in SMTP values before using the contact form.

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
