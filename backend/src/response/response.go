package response

import "github.com/gofiber/fiber/v3"

type Response[T any] struct {
	Success bool   `json:"success"`
	Data    T      `json:"data,omitempty"`
	Error   string `json:"error,omitempty"`
	Meta    *Meta  `json:"meta,omitempty"`
}

type Meta struct {
	Page       int   `json:"page,omitempty"`
	PerPage    int   `json:"per_page,omitempty"`
	Total      int64 `json:"total,omitempty"`
	TotalPages int   `json:"total_pages,omitempty"`
}

func OK[T any](c fiber.Ctx, data T) error {
	return c.JSON(Response[T]{Success: true, Data: data})
}

func Created[T any](c fiber.Ctx, data T) error {
	return c.Status(fiber.StatusCreated).JSON(Response[T]{Success: true, Data: data})
}

func NoContent(c fiber.Ctx) error {
	return c.Status(fiber.StatusNoContent).Send(nil)
}

func Error(c fiber.Ctx, status int, message string) error {
	return c.Status(status).JSON(Response[any]{Success: false, Error: message})
}

func Paginated[T any](c fiber.Ctx, data []T, meta *Meta) error {
	return c.JSON(Response[[]T]{Success: true, Data: data, Meta: meta})
}
