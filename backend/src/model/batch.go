package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BatchStatus string

const (
	BatchStatusWet         BatchStatus = "wet"
	BatchStatusCuring     BatchStatus = "curing"
	BatchStatusCured      BatchStatus = "cured"
	BatchStatusReleased    BatchStatus = "released"
	BatchStatusQuarantined BatchStatus = "quarantined"
)

type Batch struct {
	ID              uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	FacilityID      uuid.UUID      `gorm:"type:uuid;not null;index" json:"facility_id"`
	StrainID        *uuid.UUID     `gorm:"type:uuid" json:"strain_id"`
	ZoneID          *uuid.UUID     `gorm:"type:uuid" json:"zone_id"`
	Name            string         `gorm:"size:100" json:"name"`
	HarvestedAt     time.Time      `gorm:"not null;default:NOW()" json:"harvested_at"`
	TotalWeightGrams *float64      `gorm:"type:decimal(12,2)" json:"total_weight_grams"`
	WetWeight       *float64       `gorm:"type:decimal(12,2)" json:"wet_weight"`
	DryWeight       *float64       `gorm:"type:decimal(12,2)" json:"dry_weight"`
	WasteWeight     *float64       `gorm:"type:decimal(12,2);default:0" json:"waste_weight"`
	MoistureLoss    *float64       `gorm:"type:decimal(12,2);default:0" json:"moisture_loss"`
	Status          BatchStatus    `gorm:"size:20;not null;default:wet;index" json:"status"`
	Notes           string         `gorm:"type:text" json:"notes"`
	CreatedAt       time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	Strain      *Strain       `gorm:"foreignKey:StrainID" json:"strain,omitempty"`
	Zone        *Zone         `gorm:"foreignKey:ZoneID" json:"zone,omitempty"`
	BatchPlants []BatchPlant  `gorm:"foreignKey:BatchID" json:"batch_plants,omitempty"`
}

func (Batch) TableName() string { return "harvest_batches" }

type BatchPlant struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	BatchID         uuid.UUID `gorm:"type:uuid;not null;index" json:"batch_id"`
	PlantID         uuid.UUID `gorm:"type:uuid;not null" json:"plant_id"`
	PlantWeightGrams *float64 `gorm:"type:decimal(12,2)" json:"plant_weight_grams"`

	Plant Plant `gorm:"foreignKey:PlantID" json:"plant,omitempty"`
}

func (BatchPlant) TableName() string { return "batch_plants" }

type MassBalance struct {
	ID                uuid.UUID  `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	BatchID           uuid.UUID  `gorm:"type:uuid;not null;index" json:"batch_id"`
	InputWeight       float64    `gorm:"type:decimal(12,2);not null" json:"input_weight"`
	OutputWeight      *float64   `gorm:"type:decimal(12,2)" json:"output_weight"`
	WasteWeight       *float64   `gorm:"type:decimal(12,2);default:0" json:"waste_weight"`
	MoistureLoss      *float64   `gorm:"type:decimal(12,2);default:0" json:"moisture_loss"`
	AdjustmentWeight  *float64   `gorm:"type:decimal(12,2);default:0" json:"adjustment_weight"`
	AdjustmentReason  string     `gorm:"type:text" json:"adjustment_reason"`
	CreatedBy         *uuid.UUID `gorm:"type:uuid" json:"created_by"`
	CreatedAt         time.Time  `gorm:"autoCreateTime" json:"created_at"`
}

func (MassBalance) TableName() string { return "harvest_mass_balance" }