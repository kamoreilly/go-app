package controller

import (
	"app/src/service"
	"app/src/model"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var zoneSvc = service.NewZoneService()

func ListZones(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	zones, err := zoneSvc.ListByFacility(facilityID)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, zones)
}

func CreateZone(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.CreateZoneInput
	input.FacilityID = facilityID
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	z, err := zoneSvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, z)
}

func UpdateZone(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid zone id")
	}
	var body struct {
		Name       string          `json:"name"`
		ZoneType   model.ZoneType  `json:"zone_type"`
		CanopySqFt int             `json:"canopy_sqft"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	z, err := zoneSvc.Update(id, body.Name, body.ZoneType, body.CanopySqFt)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, z)
}

func DeleteZone(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid zone id")
	}
	if err := zoneSvc.Delete(id); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.NoContent(c)
}
