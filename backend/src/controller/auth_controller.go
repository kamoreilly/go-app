package controller

import (
	"app/src/service"
	"app/src/response"

	"github.com/gofiber/fiber/v3"
)

var authSvc = service.NewAuthService()

func Register(c fiber.Ctx) error {
	var input service.RegisterInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	if input.Email == "" || input.Password == "" {
		return response.Error(c, fiber.StatusBadRequest, "email and password are required")
	}
	result, err := authSvc.Register(input)
	if err != nil {
		return response.Error(c, fiber.StatusUnauthorized, err.Error())
	}
	return response.Created(c, result)
}

func Login(c fiber.Ctx) error {
	var input service.LoginInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	result, err := authSvc.Login(input)
	if err != nil {
		return response.Error(c, fiber.StatusUnauthorized, err.Error())
	}
	return response.OK(c, result)
}
