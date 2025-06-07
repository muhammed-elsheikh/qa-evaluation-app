package database

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"qa-evaluation-app/backend/handlers"
	"qa-evaluation-app/backend/middleware"
	"qa-evaluation-app/backend/models"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

func Connect() {
	var err error

	// Get database URL from environment variable or use default
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "user=postgres dbname=qa_dashboard password=yourpassword host=localhost sslmode=disable"
	}

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	fmt.Println("Successfully connected to the database")

	// Create tables
	createTables()
}

func GetDB() *sql.DB {
	return db
}

func createTables() {
	// Create users table
	userTableQuery := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		email VARCHAR(255) UNIQUE NOT NULL,
		password VARCHAR(255) NOT NULL,
		avatar VARCHAR(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`

	_, err := db.Exec(userTableQuery)
	if err != nil {
		log.Fatal("Error creating users table: ", err)
	}

	fmt.Println("Database tables created successfully")
}

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Add CORS middleware
	router.Use(middleware.CORSMiddleware())

	// Get JWT secret from environment or use default
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "your-secret-key-change-this-in-production"
	}

	// Initialize repositories and handlers
	userRepo := models.NewUserRepository(db)
	authHandler := handlers.NewAuthHandler(userRepo, jwtSecret)
	dashboardHandler := handlers.NewDashboardHandler()

	// Public routes
	public := router.Group("/api")
	{
		public.GET("/ping", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong"})
		})

		public.GET("/db-status", func(c *gin.Context) {
			err := db.Ping()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"status": "Database connection failed"})
			} else {
				c.JSON(http.StatusOK, gin.H{"status": "Database connected"})
			}
		})

		// Auth routes
		public.POST("/auth/register", authHandler.Register)
		public.POST("/auth/login", authHandler.Login)
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(middleware.AuthMiddleware([]byte(jwtSecret)))
	{
		protected.GET("/auth/profile", authHandler.GetProfile)
		protected.GET("/dashboard", dashboardHandler.GetDashboardData)
	}

	return router
}
