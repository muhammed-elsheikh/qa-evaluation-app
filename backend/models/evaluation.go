package models

import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type Evaluation struct {
	ID          int       `json:"id"`
	UserID      int       `json:"user_id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	Score       *float64  `json:"score"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type EvaluationRepository struct {
	db *sql.DB
}

func NewEvaluationRepository(db *sql.DB) *EvaluationRepository {
	return &EvaluationRepository{db: db}
}

func (r *EvaluationRepository) CreateEvaluation(eval *Evaluation) error {
	query := `
		INSERT INTO evaluations (user_id, title, description, status, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?)`

	now := time.Now()
	result, err := r.db.Exec(query, eval.UserID, eval.Title, eval.Description, eval.Status, now, now)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	eval.ID = int(id)
	eval.CreatedAt = now
	eval.UpdatedAt = now
	return nil
}

func (r *EvaluationRepository) GetEvaluationsByUserID(userID int) ([]Evaluation, error) {
	query := `
		SELECT id, user_id, title, description, status, score, created_at, updated_at
		FROM evaluations WHERE user_id = ?
		ORDER BY created_at DESC`

	rows, err := r.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var evaluations []Evaluation
	for rows.Next() {
		var eval Evaluation
		err := rows.Scan(&eval.ID, &eval.UserID, &eval.Title, &eval.Description,
			&eval.Status, &eval.Score, &eval.CreatedAt, &eval.UpdatedAt)
		if err != nil {
			return nil, err
		}
		evaluations = append(evaluations, eval)
	}

	return evaluations, nil
}
