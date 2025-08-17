package routes

import (
	"qdk-tool/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/qdk", controllers.CreateQDK)
	router.GET("/qdk", controllers.GetQDKEntries)
	router.PUT("/qdk/:id", controllers.UpdateQDK)
	router.DELETE("/qdk/:id", controllers.DeleteQDK)
}
