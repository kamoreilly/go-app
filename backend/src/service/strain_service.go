package service

import (
	"errors"

	"app/src/database"
	"app/src/model"
	"app/src/utils"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type StrainService struct{}

func NewStrainService() *StrainService {
	return &StrainService{}
}

type CreateStrainInput struct {
	FacilityID        uuid.UUID `json:"facility_id"`
	Name              string    `json:"name"`
	Genetics          string    `json:"genetics"`
	THCPpercent       *float64  `json:"thc_percent"`
	CBDPercent        *float64  `json:"cbd_percent"`
	FloweringTimeDays *int      `json:"flowering_time_days"`
}

func (s *StrainService) ListByFacility(facilityID uuid.UUID) ([]model.Strain, error) {
	var strains []model.Strain
	if err := database.DB.Where("facility_id = ?", facilityID).Find(&strains).Error; err != nil {
		return nil, err
	}
	return strains, nil
}

func (s *StrainService) Get(id uuid.UUID) (*model.Strain, error) {
	var str model.Strain
	if err := database.DB.First(&str, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &str, nil
}

func (s *StrainService) Create(input CreateStrainInput) (*model.Strain, error) {
	str := model.Strain{
		ID:                uuid.New(),
		FacilityID:        input.FacilityID,
		Name:              input.Name,
		Genetics:          input.Genetics,
		THCPpercent:       input.THCPpercent,
		CBDPercent:        input.CBDPercent,
		FloweringTimeDays: input.FloweringTimeDays,
	}
	if err := database.DB.Create(&str).Error; err != nil {
		return nil, err
	}
	return &str, nil
}

func (s *StrainService) Update(id uuid.UUID, name, genetics string, thcPct, cbdPct *float64, floweringDays *int) (*model.Strain, error) {
	str, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	str.Name = name
	str.Genetics = genetics
	str.THCPpercent = thcPct
	str.CBDPercent = cbdPct
	str.FloweringTimeDays = floweringDays
	if err := database.DB.Save(str).Error; err != nil {
		return nil, err
	}
	return str, nil
}

func (s *StrainService) Delete(id uuid.UUID) error {
	return database.DB.Delete(&model.Strain{}, "id = ?", id).Error
}
