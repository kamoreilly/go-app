package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Strain struct {
	ID                uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID        uuid.UUID      `gorm:"type:uuid;not null;index" json:"facility_id"`
	Name              string         `gorm:"not null;size:100" json:"name"`
	Genetics          string         `gorm:"size:100" json:"genetics"`
	THCPpercent       *float64       `gorm:"type:decimal(5,2)" json:"thc_percent"`
	CBDPercent        *float64       `gorm:"type:decimal(5,2)" json:"cbd_percent"`
	FloweringTimeDays *int           `json:"flowering_time_days"`
	CreatedAt         time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt         time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt         gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

func (Strain) TableName() string { return "strains" }