package main

import (
	"log"
	"os"

	"qa-evaluation-app/backend/database"
)

func main() {
	// Connect to database
	database.Connect()

	// Setup router
	router := database.SetupRouter()

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(router.Run(":" + port))
}
