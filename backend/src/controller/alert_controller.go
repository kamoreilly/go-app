package controller

import (
	"app/src/middleware"
	"app/src/service"

	"github.com/gofiber/fiber/v3"
)

var notificationSvc = service.NewNotificationService()

func ListAlerts(c fiber.Ctx) error {
	facilityID := middleware.GetFacilityID(c)
	if facilityID == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"error":   "facility context required",
		})
	}
	alerts, err := notificationSvc.GetComplianceAlerts(facilityID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"error":   err.Error(),
		})
	}
	return c.JSON(fiber.Map{"success": true, "data": alerts})
}
