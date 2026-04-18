package controller

import (
	"app/src/service"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var plantSvc = service.NewPlantService()

func ListPlants(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	plants, err := plantSvc.ListByFacility(facilityID, c.Query("stage"), c.Query("zone_id"))
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, plants)
}

func CreatePlant(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.CreatePlantInput
	input.FacilityID = facilityID
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	p, err := plantSvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, p)
}

func GetPlant(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid plant id")
	}
	p, err := plantSvc.Get(id)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, p)
}

func UpdatePlant(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid plant id")
	}
	var input service.UpdatePlantInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	p, err := plantSvc.Update(id, input)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, p)
}

func TransitionPlant(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid plant id")
	}
	var input service.TransitionInput
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	p, err := plantSvc.Transition(id, input)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, p)
}

func DestroyPlant(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid plant id")
	}
	if err := plantSvc.Destroy(id); err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.NoContent(c)
}

func BulkMovePlants(c fiber.Ctx) error {
	var body struct {
		PlantIDs []string `json:"plant_ids"`
		ZoneID   string   `json:"zone_id"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	zoneID, err := uuid.Parse(body.ZoneID)
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid zone id")
	}
	var plantIDs []uuid.UUID
	for _, pid := range body.PlantIDs {
		if parsed, err := uuid.Parse(pid); err == nil {
			plantIDs = append(plantIDs, parsed)
		}
	}
	if err := plantSvc.BulkMove(plantIDs, zoneID); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, map[string]int{"moved": len(plantIDs)})
}
