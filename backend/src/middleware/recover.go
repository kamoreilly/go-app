package middleware

import (
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
)

func Recover() fiber.Handler {
	return func(c fiber.Ctx) error {
		defer func() {
			if r := recover(); r != nil {
				utils.Log.WithField("panic", r).Error("request panic recovered")
				_ = c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
					"success": false,
					"error":   "internal server error",
				})
			}
		}()
		return c.Next()
	}
}
