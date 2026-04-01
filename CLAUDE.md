# CLAUDE.md

Full-stack monorepo for CannaTrack - a cultivator management platform with Go backend and React/TypeScript frontend.

## Quick Start

```bash
make install    # Install all dependencies
make dev        # Run both frontend and backend
```

Backend: http://localhost:8080 | Frontend: http://localhost:3001

## Development Commands

### Root Level
```bash
make dev              # Run both frontend and backend concurrently
make build            # Build both
make test             # Run backend tests
make install          # Install all dependencies
make backend-run      # Run backend only
make frontend-run     # Run frontend only
make backend-watch    # Backend with live reload (uses air)
```

### Backend (`/backend`)
```bash
make run              # Run server (port 8080)
make build            # Compile to ./main
make test             # Run go test ./... -v
make watch            # Live reload with air
```

Run single test: `go test ./internal/server -run TestHandler -v`

### Frontend (`/frontend`)
```bash
bun run dev           # Start all apps in dev mode
bun run dev:web       # Start web app only (port 3001)
bun run build         # Build all apps
bun run check-types   # TypeScript type checking
```

## Architecture

### Backend (Go)
- **Entry**: `backend/cmd/api/main.go` - server init and graceful shutdown
- **Server**: `backend/internal/server/server.go` - HTTP config with timeouts
- **Routes**: `backend/internal/server/routes.go` - route registration + CORS
- **Database**: `backend/internal/database/` - SQLite with connection pooling

Uses standard library `net/http` with serveMux. No framework.

### Database (sqlc)
- **Schema**: `backend/internal/database/migrations/`
- **Queries**: `backend/internal/database/queries/`
- **Generated code**: `backend/internal/database/db/`

After modifying SQL queries or schema:
```bash
cd backend && sqlc generate
```

### Frontend (Turborepo + Bun)
```
frontend/
├── apps/web/           # Main React app (TanStack Start + Vite)
├── packages/config/    # Shared TypeScript config
├── packages/env/       # Environment config with @t3-oss/env-core
```

**Stack**: React 19, TanStack Router/Start, TanStack Query, TailwindCSS v4, shadcn/ui

**Routing**: File-based routing in `frontend/apps/web/src/routes/`. Route tree auto-generated in `routeTree.gen.ts`.

**UI Components**: shadcn/ui components in `frontend/apps/web/src/components/ui/`

## Environment Variables

Backend (`.env` in `/backend`):
- `PORT` - Server port (default: 8080)
- `BLUEPRINT_DB_URL` - SQLite database path

Frontend (`frontend/apps/web/.env`):
- `VITE_SERVER_URL` - Backend API URL

## Ports
- Backend: 8080
- Frontend: 3001

## Code Conventions

- Backend uses sqlc for type-safe SQL - don't manually edit `db/` generated files
- Frontend uses file-based routing - add routes as files in `routes/` directory
- Package manager: Bun for frontend, Go modules for backend
