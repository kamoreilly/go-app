package router

import (
	"app/src/controller"
	"app/src/middleware"

	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {
	// Health check (no auth required)
	app.Get("/health", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	// API v1 routes
	v1 := app.Group("/v1")

	// Auth routes (no auth required)
	auth := v1.Group("/auth")
	auth.Post("/register", controller.Register)
	auth.Post("/login", controller.Login)

	// Protected routes (require JWT)
	protected := v1.Group("", middleware.JWTAuth())

	// Facilities
	protected.Get("/facilities", controller.ListFacilities)
	protected.Post("/facilities", controller.CreateFacility)
	protected.Get("/facilities/:id", controller.GetFacility)
	protected.Put("/facilities/:id", controller.UpdateFacility)
	protected.Delete("/facilities/:id", controller.DeleteFacility)

	// Licenses (facility-scoped)
	protected.Get("/facilities/:id/licenses", controller.ListLicenses)
	protected.Post("/facilities/:id/licenses", controller.CreateLicense)
	protected.Put("/licenses/:id", controller.UpdateLicense)

	// Zones (facility-scoped)
	protected.Get("/facilities/:id/zones", controller.ListZones)
	protected.Post("/facilities/:id/zones", controller.CreateZone)
	protected.Put("/zones/:id", controller.UpdateZone)
	protected.Delete("/zones/:id", controller.DeleteZone)

	// Strains (facility-scoped)
	protected.Get("/facilities/:id/strains", controller.ListStrains)
	protected.Post("/facilities/:id/strains", controller.CreateStrain)
	protected.Put("/strains/:id", controller.UpdateStrain)
	protected.Delete("/strains/:id", controller.DeleteStrain)

	// Mother plants (facility-scoped)
	protected.Get("/facilities/:id/mothers", controller.ListMothers)
	protected.Post("/facilities/:id/mothers", controller.CreateMother)
	protected.Get("/mothers/:id", controller.GetMother)
	protected.Put("/mothers/:id", controller.UpdateMother)
	protected.Post("/mothers/:id/clone", controller.CloneMother)

	// Plants (facility-scoped)
	protected.Get("/facilities/:id/plants", controller.ListPlants)
	protected.Post("/facilities/:id/plants", controller.CreatePlant)
	protected.Get("/plants/:id", controller.GetPlant)
	protected.Put("/plants/:id", controller.UpdatePlant)
	protected.Post("/plants/:id/transition", controller.TransitionPlant)
	protected.Post("/plants/:id/destroy", controller.DestroyPlant)
	protected.Post("/plants/bulk-move", controller.BulkMovePlants)

	// Harvest batches (facility-scoped)
	protected.Get("/facilities/:id/batches", controller.ListBatches)
	protected.Post("/facilities/:id/batches", controller.CreateBatch)
	protected.Get("/batches/:id", controller.GetBatch)
	protected.Put("/batches/:id/mass-balance", controller.UpdateMassBalance)
	protected.Post("/batches/:id/transition", controller.TransitionBatch)
	protected.Get("/batches/:id/lineage", controller.GetBatchLineage)

	// Compliance alerts
	protected.Get("/alerts", controller.ListAlerts)
}
