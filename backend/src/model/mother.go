package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type MotherStatus string

const (
	MotherStatusActive    MotherStatus = "active"
	MotherStatusRetired  MotherStatus = "retired"
	MotherStatusDestroyed MotherStatus = "destroyed"
)

type Mother struct {
	ID         uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID uuid.UUID      `gorm:"type:uuid;not null;index" json:"facility_id"`
	StrainID   *uuid.UUID     `gorm:"type:uuid" json:"strain_id"`
	Name       string         `gorm:"size:100" json:"name"`
	PlantedAt  *time.Time     `json:"planted_at"`
	Status     MotherStatus   `gorm:"size:20;not null;default:active" json:"status"`
	Notes      string         `gorm:"type:text" json:"notes"`
	CreatedAt  time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	Strain  *Strain `gorm:"foreignKey:StrainID" json:"strain,omitempty"`
	Clones  []Plant `gorm:"foreignKey:MotherID" json:"clones,omitempty"`
}

func (Mother) TableName() string { return "mother_plants" }