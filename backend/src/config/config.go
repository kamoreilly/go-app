package config

import (
	"fmt"
	"strings"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

// Config holds all application configuration.
type Config struct {
	AppPort    int
	AppHost    string
	DBHost     string
	DBPort     int
	DBName     string
	DBUser     string
	DBPassword string
	DBSSLMode  string
	JWTSecret  string
	JWTExpHrs  int
	Env        string
}

var App *Config

// Load reads config from .env and environment variables.
func Load(envPath string) (*Config, error) {
	_ = godotenv.Load(envPath)

	viper.SetEnvPrefix("CULTIVATOR")
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()

	viper.SetDefault("app.port", 3000)
	viper.SetDefault("app.host", "0.0.0.0")
	viper.SetDefault("db.sslmode", "disable")
	viper.SetDefault("jwt.expiry_hours", 24)
	viper.SetDefault("env", "development")

	App = &Config{
		AppPort:    viper.GetInt("app.port"),
		AppHost:    viper.GetString("app.host"),
		DBHost:     viper.GetString("db.host"),
		DBPort:     viper.GetInt("db.port"),
		DBName:     viper.GetString("db.name"),
		DBUser:     viper.GetString("db.user"),
		DBPassword: viper.GetString("db.password"),
		DBSSLMode:  viper.GetString("db.sslmode"),
		JWTSecret:  viper.GetString("jwt.secret"),
		JWTExpHrs:  viper.GetInt("jwt.expiry_hours"),
		Env:        viper.GetString("env"),
	}

	if App.DBHost == "" {
		App.DBHost = "localhost"
	}
	if App.DBPort == 0 {
		App.DBPort = 5432
	}
	if App.DBName == "" {
		App.DBName = "cultivator"
	}
	if App.DBUser == "" {
		App.DBUser = "postgres"
	}

	return App, nil
}

// DSN returns the PostgreSQL connection string.
func (c *Config) DSN() string {
	return fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s TimeZone=UTC",
		c.DBHost, c.DBPort, c.DBUser, c.DBPassword, c.DBName, c.DBSSLMode,
	)
}
