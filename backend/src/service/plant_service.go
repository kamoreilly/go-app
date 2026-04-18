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

type PlantService struct{}

func NewPlantService() *PlantService {
	return &PlantService{}
}

type CreatePlantInput struct {
	FacilityID uuid.UUID  `json:"facility_id"`
	StrainID   *uuid.UUID `json:"strain_id"`
	ZoneID     *uuid.UUID `json:"zone_id"`
	MotherID   *uuid.UUID `json:"mother_id"`
	Name       string     `json:"name"`
}

type UpdatePlantInput struct {
	Name       string     `json:"name"`
	StrainID   *uuid.UUID `json:"strain_id"`
	ZoneID     *uuid.UUID `json:"zone_id"`
	Stage      string     `json:"stage"`
	WeightGrams *float64  `json:"weight_grams"`
}

type TransitionInput struct {
	NewStage string `json:"new_stage"`
	Notes    string `json:"notes"`
}

var validTransitions = map[model.PlantStage][]model.PlantStage{
	model.PlantStagePropagation: {model.PlantStageVegetative},
	model.PlantStageVegetative:  {model.PlantStageFlowering},
	model.PlantStageFlowering:   {model.PlantStageHarvesting},
	model.PlantStageHarvesting:  {model.PlantStageDried},
	model.PlantStageDried:       {model.PlantStagePackaged},
}

func (s *PlantService) ListByFacility(facilityID uuid.UUID, stage, zoneID string) ([]model.Plant, error) {
	query := database.DB.Where("facility_id = ?", facilityID)
	if stage != "" {
		query = query.Where("stage = ?", stage)
	}
	if zoneID != "" {
		query = query.Where("zone_id = ?", zoneID)
	}
	var plants []model.Plant
	if err := query.Preload("Strain").Preload("Zone").Preload("Mother").Find(&plants).Error; err != nil {
		return nil, err
	}
	return plants, nil
}

func (s *PlantService) Get(id uuid.UUID) (*model.Plant, error) {
	var p model.Plant
	if err := database.DB.Preload("Strain").Preload("Zone").Preload("Mother").Preload("Mother.Strain").First(&p, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &p, nil
}

func (s *PlantService) Create(input CreatePlantInput) (*model.Plant, error) {
	p := model.Plant{
		ID:         uuid.New(),
		FacilityID: input.FacilityID,
		StrainID:   input.StrainID,
		ZoneID:     input.ZoneID,
		MotherID:   input.MotherID,
		Name:       input.Name,
		PlantedAt:  time.Now(),
		Stage:      model.PlantStagePropagation,
		State:      model.PlantStateActive,
	}

	if err := database.DB.Create(&p).Error; err != nil {
		return nil, err
	}
	return s.Get(p.ID)
}

func (s *PlantService) Update(id uuid.UUID, input UpdatePlantInput) (*model.Plant, error) {
	p, err := s.Get(id)
	if err != nil {
		return nil, err
	}

	updates := map[string]interface{}{}
	if input.Name != "" {
		updates["name"] = input.Name
	}
	if input.StrainID != nil {
		updates["strain_id"] = *input.StrainID
	}
	if input.ZoneID != nil {
		updates["zone_id"] = *input.ZoneID
	}
	if input.WeightGrams != nil {
		updates["weight_grams"] = *input.WeightGrams
	}

	if err := database.DB.Model(p).Updates(updates).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *PlantService) Transition(id uuid.UUID, input TransitionInput) (*model.Plant, error) {
	p, err := s.Get(id)
	if err != nil {
		return nil, err
	}

	if p.State != model.PlantStateActive {
		return nil, utils.ErrInvalidTransition
	}

	newStage := model.PlantStage(input.NewStage)
	allowed, ok := validTransitions[p.Stage]
	if !ok {
		return nil, utils.ErrInvalidTransition
	}

	valid := false
	for _, s := range allowed {
		if s == newStage {
			valid = true
			break
		}
	}
	if !valid {
		return nil, utils.ErrInvalidTransition
	}

	if err := database.DB.Model(p).Update("stage", newStage).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *PlantService) Destroy(id uuid.UUID) error {
	p, err := s.Get(id)
	if err != nil {
		return err
	}
	return database.DB.Model(p).Update("state", model.PlantStateDestroyed).Error
}

func (s *PlantService) BulkMove(plantIDs []uuid.UUID, zoneID uuid.UUID) error {
	return database.DB.Model(&model.Plant{}).
		Where("id IN ? AND state = ?", plantIDs, model.PlantStateActive).
		Updates(map[string]interface{}{"zone_id": zoneID}).Error
}

func (s *PlantService) CloneFromMother(motherID uuid.UUID, count int, facilityID uuid.UUID) ([]model.Plant, error) {
	var mother model.Mother
	if err := database.DB.First(&mother, "id = ?", motherID).Error; err != nil {
		return nil, err
	}

	var plants []model.Plant
	for i := 0; i < count; i++ {
		p := model.Plant{
			ID:         uuid.New(),
			FacilityID: facilityID,
			StrainID:   mother.StrainID,
			MotherID:   &motherID,
			Name:       mother.Name + "-clone-" + uuid.New().String()[:6],
			PlantedAt:  time.Now(),
			Stage:      model.PlantStagePropagation,
			State:      model.PlantStateActive,
		}
		if err := database.DB.Create(&p).Error; err != nil {
			return plants, err
		}
		plants = append(plants, p)
	}
	return plants, nil
}
