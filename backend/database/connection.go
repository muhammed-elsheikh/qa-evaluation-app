package database

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var db *sql.DB

func Connect() {
	var err error
	connStr := "user=yourusername dbname=yourdbname password=yourpassword host=localhost sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	fmt.Println("Successfully connected to the database")
}

func GetDB() *sql.DB {
	return db
}

func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "pong"})
	})

	router.GET("/db-status", func(c *gin.Context) {
		err := db.Ping()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "Database connection failed"})
		} else {
			c.JSON(http.StatusOK, gin.H{"status": "Database connected"})
		}
	})

	return router
}
