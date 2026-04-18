package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"app/src/config"
	"app/src/database"
	"app/src/router"
	"app/src/utils"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/recover"
)

func main() {
	cfg, err := config.Load(".env")
	if err != nil {
		log.Fatalf("config load failed: %v", err)
	}

	if err := database.Connect(cfg); err != nil {
		utils.Log.WithError(err).Fatal("database connection failed")
	}
	defer database.Close()

	if err := database.Migrate(); err != nil {
		utils.Log.WithError(err).Fatal("database migration failed")
	}
	utils.Log.Info("database migrations applied")

	app := fiber.New(fiber.Config{
		AppName:      "Cultivator API",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  60 * time.Second,
		ErrorHandler: customErrorHandler,
	})

	app.Use(recover.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders: []string{"Accept", "Authorization", "Content-Type", "X-Facility-ID"},
	}))

	router.Setup(app)

	go func() {
		if err := app.Listen(fmt.Sprintf("%s:%d", cfg.AppHost, cfg.AppPort)); err != nil {
			utils.Log.WithError(err).Fatal("server listen failed")
		}
	}()

	utils.Log.Infof("server running on :%d", cfg.AppPort)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	utils.Log.Info("shutting down server...")
	if err := app.ShutdownWithTimeout(10 * time.Second); err != nil {
		utils.Log.WithError(err).Error("server shutdown error")
	}
	utils.Log.Info("server stopped")
}

func customErrorHandler(c fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError
	message := "Internal Server Error"

	if e, ok := err.(*fiber.Error); ok {
		code = e.Code
		message = e.Message
	}

	return c.Status(code).JSON(fiber.Map{
		"success": false,
		"error":   message,
	})
}
