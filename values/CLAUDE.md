# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` (runs Next.js in turbo mode)
- **Build**: `npm run build`
- **Type checking**: `npm run typecheck` or `tsc --noEmit`
- **Linting**: `npm run lint` (check) or `npm run lint:fix` (fix)
- **Code quality check**: `npm run check` (combines lint and typecheck)
- **Formatting**: `npm run format:check` or `npm run format:write`
- **Preview production build**: `npm run preview`

## Database Commands

- **Generate migrations**: `npm run db:generate`
- **Run migrations**: `npm run db:migrate`
- **Push schema changes**: `npm run db:push`
- **Open Drizzle Studio**: `npm run db:studio`

## Architecture Overview

This is a T3 Stack application (Next.js + tRPC + Drizzle + NextAuth) implementing a values comparison game.

### Core Application Structure

The app is a values ranking system where users:
1. Compare pairs of personal values (e.g., "Creativity" vs "Wealth")
2. Make 10 timed comparisons (15 seconds each)
3. Receive a ranked list of their top values

### Key Components

- **ValuesComparison**: Main comparison interface with timer
- **ValueCard**: Individual value display with selection
- **ValuesResults**: Final ranking display
- **Timer**: 15-second countdown component

### Data Flow

1. Values are loaded from `src/data/values.ts` (39 predefined values)
2. Random pairs are generated via `src/utils/comparison.ts`
3. User selections are tracked and scored using a ranking algorithm
4. Results are displayed as a sorted list with calculated scores

### Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4
- **Backend**: tRPC for API layer, NextAuth for authentication
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: NextAuth with Discord provider configured
- **Environment**: TypeScript, ESLint, Prettier

### File Structure

- `src/app/`: Next.js app router pages and API routes
- `src/components/`: React components for the values game
- `src/server/`: tRPC routers, auth config, database setup
- `src/data/`: Static data (values list)
- `src/utils/`: Utility functions (comparison logic)
- `src/trpc/`: tRPC client configuration

### Environment Setup

Copy `.env.example` to `.env` and configure:
- `AUTH_SECRET`: NextAuth secret
- `AUTH_DISCORD_ID` & `AUTH_DISCORD_SECRET`: Discord OAuth
- `DATABASE_URL`: PostgreSQL connection string