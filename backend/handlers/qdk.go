package handlers

import (
	"net/http"
	"strconv"

	"qdk-tool/models"

	"github.com/gin-gonic/gin"
)

type QDKHandler struct {
	repo *models.QDKRepository
}

func NewQDKHandler(repo *models.QDKRepository) *QDKHandler {
	return &QDKHandler{repo: repo}
}

func (h *QDKHandler) CreateQDK(c *gin.Context) {
	var qdk models.QDK
	if err := c.ShouldBindJSON(&qdk); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.repo.CreateQDK(&qdk); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, qdk)
}

func (h *QDKHandler) GetQDKByUserID(c *gin.Context) {
	userIDStr := c.Param("userId")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	qdkEntries, err := h.repo.GetQDKByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, qdkEntries)
}
