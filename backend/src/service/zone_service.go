package service

import (
	"errors"

	"app/src/database"
	"app/src/model"
	"app/src/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ZoneService struct{}

func NewZoneService() *ZoneService {
	return &ZoneService{}
}

type CreateZoneInput struct {
	FacilityID uuid.UUID     `json:"facility_id"`
	Name       string        `json:"name"`
	ZoneType   model.ZoneType `json:"zone_type"`
	CanopySqFt int           `json:"canopy_sqft"`
}

func (s *ZoneService) ListByFacility(facilityID uuid.UUID) ([]model.Zone, error) {
	var zones []model.Zone
	if err := database.DB.Where("facility_id = ?", facilityID).Find(&zones).Error; err != nil {
		return nil, err
	}
	return zones, nil
}

func (s *ZoneService) Get(id uuid.UUID) (*model.Zone, error) {
	var z model.Zone
	if err := database.DB.First(&z, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &z, nil
}

func (s *ZoneService) Create(input CreateZoneInput) (*model.Zone, error) {
	z := model.Zone{
		ID:         uuid.New(),
		FacilityID: input.FacilityID,
		Name:       input.Name,
		ZoneType:   input.ZoneType,
		CanopySqFt: input.CanopySqFt,
	}
	if err := database.DB.Create(&z).Error; err != nil {
		return nil, err
	}
	return &z, nil
}

func (s *ZoneService) Update(id uuid.UUID, name string, zoneType model.ZoneType, canopySqFt int) (*model.Zone, error) {
	z, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	z.Name = name
	z.ZoneType = zoneType
	z.CanopySqFt = canopySqFt
	if err := database.DB.Save(z).Error; err != nil {
		return nil, err
	}
	return z, nil
}

func (s *ZoneService) Delete(id uuid.UUID) error {
	return database.DB.Delete(&model.Zone{}, "id = ?", id).Error
}
