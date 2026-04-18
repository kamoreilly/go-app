package database

import (
	"fmt"
	"time"

	"app/src/config"
	"app/src/model"
	"app/src/utils"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Connect establishes a connection to PostgreSQL using GORM.
func Connect(cfg *config.Config) error {
	var err error

	gormConfig := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	}

	if config.App != nil && config.App.Env == "test" {
		gormConfig.Logger = logger.Default.LogMode(logger.Silent)
	}

	DB, err = gorm.Open(postgres.Open(cfg.DSN()), gormConfig)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := DB.DB()
	if err != nil {
		return fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}

	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	utils.Log.WithField("db", cfg.DBName).Info("connected to database")
	return nil
}

// Health returns database health status.
func Health() map[string]string {
	stats := make(map[string]string)
	if DB == nil {
		stats["status"] = "down"
		stats["error"] = "db not initialized"
		return stats
	}
	sqlDB, err := DB.DB()
	if err != nil {
		stats["status"] = "down"
		stats["error"] = err.Error()
		return stats
	}
	if err := sqlDB.Ping(); err != nil {
		stats["status"] = "down"
		stats["error"] = err.Error()
		return stats
	}
	stats["status"] = "up"
	dbStats := sqlDB.Stats()
	stats["open_connections"] = fmt.Sprintf("%d", dbStats.OpenConnections)
	return stats
}

// Migrate runs AutoMigrate for all Phase 1 models.
func Migrate() error {
	return DB.AutoMigrate(
		&model.User{},
		&model.Facility{},
		&model.FacilityMembership{},
		&model.License{},
		&model.Zone{},
		&model.Strain{},
		&model.Plant{},
		&model.Mother{},
		&model.Batch{},
		&model.BatchPlant{},
		&model.MassBalance{},
	)
}

// Close closes the database connection.
func Close() error {
	if DB == nil {
		return nil
	}
	sqlDB, err := DB.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
