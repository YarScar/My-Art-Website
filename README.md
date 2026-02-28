# ��� Little Butterfly — Fine Art Portfolio

A personal fine art portfolio website built with **Next.js 14**, **Prisma**, and **Neon (PostgreSQL)**. Visitors can browse original paintings, view details, and send commission enquiries. The site includes a hidden password-protected admin panel for managing artworks and reading messages.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home / landing page |
| `/about` | About the artist |
| `/work` | Gallery of all artworks |
| `/contact` | Contact / commission form |

---

## Features

- **Gallery** — filterable by All / Available / Sold
- **Artwork modal** — click any painting to see full details, price, medium, dimensions, and tags
- **Contact form** — visitor messages are saved to the database
- **Password-protected admin panel** — hidden behind the ��� logo click
  - Add new artworks (with image upload)
  - Edit existing artworks
  - Delete artworks
  - Read all contact form submissions (messages inbox)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | [Neon](https://neon.tech/) (PostgreSQL) |
| ORM | [Prisma](https://www.prisma.io/) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/little-butterfly.git
cd little-butterfly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
# Neon PostgreSQL connection string
DATABASE_URL='postgresql://...'

# Admin password — only you know this. Change this to whatever you want.
ADMIN_PASSWORD=your-secret-password
```

> ⚠️ Never commit `.env` to GitHub. It is listed in `.gitignore`.

### 4. Push the database schema

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Access

The admin panel is completely hidden from visitors. To access it:

1. Go to any page on your site
2. Click the **��� emoji** in the top-left navbar
3. Enter your admin password (set in `.env` as `ADMIN_PASSWORD`)
4. The **+ Add Artwork** button appears on the Work page and the panel unlocks
5. Click **��� Exit Admin** in the navbar to lock it again immediately

The unlock lasts for the current browser session only — closing the tab locks it again automatically.

---

## Database Models

### `Artwork`
| Field | Type | Notes |
|---|---|---|
| id | Int | Auto-increment primary key |
| title | String | Required |
| description | String | Short description shown on the card |
| long | String? | Full description shown in the modal |
| image | String? | URL or uploaded file path |
| price | Float | Required |
| medium | String? | e.g. Oil on Canvas |
| dimensions | String? | e.g. 60 × 80 cm |
| year | Int? | Year created |
| sold | Boolean | Defaults to false |
| tags | String[] | Array of tag strings |
| createdAt | DateTime | Auto-set on creation |

### `Message`
| Field | Type | Notes |
|---|---|---|
| id | Int | Auto-increment primary key |
| name | String? | Sender name (optional) |
| email | String? | Sender email (optional) |
| message | String | Required |
| createdAt | DateTime | Auto-set on creation |

---

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/artworks` | Fetch all artworks |
| POST | `/api/artworks` | Create a new artwork |
| GET | `/api/artworks/[id]` | Fetch a single artwork |
| PUT | `/api/artworks/[id]` | Update an artwork |
| DELETE | `/api/artworks/[id]` | Delete an artwork |
| GET | `/api/contact` | Fetch all messages |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/auth` | Verify admin password (server-side only) |
| POST | `/api/upload` | Upload an artwork image |

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Lint the codebase
npx prisma studio  # Open local visual database browser at localhost:5555
npx prisma db push # Push schema changes to the database
```

---

*Built with ��� for Little Butterfly Fine Art*
