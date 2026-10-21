# Reclaim

A marketplace app. The repo has two separate projects:

- **`client/`**: the website (React, TypeScript, Tailwind CSS, React Router)
- **`server/`**: the backend API (Node.js, Express, TypeScript). Not built yet.

## Getting started

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
git clone https://github.com/masonE17/reclaim.git
cd reclaim/client
npm install
npm run dev
```

Then open the link it prints (usually http://localhost:5173).

The server has no code yet, so there's nothing to run there. Once it does, you'll run `npm install` and its start command from inside `server/`.

## Moving around in the terminal

Commands only affect the folder you're in, so check where you are before running anything. Your terminal prompt shows the current folder (e.g. `mason@MacBook client %`).

| Command | What it does |
|---|---|
| `cd client` | Goes into the `client` folder |
| `cd server` | Goes into the `server` folder |
| `cd ..` | Goes up one folder (e.g. from `client` back to `reclaim`) |
| `cd ../server` | Goes up one folder, then into `server` (switches from `client` to `server`) |

Where to run things:

- **`npm` commands** (`npm install`, `npm run dev`, etc.): run inside `client/` or `server/`, whichever you're working on. Each has its own `package.json` and `node_modules`.
- **`git` commands**: run from the repo root (`reclaim/`). `git add .` only stages changes in the current folder and the folders inside it. If you run it from inside `client/` or `server/`, changes elsewhere (like this README) get left out.

## Client commands

Run these from inside `client/`:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the site locally and reloads when you save |
| `npm run build` | Checks types and builds the site for production |
| `npm run lint` | Checks the code for common mistakes |

## What's where

### `client/`

| Path | What goes there |
|---|---|
| `public/` | Static files served as-is (favicon, logo) |
| `src/main.tsx` | App entry point. All routes are defined here |
| `src/App.tsx` | Homepage (`/`) |
| `src/pages/` | One file per page (see routes below) |
| `src/components/` | Reusable pieces like `Header` and `Footer` |
| `src/hooks/` | Custom React hooks (e.g. `useListings`) |
| `src/lib/` | `api.ts` for calls to our server, `supabase.ts` for the Supabase client |
| `src/index.css` | Loads Tailwind |

### Routes

| URL | Page |
|---|---|
| `/` | Homepage (`App.tsx`) |
| `/browse` | Marketplace (`BrowsePage`) |
| `/listing/:id` | Listing details (`ListingPage`) |
| `/sell` | Create listing (`SellPage`) |
| `/messages` | Messages (`MessagesPage`) |
| `/cart` | Cart (`CartPage`) |
| `/profile` | Account (`ProfilePage`) |

To add a page, create it in `src/pages/` and add a route for it in `src/main.tsx`.

### `server/`

| Path | What goes there |
|---|---|
| `src/routes/` | URL paths only (e.g. `listings.ts` for `/api/listings`) |
| `src/controllers/` | The logic each route runs |
| `src/middleware/` | Code that runs before routes, like `auth.ts` to check the user is logged in |
| `src/lib/` | `supabase.ts` (creates the Supabase client) |
| `src/index.ts` | Starts Express and plugs in the routes |
| `.env.example` | List of the environment variables the server needs |

## Environment variables

Secret keys go in `.env` files, which are **never committed**. To set yours up, copy `server/.env.example` to `server/.env` and fill in the real values. Ask the team for the keys.

## Workflow

Don't commit to `main` directly. Create a branch for your work, push it, and open a pull request.
