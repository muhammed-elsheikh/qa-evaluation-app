package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type DashboardHandler struct{}

type StatsData struct {
	Title  string      `json:"title"`
	Value  interface{} `json:"value"`
	Change *Change     `json:"change,omitempty"`
	Color  string      `json:"color"`
}

type Change struct {
	Value int    `json:"value"`
	Trend string `json:"trend"`
}

type Activity struct {
	ID     int    `json:"id"`
	Action string `json:"action"`
	Time   string `json:"time"`
	Type   string `json:"type"`
}

type DashboardData struct {
	Stats      []StatsData `json:"stats"`
	Activities []Activity  `json:"activities"`
}

func NewDashboardHandler() *DashboardHandler {
	return &DashboardHandler{}
}

func (h *DashboardHandler) GetDashboardData(c *gin.Context) {
	// Mock data - in a real app, this would come from your database
	stats := []StatsData{
		{
			Title: "Total Users",
			Value: "2,543",
			Change: &Change{
				Value: 12,
				Trend: "up",
			},
			Color: "blue",
		},
		{
			Title: "Active Sessions",
			Value: "1,834",
			Change: &Change{
				Value: 8,
				Trend: "up",
			},
			Color: "green",
		},
		{
			Title: "Total Reports",
			Value: "847",
			Change: &Change{
				Value: 3,
				Trend: "down",
			},
			Color: "yellow",
		},
		{
			Title: "Performance Score",
			Value: "94%",
			Change: &Change{
				Value: 5,
				Trend: "up",
			},
			Color: "purple",
		},
	}

	activities := []Activity{
		{ID: 1, Action: "New user registered", Time: "2 minutes ago", Type: "user"},
		{ID: 2, Action: "Report generated", Time: "15 minutes ago", Type: "report"},
		{ID: 3, Action: "System backup completed", Time: "1 hour ago", Type: "system"},
		{ID: 4, Action: "Performance alert resolved", Time: "2 hours ago", Type: "alert"},
	}

	dashboardData := DashboardData{
		Stats:      stats,
		Activities: activities,
	}

	c.JSON(http.StatusOK, dashboardData)
}
