package config

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

type DatabaseConfig struct {
	DatabaseURL string
}

func NewDatabaseConfig() *DatabaseConfig {
	return &DatabaseConfig{
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}
}

func (config *DatabaseConfig) Connect() (*sql.DB, error) {
	db, err := sql.Open("postgres", config.DatabaseURL)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	log.Println("Connected to PostgreSQL database")
	return db, nil
}
