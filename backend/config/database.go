package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DatabaseConfig struct {
	DatabaseURL string
}

func NewDatabaseConfig() *DatabaseConfig {
	return &DatabaseConfig{
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}
}

func (config *DatabaseConfig) Connect() (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(config.DatabaseURL), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	log.Println("Connected to PostgreSQL database")
	return db, nil
}
