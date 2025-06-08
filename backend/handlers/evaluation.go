package handlers

import (
	"net/http"
	"strconv"

	"qa-evaluation-app/models"

	"github.com/gin-gonic/gin"
)

type EvaluationHandler struct {
	repo *models.EvaluationRepository
}

func NewEvaluationHandler(repo *models.EvaluationRepository) *EvaluationHandler {
	return &EvaluationHandler{repo: repo}
}

func (h *EvaluationHandler) CreateEvaluation(c *gin.Context) {
	var eval models.Evaluation
	if err := c.ShouldBindJSON(&eval); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.CreateEvaluation(&eval); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, eval)
}

func (h *EvaluationHandler) GetEvaluationsByUserID(c *gin.Context) {
	userIDStr := c.Param("userId")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	evaluations, err := h.repo.GetEvaluationsByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, evaluations)
}
