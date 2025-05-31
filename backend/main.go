package main

import (
    "log"
    "net/http"
    "qa-evaluation-app/backend/database"
    "qa-evaluation-app/backend/routes"
)

func main() {
    // Connect to the database
    database.Connect()

    // Set up routes
    router := routes.SetupRoutes()

    // Start the server
    log.Println("Starting server on :8080")
    if err := http.ListenAndServe(":8080", router); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}