# Minimal Issue Tracker

A small issue tracking app. Sign up, raise an issue, give it a status and a priority,
and see everything in one list. Nothing fancy, I built it to get hands-on with the
newer Next.js features instead of just reading about them.

![Landing page of the Minimal Issue Tracker](./minimal-issue-app.png)

> Work in progress. Landing page, dashboard, database layer and auth are in place.
> The signup/signin screens and issue CRUD are next.

## What I used

**Routing & layouts** — App Router, route groups (`app/(marketing)/` keeps the landing page
at `/`), nested layouts, `next/font` with Inter, Tailwind CSS v4 with a dark theme.

**Server Components** — pages fetch data on the server with plain `async`/`await`.
`"use client"` only where it's actually needed. `<Suspense>` around the dashboard with a
skeleton fallback, plus a `mockDelay()` helper so loading states are visible locally.

**Server Actions** — form handling with `"use server"`, Zod validation on the server, and a
typed `ActionResponse` carrying field-level errors back to the form.

**Auth** — email/password with bcrypt, JWT sessions signed using `jose` and stored in an
httpOnly cookie, with refresh-on-expiry logic.

**Data layer** — all reads go through a DAL (`lib/dal.ts`) instead of being scattered across
components, with React `cache()` on the session lookup. Drizzle ORM over PostgreSQL:
schema, enums, relations, inferred types. Neon driver on Vercel, node-postgres locally.

Still to do: full CRUD for issues, caching with `dynamicIO`, route handlers, middleware, and tests.

## Stack

Next.js 16, React 19, TypeScript, Tailwind v4, Drizzle ORM, PostgreSQL (Neon), Zod, jose, bcrypt.

## Running locally

Needs Node and a PostgreSQL database (Neon's free tier works fine).

```bash
npm install
```

Create a `.env`:

```bash
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=any-random-string-at-least-32-characters-long
```

Then:

```bash
npm run db:push   # push the schema
npm run dev       # http://localhost:3000
npm run db:studio # browse the data
```

## Layout

```
app/(marketing)   landing page
app/dashboard     issue list
app/actions       server actions
components/ui     buttons, badges, forms, navigation
db                drizzle schema and client
lib               auth, data access layer, utils
```
