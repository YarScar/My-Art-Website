# 🦋 Little Butterfly — Fine Art Portfolio

> *Every painting is a small world. This is where they live.*

A handcrafted portfolio website for an original fine art business — built with love, purple gradients, and a lot of ✨. Visitors can wander through the gallery, fall in love with a painting, and reach out about commissions. Behind the scenes, a secret admin panel (hidden in plain sight) lets the artist manage everything without touching a database.

---

## 🎨 What’s Inside

| Route | What you’ll find |
|---|---|
| `/` | A warm, inviting home page |
| `/about` | The artist’s story and process |
| `/work` | The full gallery — every painting on display |
| `/contact` | A commission & enquiry form |

---

## ✨ Features

- **Gallery** — filterable by All / Available / Sold, with smooth card animations
- **Artwork modal** — click any painting to see full details: price, medium, dimensions, year, tags
- **Contact form** — enquiries are saved straight to the database, nothing gets lost
- **Secret admin panel** — hidden behind the 🦋 in the navbar, locked with a password
  - 🆕 Add new artworks with image upload
  - ✏️  Edit any existing artwork
  - 🗑️  Delete artworks
  - 📬 Read all contact form messages in a pretty inbox

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | [Neon](https://neon.tech/) (PostgreSQL) |
| ORM | [Prisma](https://www.prisma.io/) — writes SQL so you don’t have to |

---

## 🌱 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/little-butterfly.git
cd little-butterfly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Create a `.env` file in the root of the project:

```env
# Your Neon PostgreSQL connection string
DATABASE_URL='postgresql://...'

# Your secret admin password — only you know this!
ADMIN_PASSWORD=your-secret-password
```

> ⚠️  Never commit `.env` to GitHub. It’s already in `.gitignore` — keep it that way!

### 4. Push the database schema

```bash
npx prisma db push
```

### 5. Run it!

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and see it come to life 🦋

---

## 🔑 Secret Admin Access

The admin panel is totally invisible to visitors — only you know how to get in.

1. Go to any page on your site
2. Click the **🦋 butterfly emoji** in the top-left corner of the navbar
3. Type your admin password (the one you set in `.env`)
4. The **+ Add Artwork** button appears and the panel unlocks ✨
5. When you’re done, click **🔒 Exit Admin** in the navbar to lock it again

The session clears automatically when you close the tab, so no one can sneak in after you.

---

## 🗃️ Database Models

### `Artwork` 🖼️
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

### `Message` 📬
| Field | Type | Notes |
|---|---|---|
| id | Int | Auto-increment primary key |
| name | String? | Sender name (optional) |
| email | String? | Sender email (optional) |
| message | String | Required |
| createdAt | DateTime | Auto-set on creation |

---

## 🧩 API Routes

| Method | Route | What it does |
|---|---|---|
| GET | `/api/artworks` | Fetch all artworks |
| POST | `/api/artworks` | Create a new artwork |
| GET | `/api/artworks/[id]` | Fetch one artwork by ID |
| PUT | `/api/artworks/[id]` | Update an artwork |
| DELETE | `/api/artworks/[id]` | Delete an artwork |
| GET | `/api/contact` | Fetch all messages |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/auth` | Verify admin password (server-side only — safe!) |
| POST | `/api/upload` | Upload an artwork image |

---

## 💻 Useful Scripts

```bash
npm run dev        # Start the development server
npm run build      # Build for production
npm run start      # Run the production build
npm run lint       # Check for code issues
npx prisma studio  # Open a visual database browser at localhost:5555
npx prisma db push # Push any schema changes to your database
```

---

*Made with 💘 and a lot of purple — Little Butterfly Fine Art 🦋✨*
