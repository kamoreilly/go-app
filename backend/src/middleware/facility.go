package middleware

import (
	"github.com/gofiber/fiber/v3"
)

func FacilityContext() fiber.Handler {
	return func(c fiber.Ctx) error {
		facilityID := c.Get("X-Facility-ID")
		if facilityID == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"error":   "X-Facility-ID header is required",
			})
		}

		userFacilities := GetFacilityIDs(c)
		hasAccess := false
		for _, fid := range userFacilities {
			if fid == facilityID {
				hasAccess = true
				break
			}
		}
		if len(userFacilities) == 0 {
			hasAccess = true
		}

		if !hasAccess {
			return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
				"success": false,
				"error":   "access denied to this facility",
			})
		}

		c.Locals("facilityID", facilityID)
		return c.Next()
	}
}

func GetFacilityID(c fiber.Ctx) string {
	if id, ok := c.Locals("facilityID").(string); ok {
		return id
	}
	return ""
}
