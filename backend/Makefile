.PHONY: build run test lint clean dev tidy db-create help

BINARY_NAME=cultivator
MAIN_PATH=./cmd/api

build:
	go build -o $(BINARY_NAME) $(MAIN_PATH)

run: build
	./$(BINARY_NAME)

dev:
	air -c .air.toml

test:
	go test -v ./...

test-cover:
	go test -v -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

lint:
	golangci-lint run ./...

clean:
	rm -f $(BINARY_NAME) coverage.out coverage.html tmp/cultivator

tidy:
	go mod tidy

db-create:
	createdb cultivator || true
	createdb cultivator_test || true

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
