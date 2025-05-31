type Evaluation struct {
    ID          int    `json:"id"`
    Title       string `json:"title"`
    Description string `json:"description"`
    CreatedAt   string `json:"created_at"`
    UpdatedAt   string `json:"updated_at"`
}

func (e *Evaluation) BeforeSave() error {
    // Logic to set CreatedAt and UpdatedAt before saving
    return nil
}