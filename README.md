# Minimal Issue Tracker

A small issue tracking app I'm building while working through the
[Next.js Fundamentals v4](https://master.dev/courses/next-js-v4/) course. The idea is simple:
sign up, raise an issue, give it a status and a priority, and see everything in one list.
Nothing fancy, the point was to actually use the Next.js features instead of just reading about them.

![Landing page of the Minimal Issue Tracker](./minimal-issue-app.png)

> Still a work in progress. The landing page, dashboard, database layer and auth are in place.
> The signup/signin screens and the issue CRUD screens are next on my list.

## Topics I covered

These are the course topics I've actually touched in this project so far.

### Setup, routing and styling

- App Router with the `app/` directory
- Route groups, so `app/(marketing)/` holds the public landing page without adding `/marketing` to the URL
- Nested layouts: a root layout for fonts and metadata, a separate dashboard layout with its own sidebar
- `next/font` with Inter, loaded as a CSS variable
- Tailwind CSS v4 for all the styling, with a dark theme
- A small set of reusable UI pieces (`Button`, `Badge`, `Form`, `NavLink`, `Navigation`)

### Server Components and streaming

- Pages are server components by default, so data fetching happens on the server with plain `async`/`await`
- `"use client"` only where it's genuinely needed (the footer year, nav link highlighting, sign out button)
- `<Suspense>` around the dashboard content with a `DashboardSkeleton` fallback
- `mockDelay()` in `lib/utils.ts` to slow things down on purpose, otherwise loading states are too fast to see locally

### Server Actions

- Form handling with `"use server"` actions in `app/actions/`
- Zod schemas for validating input on the server, with field level errors sent back to the form
- Actions return a typed `ActionResponse` so the UI knows what to show
- `redirect()` after sign out

### Authentication

- Email and password signup, hashed with bcrypt
- JWT sessions signed with `jose`, stored in an httpOnly cookie
- Token refresh threshold logic, so a session close to expiry can be renewed
- `cookies()` from `next/headers` to read and clear the session

### Data Access Layer

- All database reads go through `lib/dal.ts` instead of being scattered across components
- React `cache()` around `getSession()` so it isn't recomputed on every call within a request
- Drizzle ORM with PostgreSQL: schema, enums, relations, and inferred types
- Neon serverless driver on Vercel, node-postgres locally, picked at runtime in `db/index.ts`

## Still to come

The course covers a few more things I haven't reached yet:

- Full CRUD for issues (create, edit, delete) with server actions
- Caching strategies and `dynamicIO`
- Route handlers for a small developer API
- Middleware and edge runtime for protecting routes
- Vitest tests and deploying to Vercel

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, PostgreSQL (Neon), Zod, jose, bcrypt, lucide-react.

## Running it locally

You'll need Node and a PostgreSQL database. Neon works well and has a free tier.

```bash
npm install
```

Create a `.env` file:

```bash
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=any-random-string-at-least-32-characters-long
```

Push the schema and start the dev server:

```bash
npm run db:push
npm run dev
```

Open http://localhost:3000.

Other scripts that come in handy:

```bash
npm run db:studio   # browse the database in Drizzle Studio
npm run lint
npm run build
```

## Project layout

```
app/
  (marketing)/      landing page, public
  dashboard/        issue list, behind the sidebar layout
  actions/          server actions for auth and issues
components/
  ui/               buttons, badges, forms, navigation
db/
  schema.ts         drizzle tables, enums, relations
  index.ts          database client
lib/
  auth.ts           password hashing, JWT, sessions
  dal.ts            data access layer
  utils.ts          cn(), date formatting, mockDelay
```
