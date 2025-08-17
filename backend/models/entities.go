package models

// Employee entity
// Already exists in employees.go, but here is the GORM version for reference
// type Employee struct {
// 	gorm.Model
// 	FirstName string
// 	LastName  string
// 	Email     string `gorm:"uniqueIndex"`
// 	Position  string
// 	Roles     []Role `gorm:"many2many:employee_roles;"`
// 	Interactions []Interaction
// }

// Role entity
type Role struct {
	ID        uint       `gorm:"primaryKey"`
	Name      string     `gorm:"uniqueIndex;not null"`
	Employees []Employee `gorm:"many2many:employee_roles;"`
}

// EmployeeRole join table for many-to-many
// GORM can auto-create this, but explicit struct for custom fields
// (optional, can be omitted if no extra fields)
type EmployeeRole struct {
	EmployeeID uint `gorm:"primaryKey"`
	RoleID     uint `gorm:"primaryKey"`
}

// Interaction entity
type Interaction struct {
	ID                 uint `gorm:"primaryKey"`
	EmployeeID         uint
	Type               string // e.g., "evaluation", "message", etc.
	Content            string
	Duration           int    // Duration in seconds
	CallDriver         string // e.g., "Zoom", "Teams", etc.
	InteractionSummary string
	WhatWentWell       string
	WhatWentBad        string
	QaScore            int    // Quality Assurance score, e.g., 1-5
	Feedback           string // Feedback from the interaction
	CreatedAt          int64  // Unix timestamp or use time.Time
}
