package controller

import (
	"app/src/middleware"
	"app/src/service"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var facilitySvc = service.NewFacilityService()

func ListFacilities(c fiber.Ctx) error {
	userID := middleware.GetUserID(c)
	if userID == "" {
		return response.Error(c, fiber.StatusUnauthorized, "unauthorized")
	}
	uid, err := uuid.Parse(userID)
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid user id")
	}
	facilities, err := facilitySvc.List(uid)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, facilities)
}

func CreateFacility(c fiber.Ctx) error {
	var input service.CreateFacilityInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	f, err := facilitySvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	userID := middleware.GetUserID(c)
	if uid, err := uuid.Parse(userID); err == nil {
		facilitySvc.AddMembership(f.ID, uid, "owner")
	}
	return response.Created(c, f)
}

func GetFacility(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	f, err := facilitySvc.Get(id)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, f)
}

func UpdateFacility(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.UpdateFacilityInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	f, err := facilitySvc.Update(id, input)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, f)
}

func DeleteFacility(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	if err := facilitySvc.Delete(id); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.NoContent(c)
}
