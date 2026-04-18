package model

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	Email        string         `gorm:"uniqueIndex;not null;size:255" json:"email"`
	PasswordHash string         `gorm:"not null;size:255" json:"-"`
	Name         string         `gorm:"not null;size:255" json:"name"`
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
}

func (User) TableName() string { return "users" }

type FacilityMembership struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:uuid_generate_v4()" json:"id"`
	UserID     uuid.UUID `gorm:"type:uuid;not null;uniqueIndex:idx_user_facility" json:"user_id"`
	FacilityID uuid.UUID `gorm:"type:uuid;not null;uniqueIndex:idx_user_facility" json:"facility_id"`
	Role       string    `gorm:"size:50;not null;default:member" json:"role"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
}

func (FacilityMembership) TableName() string { return "facility_memberships" }