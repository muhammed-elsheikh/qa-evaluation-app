package main

import (
	"log"

	"qa-evaluation-app/config"
	"qa-evaluation-app/handlers"
	"qa-evaluation-app/models"

	"github.com/gin-gonic/gin"
)

func main() {
	// Database connection
	dbConfig := config.NewDatabaseConfig()
	db, err := dbConfig.Connect()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Initialize repository and handlers
	evalRepo := models.NewEvaluationRepository(db)
	evalHandler := handlers.NewEvaluationHandler(evalRepo)

	// Initialize Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// API routes
	api := r.Group("/api/v1")
	{
		api.POST("/evaluations", evalHandler.CreateEvaluation)
		api.GET("/evaluations/user/:userId", evalHandler.GetEvaluationsByUserID)
	}

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	log.Println("Server starting on port 8080...")
	r.Run(":8080")
}
