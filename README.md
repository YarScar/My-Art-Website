# Little Butterfly 🦋

A beautiful fine art portfolio website for **Little Butterfly** — an original paintings business.
Built with Next.js 14, Prisma, and PostgreSQL. Purple + gold colour scheme with a bubbly, creative aesthetic.

---

## Overview

- Elegant Next.js 14 App Router site with a rich, artistic visual design.
- Full CRUD API for artworks with Prisma + PostgreSQL.
- File upload pipeline storing artwork images in `public/uploads`.
- Contact form persistence for enquiries and commission requests.
- Smooth admin panel for adding artworks inline from the gallery.
- Future-ready for hosted DB (Neon PostgreSQL or similar).

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured works, quote, commission CTA |
| About | `/about` | Artist story, process, stats |
| My Work | `/work` | Full gallery with filtering, artwork details modal |
| Contact | `/contact` | Commission & enquiry form |

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Data**: Prisma ORM, PostgreSQL (via `@prisma/adapter-pg`)
- **Testing**: Vitest
- **Fonts**: Playfair Display, Cormorant Garamond, DM Sans (Google Fonts)

## Data Model

### `Artwork`
| Field | Type | Description |
|-------|------|-------------|
| `id` | Int PK | Auto-increment |
| `title` | String | Painting title |
| `description` | String | Short description (shown on card) |
| `long` | String? | Full description (shown in modal) |
| `image` | String? | Image path or URL |
| `price` | Float | Price in USD |
| `medium` | String? | e.g. "Oil on Canvas" |
| `dimensions` | String? | e.g. "60 × 80 cm" |
| `year` | Int? | Year created |
| `sold` | Boolean | Whether the piece is sold |
| `tags` | String[] | e.g. ["abstract", "purple"] |
| `createdAt` | DateTime | Auto timestamp |

### `Message`
| Field | Type |
|-------|------|
| `id` | Int PK |
| `name` | String? |
| `email` | String? |
| `message` | String |
| `createdAt` | DateTime |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/artworks` | List all artworks (newest first) |
| `POST` | `/api/artworks` | Create artwork `{ title, description, price, ... }` |
| `GET` | `/api/artworks/[id]` | Fetch single artwork |
| `PUT` | `/api/artworks/[id]` | Update artwork (requires `title`, `description`) |
| `DELETE` | `/api/artworks/[id]` | Delete artwork |
| `POST` | `/api/contact` | Submit contact/enquiry `{ name?, email?, message }` |
| `POST` | `/api/upload` | Upload image (multipart); returns `{ url: "/uploads/<file>" }` |
| `GET` | `/api/dev/artworks` | Dev utility: `{ ok, count, artworks }` |

## Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env and set your DATABASE_URL
```

### 4. Run database migrations
```bash
npx prisma migrate dev --name init
# or apply the SQL directly:
psql $DATABASE_URL < prisma/migrations/001_init.sql
```

### 5. Generate Prisma client
```bash
npx prisma generate
```

### 6. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🦋

## Adding Your Artworks

On the **My Work** page, click **+ Add Artwork** to open the inline admin panel. Fill in:
- Title, description, full description
- Price, medium, dimensions, year
- Upload an image from your computer
- Tags (comma-separated)
- Mark as sold when a piece is purchased

## Customising the About Page

Open `app/about/page.tsx` and update:
- The bio text in the "Story" section
- The portrait image (replace the placeholder blob with an `<Image>` component)
- The stats at the bottom

## Hosted Database (Neon)

1. Create a free PostgreSQL instance at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Set it as `DATABASE_URL` in your `.env` or deployment platform

---

*Built with 🦋 for Little Butterfly Fine Art*
