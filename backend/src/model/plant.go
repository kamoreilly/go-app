package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PlantStage string

const (
	PlantStagePropagation PlantStage = "propagation"
	PlantStageVegetative PlantStage = "vegetative"
	PlantStageFlowering  PlantStage = "flowering"
	PlantStageHarvesting PlantStage = "harvesting"
	PlantStageDried     PlantStage = "dried"
	PlantStagePackaged   PlantStage = "packaged"
)

type PlantState string

const (
	PlantStateActive    PlantState = "active"
	PlantStateHarvested PlantState = "harvested"
	PlantStateDestroyed PlantState = "destroyed"
)

type Plant struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID   uuid.UUID      `gorm:"type:uuid;not null;index" json:"facility_id"`
	StrainID     *uuid.UUID     `gorm:"type:uuid" json:"strain_id"`
	ZoneID       *uuid.UUID     `gorm:"type:uuid;index" json:"zone_id"`
	MotherID     *uuid.UUID     `gorm:"type:uuid;index" json:"mother_id"`
	BatchID      *uuid.UUID     `gorm:"type:uuid;index" json:"batch_id"`
	Name         string         `gorm:"size:100" json:"name"`
	PlantedAt    time.Time      `gorm:"not null;default:NOW()" json:"planted_at"`
	Stage        PlantStage     `gorm:"size:30;not null;default:propagation;index" json:"stage"`
	State        PlantState     `gorm:"size:20;not null;default:active" json:"state"`
	WeightGrams  *float64       `gorm:"type:decimal(12,2)" json:"weight_grams"`
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	Strain *Strain `gorm:"foreignKey:StrainID" json:"strain,omitempty"`
	Zone   *Zone   `gorm:"foreignKey:ZoneID" json:"zone,omitempty"`
	Mother *Mother `gorm:"foreignKey:MotherID" json:"mother,omitempty"`
}

func (Plant) TableName() string { return "plants" }