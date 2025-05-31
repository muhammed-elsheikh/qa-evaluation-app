package routes

import (
    "github.com/gin-gonic/gin"
    "qa-evaluation-app/backend/controllers"
)

func SetupRoutes(router *gin.Engine) {
    router.POST("/evaluations", controllers.CreateEvaluation)
    router.GET("/evaluations", controllers.GetEvaluations)
    router.PUT("/evaluations/:id", controllers.UpdateEvaluation)
    router.DELETE("/evaluations/:id", controllers.DeleteEvaluation)
}