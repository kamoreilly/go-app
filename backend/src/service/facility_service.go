package service

import (
	"errors"

	"app/src/database"
	"app/src/model"
	"app/src/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FacilityService struct{}

func NewFacilityService() *FacilityService {
	return &FacilityService{}
}

type CreateFacilityInput struct {
	Name       string `json:"name"`
	Address    string `json:"address"`
	Timezone   string `json:"timezone"`
	CanopySqFt int    `json:"canopy_sqft"`
	PlantLimit int    `json:"plant_limit"`
}

type UpdateFacilityInput struct {
	Name       string `json:"name"`
	Address    string `json:"address"`
	Timezone   string `json:"timezone"`
	CanopySqFt int    `json:"canopy_sqft"`
	PlantLimit int    `json:"plant_limit"`
	Version    int    `json:"version"`
}

func (s *FacilityService) List(userID uuid.UUID) ([]model.Facility, error) {
	var facilities []model.Facility
	if err := database.DB.
		Joins("JOIN facility_memberships fm ON fm.facility_id = facilities.id").
		Where("fm.user_id = ?", userID).
		Preload("Licenses").
		Find(&facilities).Error; err != nil {
		return nil, err
	}
	return facilities, nil
}

func (s *FacilityService) Get(id uuid.UUID) (*model.Facility, error) {
	var f model.Facility
	if err := database.DB.Preload("Licenses").First(&f, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &f, nil
}

func (s *FacilityService) Create(input CreateFacilityInput) (*model.Facility, error) {
	f := model.Facility{
		ID:         uuid.New(),
		Name:       input.Name,
		Address:    input.Address,
		Timezone:   input.Timezone,
		CanopySqFt: input.CanopySqFt,
		PlantLimit: input.PlantLimit,
		Version:    1,
	}
	if f.Timezone == "" {
		f.Timezone = "UTC"
	}
	if err := database.DB.Create(&f).Error; err != nil {
		return nil, err
	}
	return &f, nil
}

func (s *FacilityService) Update(id uuid.UUID, input UpdateFacilityInput) (*model.Facility, error) {
	f, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	if f.Version != input.Version {
		return nil, utils.ErrOptimisticLock
	}
	if err := database.DB.Model(f).Updates(map[string]interface{}{
		"name":         input.Name,
		"address":      input.Address,
		"timezone":     input.Timezone,
		"canopy_sqft":  input.CanopySqFt,
		"plant_limit":  input.PlantLimit,
		"version":      f.Version + 1,
	}).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *FacilityService) Delete(id uuid.UUID) error {
	return database.DB.Delete(&model.Facility{}, "id = ?", id).Error
}

func (s *FacilityService) AddMembership(facilityID, userID uuid.UUID, role string) error {
	m := model.FacilityMembership{
		ID:         uuid.New(),
		FacilityID: facilityID,
		UserID:     userID,
		Role:       role,
	}
	return database.DB.Create(&m).Error
}
