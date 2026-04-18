package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Facility struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Name        string         `gorm:"not null;size:255" json:"name"`
	Address     string         `gorm:"type:text" json:"address"`
	Timezone    string         `gorm:"size:50;not null;default:UTC" json:"timezone"`
	CanopySqFt  int            `json:"canopy_sqft"`
	PlantLimit  int            `json:"plant_limit"`
	CreatedAt   time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
	Version     int            `gorm:"not null;default:1" json:"version"`

	Licenses []License `gorm:"foreignKey:FacilityID" json:"licenses,omitempty"`
	Zones    []Zone   `gorm:"foreignKey:FacilityID" json:"zones,omitempty"`
	Strains  []Strain `gorm:"foreignKey:FacilityID" json:"strains,omitempty"`
}

func (Facility) TableName() string { return "facilities" }