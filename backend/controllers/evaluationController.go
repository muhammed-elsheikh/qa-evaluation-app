package controllers

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "qa-evaluation-app/backend/models"
)

// CreateEvaluation handles the creation of a new evaluation
func CreateEvaluation(c *gin.Context) {
    var evaluation models.Evaluation
    if err := c.ShouldBindJSON(&evaluation); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // Logic to save evaluation to the database
    c.JSON(http.StatusCreated, evaluation)
}

// GetEvaluations retrieves all evaluations
func GetEvaluations(c *gin.Context) {
    // Logic to fetch evaluations from the database
    evaluations := []models.Evaluation{} // Placeholder for fetched evaluations
    c.JSON(http.StatusOK, evaluations)
}

// UpdateEvaluation handles the update of an existing evaluation
func UpdateEvaluation(c *gin.Context) {
    id := c.Param("id")
    var evaluation models.Evaluation
    if err := c.ShouldBindJSON(&evaluation); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // Logic to update evaluation in the database using id
    c.JSON(http.StatusOK, evaluation)
}

// DeleteEvaluation handles the deletion of an evaluation
func DeleteEvaluation(c *gin.Context) {
    id := c.Param("id")
    // Logic to delete evaluation from the database using id
    c.JSON(http.StatusNoContent, nil)
}