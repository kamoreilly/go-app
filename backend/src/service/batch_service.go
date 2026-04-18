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

type BatchService struct{}

func NewBatchService() *BatchService {
	return &BatchService{}
}

type CreateBatchInput struct {
	FacilityID  uuid.UUID   `json:"facility_id"`
	StrainID    *uuid.UUID  `json:"strain_id"`
	ZoneID      *uuid.UUID  `json:"zone_id"`
	Name        string      `json:"name"`
	PlantIDs    []uuid.UUID `json:"plant_ids"`
}

type UpdateBatchInput struct {
	Name  string `json:"name"`
	Notes string `json:"notes"`
}

type HarvestInput struct {
	FacilityID  uuid.UUID   `json:"facility_id"`
	PlantIDs    []uuid.UUID `json:"plant_ids"`
	StrainID    *uuid.UUID  `json:"strain_id"`
	ZoneID      *uuid.UUID  `json:"zone_id"`
	Name        string      `json:"name"`
	WetWeight   *float64    `json:"wet_weight"`
	Notes       string      `json:"notes"`
}

type MassBalanceInput struct {
	BatchID           uuid.UUID  `json:"batch_id"`
	InputWeight       float64    `json:"input_weight"`
	OutputWeight      *float64   `json:"output_weight"`
	WasteWeight       *float64   `json:"waste_weight"`
	MoistureLoss      *float64   `json:"moisture_loss"`
	AdjustmentWeight  *float64   `json:"adjustment_weight"`
	AdjustmentReason  string      `json:"adjustment_reason"`
}

var batchTransitions = map[model.BatchStatus][]model.BatchStatus{
	model.BatchStatusWet:         {model.BatchStatusCuring, model.BatchStatusQuarantined},
	model.BatchStatusCuring:      {model.BatchStatusCured, model.BatchStatusQuarantined},
	model.BatchStatusCured:       {model.BatchStatusReleased},
	model.BatchStatusQuarantined: {model.BatchStatusCuring, model.BatchStatusCured},
}

func (s *BatchService) ListByFacility(facilityID uuid.UUID) ([]model.Batch, error) {
	var batches []model.Batch
	if err := database.DB.Where("facility_id = ?", facilityID).
		Preload("Strain").Preload("Zone").Preload("BatchPlants").
		Find(&batches).Error; err != nil {
		return nil, err
	}
	return batches, nil
}

func (s *BatchService) Get(id uuid.UUID) (*model.Batch, error) {
	var b model.Batch
	if err := database.DB.Preload("Strain").Preload("Zone").
		Preload("BatchPlants").Preload("BatchPlants.Plant").
		Preload("MassBalances").
		First(&b, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, utils.ErrNotFound
		}
		return nil, err
	}
	return &b, nil
}

func (s *BatchService) Create(input CreateBatchInput) (*model.Batch, error) {
	tx := database.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	batch := model.Batch{
		ID:          uuid.New(),
		FacilityID:   input.FacilityID,
		StrainID:    input.StrainID,
		ZoneID:      input.ZoneID,
		Name:        input.Name,
		HarvestedAt: time.Now(),
		Status:      model.BatchStatusWet,
	}

	var totalWeight float64
	for _, pid := range input.PlantIDs {
		var p model.Plant
		if err := tx.First(&p, "id = ?", pid).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
		totalWeight += derefFloat(p.WeightGrams)

		bp := model.BatchPlant{
			ID:              uuid.New(),
			BatchID:         batch.ID,
			PlantID:         pid,
			PlantWeightGrams: p.WeightGrams,
		}
		if err := tx.Create(&bp).Error; err != nil {
			tx.Rollback()
			return nil, err
		}

		if err := tx.Model(&p).Updates(map[string]interface{}{
			"state":    model.PlantStateHarvested,
			"batch_id": batch.ID,
			"stage":    model.PlantStageHarvesting,
		}).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
	}

	batch.TotalWeightGrams = &totalWeight
	if err := tx.Create(&batch).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	return s.Get(batch.ID)
}

