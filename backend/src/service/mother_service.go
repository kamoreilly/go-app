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

type MotherService struct{}

func NewMotherService() *MotherService {
	return &MotherService{}
}

type CreateMotherInput struct {
	FacilityID uuid.UUID  `json:"facility_id"`
	StrainID   *uuid.UUID `json:"strain_id"`
	Name       string     `json:"name"`
	PlantedAt  *time.Time `json:"planted_at"`
	Notes      string     `json:"notes"`
}

func (s *MotherService) ListByFacility(facilityID uuid.UUID) ([]model.Mother, error) {
	var mothers []model.Mother
	if err := database.DB.Where("facility_id = ?", facilityID).
		Preload("Strain").Find(&mothers).Error; err != nil {
		return nil, err
	}
	return mothers, nil
}

func (s *MotherService) Get(id uuid.UUID) (*model.Mother, error) {
	var m model.Mother
	if err := database.DB.Preload("Strain").Preload("Clones").First(&m, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &m, nil
}

func (s *MotherService) Create(input CreateMotherInput) (*model.Mother, error) {
	m := model.Mother{
		ID:         uuid.New(),
		FacilityID: input.FacilityID,
		StrainID:   input.StrainID,
		Name:       input.Name,
		PlantedAt:  input.PlantedAt,
		Status:     model.MotherStatusActive,
		Notes:      input.Notes,
	}
	if err := database.DB.Create(&m).Error; err != nil {
		return nil, err
	}
	return s.Get(m.ID)
}

func (s *MotherService) Update(id uuid.UUID, name string, status model.MotherStatus, notes string) (*model.Mother, error) {
	m, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	m.Name = name
	m.Status = status
	m.Notes = notes
	if err := database.DB.Save(m).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *MotherService) Clone(motherID uuid.UUID, count int, facilityID uuid.UUID) ([]model.Plant, error) {
	ps := NewPlantService()
	return ps.CloneFromMother(motherID, count, facilityID)
}

func (s *MotherService) Destroy(id uuid.UUID) error {
	m, err := s.Get(id)
	if err != nil {
		return err
	}
	m.Status = model.MotherStatusDestroyed
	return database.DB.Save(m).Error
}

func (s *MotherService) Delete(id uuid.UUID) error {
	return database.DB.Delete(&model.Mother{}, "id = ?", id).Error
}
