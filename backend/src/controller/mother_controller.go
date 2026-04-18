package controller
import (
	"app/src/service"
	"app/src/model"
	"app/src/response"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/google/uuid"
)

var motherSvc = service.NewMotherService()

func ListMothers(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	mothers, err := motherSvc.ListByFacility(facilityID)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.OK(c, mothers)
}

func CreateMother(c fiber.Ctx) error {
	facilityID, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid facility id")
	}
	var input service.CreateMotherInput
	input.FacilityID = facilityID
	if err := c.Bind().Body(&input); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	m, err := motherSvc.Create(input)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, m)
}

func GetMother(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid mother id")
	}
	m, err := motherSvc.Get(id)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, m)
}

func UpdateMother(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid mother id")
	}
	var body struct {
		Name   string `json:"name"`
		Status string `json:"status"`
		Notes  string `json:"notes"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	m, err := motherSvc.Update(id, body.Name, model.MotherStatus(body.Status), body.Notes)
	if err != nil {
		return response.Error(c, utils.HTTPStatusFor(err), err.Error())
	}
	return response.OK(c, m)
}

func CloneMother(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid mother id")
	}
	var body struct {
		Count      int `json:"count"`
		FacilityID string `json:"facility_id"`
	}
	if err := c.Bind().Body(&body); err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid request body")
	}
	facilityID, _ := uuid.Parse(body.FacilityID)
	clones, err := motherSvc.Clone(id, body.Count, facilityID)
	if err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.Created(c, clones)
}

func DestroyMother(c fiber.Ctx) error {
	id, err := uuid.Parse(c.Params("id"))
	if err != nil {
		return response.Error(c, fiber.StatusBadRequest, "invalid mother id")
	}
	if err := motherSvc.Destroy(id); err != nil {
		return response.Error(c, fiber.StatusInternalServerError, err.Error())
	}
	return response.NoContent(c)
}
