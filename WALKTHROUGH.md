# Project Walkthrough - GDG Hackathon 2026

## Phase 1: Infrastructure & Environment Setup
- Initialized Next.js project with Tailwind CSS and Shadcn UI.
- Integrated Supabase for Authentication and Database.
- Configured environment variables for local development (`.env.local`).
- Updated `.env.example` for deployment consistency.

## Phase 2: Deployment Configuration (Coolify)
- Created and optimized `Dockerfile` for Next.js standalone build.
- Fixed build issue by passing `NEXT_PUBLIC_` variables as `ARG` and `ENV` in Docker.
- Switched from `npm ci` to `npm install` in `Dockerfile` to handle lockfile synchronization issues quickly during the hackathon.

## Phase 3: Supabase Integration
- Created supabase server client in `lib/supabase/server.ts`.
- Implemented basic layout and page structure.
