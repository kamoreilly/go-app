package service

import (
	"errors"
	"time"

	"app/src/database"
	"app/src/model"
	"app/src/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type LicenseService struct{}

func NewLicenseService() *LicenseService {
	return &LicenseService{}
}

type CreateLicenseInput struct {
	FacilityID    uuid.UUID  `json:"facility_id"`
	LicenseNumber string    `json:"license_number"`
	LicenseType   string    `json:"license_type"`
	Jurisdiction  string    `json:"jurisdiction"`
	IssuedAt      *time.Time `json:"issued_at"`
	ExpiresAt     *time.Time `json:"expires_at"`
}

func (s *LicenseService) ListByFacility(facilityID uuid.UUID) ([]model.License, error) {
	var licenses []model.License
	if err := database.DB.Where("facility_id = ?", facilityID).Find(&licenses).Error; err != nil {
		return nil, err
	}
	return licenses, nil
}

func (s *LicenseService) Create(input CreateLicenseInput) (*model.License, error) {
	l := model.License{
		ID:            uuid.New(),
		FacilityID:    input.FacilityID,
		LicenseNumber: input.LicenseNumber,
		LicenseType:   input.LicenseType,
		Jurisdiction:  input.Jurisdiction,
		IssuedAt:      input.IssuedAt,
		ExpiresAt:     input.ExpiresAt,
		Status:        "active",
	}
	if err := database.DB.Create(&l).Error; err != nil {
		return nil, err
	}
	return &l, nil
}

func (s *LicenseService) Get(id uuid.UUID) (*model.License, error) {
	var l model.License
	if err := database.DB.First(&l, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &l, nil
}

func (s *LicenseService) Update(id uuid.UUID, status string) (*model.License, error) {
	l, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	l.Status = status
	if err := database.DB.Save(l).Error; err != nil {
		return nil, err
	}
	return l, nil
}

func (s *LicenseService) ListExpiring(facilityID uuid.UUID, withinDays int) ([]model.License, error) {
	var licenses []model.License
	cutoff := time.Now().AddDate(0, 0, withinDays)
	if err := database.DB.Where(
		"facility_id = ? AND expires_at IS NOT NULL AND expires_at <= ? AND status = ?",
		facilityID, cutoff, "active",
	).Find(&licenses).Error; err != nil {
		return nil, err
	}
	return licenses, nil
}
