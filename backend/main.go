package main

import (
	"log"

	"qdk-tool/config"

	"github.com/gin-gonic/gin"
)

func main() {
	// Database connection
	dbConfig := config.NewDatabaseConfig()
	db, err := dbConfig.Connect()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("failed to get database connection", err)
	}
	defer sqlDB.Close()

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

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Database connection test
	r.GET("/db-test", func(c *gin.Context) {
		// Test the connection by pinging the database
		sqlDB, err := db.DB()
		if err != nil {
			c.JSON(500, gin.H{
				"status":  "error",
				"message": "Failed to get database connection",
				"error":   err.Error(),
			})
			return
		}

		if err := sqlDB.Ping(); err != nil {
			c.JSON(500, gin.H{
				"status":  "error",
				"message": "Database connection failed",
				"error":   err.Error(),
			})
			return
		}

		// Test a simple query
		var result int
		if err := db.Raw("SELECT 1").Scan(&result).Error; err != nil {
			c.JSON(500, gin.H{
				"status":  "error",
				"message": "Database query failed",
				"error":   err.Error(),
			})
			return
		}

		// Check if tables exist
		var tableCount int64
		db.Raw("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tableCount)

		c.JSON(200, gin.H{
			"status":            "success",
			"message":           "Database connection is working",
			"tables_count":      tableCount,
			"test_query_result": result,
		})
	})

	log.Println("Server starting on port 8080...")
	r.Run(":8080")
}
