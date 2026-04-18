package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ZoneType string

const (
	ZoneTypeVegetation  ZoneType = "veg"
	ZoneTypeFlowering   ZoneType = "flower"
	ZoneTypePropagation ZoneType = "propagation"
	ZoneTypeDrying      ZoneType = "drying"
	ZoneTypeQuarantine  ZoneType = "quarantine"
)

type Zone struct {
	ID         uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID uuid.UUID      `gorm:"type:uuid;not null;index" json:"facility_id"`
	Name       string         `gorm:"not null;size:100" json:"name"`
	ZoneType   ZoneType       `gorm:"size:30;not null" json:"zone_type"`
	CanopySqFt int            `json:"canopy_sqft"`
	CreatedAt  time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

func (Zone) TableName() string { return "zones" }