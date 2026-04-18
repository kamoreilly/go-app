package controller

import (
	"app/src/service"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var licenseSvc = service.NewLicenseService()

func ListLicenses(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	licenses, err := licenseSvc.ListByFacility(facilityID)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, licenses)
}

func CreateLicense(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.CreateLicenseInput
	input.FacilityID = facilityID
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	l, err := licenseSvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, l)
}

func UpdateLicense(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid license id")
	}
	var body struct {
		Status string `json:"status"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	l, err := licenseSvc.Update(id, body.Status)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, l)
}
