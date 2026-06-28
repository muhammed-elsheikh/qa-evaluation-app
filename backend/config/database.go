package config

import (
	"log"
	"os"
	"time"

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
	var db *gorm.DB
	var err error

	maxRetries := 30
	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(postgres.Open(config.DatabaseURL), &gorm.Config{})
		if err == nil {
			log.Println("Connected to PostgreSQL database")
			return db, nil
		}

		log.Printf("Failed to connect to database (attempt %d/%d): %v", i+1, maxRetries, err)
		if i < maxRetries-1 {
			time.Sleep(2 * time.Second)
		}
	}

	return nil, err
}
