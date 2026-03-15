# Root Makefile for go-app
# Coordinates frontend and backend development

# Default target - runs both frontend and backend
.PHONY: all
all: dev

# Run both frontend and backend concurrently
.PHONY: dev
dev:
	@echo "Starting development environment..."
	@echo "Backend: http://localhost:8080"
	@echo "Frontend: http://localhost:3001"
	@make --jobs backend-run frontend-run

# Run backend only
.PHONY: backend-run
backend-run:
	@echo "Starting backend server..."
	cd backend && make run

# Run frontend only
.PHONY: frontend-run
frontend-run:
	@echo "Starting frontend server..."
	cd frontend && bun run dev:web

# Run backend with live reload
.PHONY: backend-watch
backend-watch:
	@echo "Starting backend with live reload..."
	cd backend && make watch

# Build both frontend and backend
.PHONY: build
build: backend-build frontend-build

# Build backend
.PHONY: backend-build
backend-build:
	@echo "Building backend..."
	cd backend && make build

# Build frontend
.PHONY: frontend-build
frontend-build:
	@echo "Building frontend..."
	cd frontend && bun run build

# Test backend
.PHONY: test
test:
	cd backend && make test

# Clean all build artifacts
.PHONY: clean
clean:
	@echo "Cleaning all build artifacts..."
	cd backend && make clean
	cd frontend && rm -rf apps/web/dist apps/web/.output

# Install all dependencies
.PHONY: install
install: install-backend install-frontend

# Install backend dependencies
.PHONY: install-backend
install-backend:
	@echo "Installing backend dependencies..."
	cd backend && go mod download

# Install frontend dependencies
.PHONY: install-frontend
install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && bun install

# Show help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make dev             - Run both frontend and backend (default)"
	@echo "  make backend-run     - Run backend only"
	@echo "  make frontend-run    - Run frontend only"
	@echo "  make backend-watch   - Run backend with live reload"
	@echo "  make build           - Build both frontend and backend"
	@echo "  make test            - Run backend tests"
	@echo "  make clean           - Clean build artifacts"
	@echo "  make install         - Install all dependencies"
	@echo "  make help            - Show this help message"
