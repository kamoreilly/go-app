package controller

import (
	"app/src/service"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var strainSvc = service.NewStrainService()

func ListStrains(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	strains, err := strainSvc.ListByFacility(facilityID)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, strains)
}

func CreateStrain(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.CreateStrainInput
	input.FacilityID = facilityID
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	s, err := strainSvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, s)
}

func UpdateStrain(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid strain id")
	}
	var body struct {
		Name              string   `json:"name"`
		Genetics          string   `json:"genetics"`
		THCPpercent       *float64 `json:"thc_percent"`
		CBDPercent        *float64 `json:"cbd_percent"`
		FloweringTimeDays *int     `json:"flowering_time_days"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	s, err := strainSvc.Update(id, body.Name, body.Genetics, body.THCPpercent, body.CBDPercent, body.FloweringTimeDays)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, s)
}

func DeleteStrain(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid strain id")
	}
	if err := strainSvc.Delete(id); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.NoContent(c)
}
