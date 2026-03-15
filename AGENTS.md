## Project Overview

Full-stack monorepo with a Go backend and a React/TypeScript frontend. The frontend is a Turborepo workspace managed with Bun.

## Development Commands

### Root Level (from `/`)

```bash
make dev              # Run both frontend and backend concurrently
make build            # Build both frontend and backend
make test             # Run backend tests
make install          # Install all dependencies
make backend-run      # Run backend only
make frontend-run     # Run frontend only
make backend-watch    # Run backend with live reload (uses air)
```

### Backend (from `/backend`)

```bash
make run              # Run the server (port 8080)
make build            # Compile to ./main binary
make test             # Run go test ./... -v
make watch            # Live reload with air
```

To run a single test: `go test ./internal/server -run TestHandler -v`

### Frontend (from `/frontend`)

```bash
bun run dev           # Start all apps in dev mode
bun run dev:web       # Start web app only (port 3001)
bun run build         # Build all apps
bun run check-types   # TypeScript type checking
```

## Architecture

### Backend (Go)

- **Entry point**: `backend/cmd/api/main.go` - server initialization and graceful shutdown
- **Server**: `backend/internal/server/server.go` - HTTP server config with timeouts
- **Routes**: `backend/internal/server/routes.go` - route registration with CORS middleware
- **Database**: `backend/internal/database/database.go` - SQLite connection pool singleton

The backend uses standard library `net/http` with a simple serveMux. Environment variables loaded via godotenv. Database is SQLite with connection pooling and health metrics.

### Frontend (Turborepo)

```
frontend/
├── apps/web/           # Main React app (TanStack Start + Vite)
├── packages/config/    # Shared TypeScript config
├── packages/env/       # Environment configuration with @t3-oss/env-core
```

**Tech stack**: React 19, TanStack Router/Start, TanStack Query, TailwindCSS v4, shadcn/ui, Lucide icons

**Routing**: File-based routing in `frontend/apps/web/src/routes/`. Route tree is auto-generated in `routeTree.gen.ts`.

**UI Components**: shadcn/ui components in `frontend/apps/web/src/components/ui/`

## Environment Variables

Backend (`.env`):
- `PORT` - Server port (default: 8080)
- `BLUEPRINT_DB_URL` - SQLite database path

Frontend (`frontend/apps/web/.env`):
- `VITE_SERVER_URL` - Backend API URL

## Ports

- Backend: 8080
- Frontend: 3001