func (s *BatchService) Update(id uuid.UUID, name, notes string) (*model.Batch, error) {
	b, err := s.Get(id)
	if err != nil {
		return nil, err
	}
	if name != "" {
		b.Name = name
	}
	if notes != "" {
		b.Notes = notes
	}
	if err := database.DB.Save(b).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *BatchService) Harvest(input HarvestInput) (*model.Batch, error) {
	tx := database.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	batch := model.Batch{
		ID:          uuid.New(),
		FacilityID:   input.FacilityID,
		StrainID:    input.StrainID,
		ZoneID:      input.ZoneID,
		Name:        input.Name,
		HarvestedAt: time.Now(),
		Status:      model.BatchStatusWet,
		WetWeight:   input.WetWeight,
		Notes:       input.Notes,
	}

	var totalWeight float64
	for _, pid := range input.PlantIDs {
		var p model.Plant
		if err := tx.First(&p, "id = ?", pid).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
		totalWeight += derefFloat(p.WeightGrams)

		bp := model.BatchPlant{
			ID:              uuid.New(),
			BatchID:         batch.ID,
			PlantID:         pid,
			PlantWeightGrams: p.WeightGrams,
		}
		if err := tx.Create(&bp).Error; err != nil {
			tx.Rollback()
			return nil, err
		}

		if err := tx.Model(&p).Updates(map[string]interface{}{
			"state":    model.PlantStateHarvested,
			"batch_id": batch.ID,
			"stage":    model.PlantStageHarvesting,
		}).Error; err != nil {
			tx.Rollback()
			return nil, err
		}
	}

	batch.TotalWeightGrams = &totalWeight
	if err := tx.Create(&batch).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	if err := tx.Commit().Error; err != nil {
		return nil, err
	}

	return s.Get(batch.ID)
}

func (s *BatchService) Transition(id uuid.UUID, newStatus string) (*model.Batch, error) {
	batch, err := s.Get(id)
	if err != nil {
		return nil, err
	}

	ns := model.BatchStatus(newStatus)
	allowed := batchTransitions[batch.Status]
	valid := false
	for _, as := range allowed {
		if as == ns {
			valid = true
			break
		}
	}
	if !valid {
		return nil, utils.ErrInvalidTransition
	}

	if err := database.DB.Model(batch).Update("status", ns).Error; err != nil {
		return nil, err
	}
	return s.Get(id)
}

func (s *BatchService) RecordMassBalance(input MassBalanceInput, userID *uuid.UUID) (*model.MassBalance, error) {
	mb := model.MassBalance{
		ID:               uuid.New(),
		BatchID:          input.BatchID,
		InputWeight:      input.InputWeight,
		OutputWeight:    input.OutputWeight,
		WasteWeight:      input.WasteWeight,
		MoistureLoss:     input.MoistureLoss,
		AdjustmentWeight: input.AdjustmentWeight,
		AdjustmentReason: input.AdjustmentReason,
		CreatedBy:        userID,
	}

	if err := database.DB.Create(&mb).Error; err != nil {
		return nil, err
	}

	updates := map[string]interface{}{}
	if input.OutputWeight != nil {
		updates["dry_weight"] = *input.OutputWeight
	}
	if input.WasteWeight != nil {
		updates["waste_weight"] = *input.WasteWeight
	}
	if input.MoistureLoss != nil {
		updates["moisture_loss"] = *input.MoistureLoss
	}

	if len(updates) > 0 {
		database.DB.Model(&model.Batch{}).Where("id = ?", input.BatchID).Updates(updates)
	}

	return &mb, nil
}

func (s *BatchService) GetLineage(batchID uuid.UUID) (map[string]interface{}, error) {
	batch, err := s.Get(batchID)
	if err != nil {
		return nil, err
	}

	var forwardBatches []model.Batch
	database.DB.Where("id IN (SELECT DISTINCT batch_id FROM plants WHERE batch_id IS NOT NULL AND batch_id != ?)", batchID).Find(&forwardBatches)

	var plantIDs []uuid.UUID
	for _, bp := range batch.BatchPlants {
		plantIDs = append(plantIDs, bp.PlantID)
	}

	var mothers []model.Mother
	database.DB.Where("id IN (SELECT DISTINCT mother_id FROM plants WHERE mother_id IS NOT NULL AND id IN ?)", plantIDs).Find(&mothers)

	return map[string]interface{}{
		"batch":           batch,
		"source_plants":   batch.BatchPlants,
		"forward_batches": forwardBatches,
		"mother_plants":   mothers,
	}, nil
}

func (s *BatchService) Delete(id uuid.UUID) error {
	return database.DB.Delete(&model.Batch{}, "id = ?", id).Error
}

func derefFloat(v *float64) float64 {
	if v == nil {
		return 0
	}
	return *v
}
