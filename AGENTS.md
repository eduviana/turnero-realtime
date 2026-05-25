# AGENTS.md

## Stack

Next.js 16 (App Router) · TypeScript strict · PostgreSQL (Docker) · Prisma 7 · Clerk · Pusher · TailwindCSS 4 + shadcn/ui · Zod 4

## Commands

```bash
npm run dev          # Next.js dev server
npm run build        # production build
npm run lint         # ESLint (flat config v9)
npx prisma generate  # regenerate client to ./generated/prisma/
npx prisma migrate dev   # apply migrations
npx tsx prisma/scripts/<file>.ts  # run a seed script
docker compose up -d # start PostgreSQL 16
```

No `typecheck` or `test` scripts exist.

## Architecture: Feature-first modular

```
features/<domain>/
  services/   # business logic, server-safe (no 'use client')
  components/ # UI components
  types/      # domain-specific types
  hooks/      # React hooks (client-side)
app/          # routing and composition ONLY — no business logic
lib/          # cross-cutting: db, roles, pusher, audit, utils
generated/    # Prisma client output (gitignored, must be generated)
```

Path alias `@/*` → project root (`./*`).

## Prisma 7 — required setup

Prisma 7 **requires** `@prisma/adapter-pg` with a `pg.Pool`. The client singleton in `lib/db/prisma.ts` exports both `prisma` and `db` (they are the same instance). Always import `db` → `import { db } from "@/lib/db/prisma"`.

Client output goes to `generated/prisma/` (configured in `prisma/schema.prisma` line 3). After cloning or pulling schema changes, run:

```bash
npx prisma generate
```

## Auth & authorization

- **Clerk** handles authentication. **Custom RBAC** (`lib/roles/`) handles authorization.
- Roles: `ADMIN` (3) > `SUPERVISOR` (2) > `OPERATOR` (1).

Three layers of protection:

| Layer | File | Scope |
|-------|------|-------|
| Edge middleware | `proxy.ts` | Route-prefix auth + dashboard redirect |
| Server endpoints | `lib/roles/requireRole.ts` | Per-route-handler RBAC check |
| UI permissions | `lib/roles/role-permissions.ts` | What each role can see/do |

### `proxy.ts` — the clerkMiddleware

- **Public routes** (bypass auth): `/`, `/sign-in`, `/ingreso-afiliado`, `/pantalla-turnos`, `/api/users/sync`, `/api/sessions`, `/api/affiliate/find-by-dni`, `/api/services`, `/api/tickets/create`, `/api/turn-screen`
- **Role-based prefix routing**: `/admin` → ADMIN, `/supervisor` → SUPERVISOR, `/operator` → OPERATOR
- **`/dashboard`** auto-redirects to role-specific dashboard page
- Unauthorized access is audited via `auditService.record()`

### Server-side auth pattern

```ts
const auth = await requireRole("OPERATOR");
if (!auth.ok) return auth.response;
// auth.userId, auth.role available
```

### Client-side auth

`features/auth/AuthContext.tsx` wraps private layouts. `useAuthContext()` + `usePermissions()` (in `hooks/`) provide role-aware UI.

## Realtime (Pusher)

Channel naming: `turn-queue-{serviceId}`  
Event: `"updated"`  
Server: `import { pusherServer } from "@/lib/pusher/server"`  
Client: `import { pusherClient } from "@/lib/pusher/client"`

Trigger on every ticket state change. The `TurnQueuePanel` subscribes to the channel via `useTurnQueue` hook.

## Ticket state machine

```
PENDING → CALLED → IN_PROGRESS → COMPLETED / CANCELLED / NO_SHOW
```

Two concurrency-critical operations:
- `callNextTicket.ts` — uses `FOR UPDATE SKIP LOCKED` raw SQL to atomically grab the next ticket
- `handleCurrentTicket.ts` — uses `updateMany` with `WHERE status = expectedStatus` as optimistic lock

## Database

- PostgreSQL 16 in Docker (`docker compose up -d`), container name `turnero-realtime`, DB name `turnero`
- Migrations: `prisma/migrations/`
- Seeds: `prisma/scripts/` — run individually with `npx tsx` (order matters for FK dependencies)

## Environment variables

Required in `.env` (see README for full list). Key ones: `DATABASE_URL`, Clerk keys, Pusher keys. `.env*` is gitignored.

## shadcn/ui

Style: `new-york`, RSC mode, `cn()` utility at `@/lib/utils`. Components at `@/components/ui/`.

## ESLint

Flat config v9 (`eslint.config.mjs`), using `eslint-config-next` core-web-vitals + typescript presets.

## No test infrastructure

There are no tests, no test runner configured, no CI workflows.

## Gotchas

- Never put business logic in `app/` — keep it in `features/`
- Enums import from `@/generated/prisma/enums`, NOT from `@/generated/prisma/client`
- The `db` and `prisma` exports from `lib/db/prisma.ts` are the SAME singleton — use `db` consistently
- Audit errors are silently caught — the audit service must never break the main flow
- `features/tickets/services/createTicket.ts` reads `affiliate_dni` from `sessionStorage` — this is intentional (set during login flow), not a bug
- TailwindCSS 4 config is in `app/globals.css` via `@import "tailwindcss"` — there is no `tailwind.config.ts`
- Prisma enums like `TicketStatus` are string-enum types in TypeScript; use them directly (e.g. `status: TicketStatus.PENDING`), not as plain strings
