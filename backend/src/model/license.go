package model

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

type License struct {
	ID            uuid.UUID       `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID    uuid.UUID       `gorm:"type:uuid;not null;index" json:"facility_id"`
	LicenseNumber string          `gorm:"not null;size:100" json:"license_number"`
	LicenseType   string          `gorm:"not null;size:50" json:"license_type"`
	Jurisdiction  string          `gorm:"size:100" json:"jurisdiction"`
	IssuedAt      *time.Time      `gorm:"type:date" json:"issued_at"`
	ExpiresAt     *time.Time      `gorm:"type:date;index" json:"expires_at"`
	Status        string          `gorm:"size:20;not null;default:active" json:"status"`
	Metadata      json.RawMessage `gorm:"type:jsonb;default:'{}'" json:"metadata"`
	CreatedAt     time.Time       `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time       `gorm:"autoUpdateTime" json:"updated_at"`
}

func (License) TableName() string { return "licenses" }