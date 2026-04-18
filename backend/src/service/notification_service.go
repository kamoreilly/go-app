package service

import (
	"time"

	"app/src/database"
	"app/src/model"
)

type ComplianceAlert struct {
	Type      string    `json:"type"`
	Message   string    `json:"message"`
	Entity    string    `json:"entity"`
	EntityID  string    `json:"entity_id"`
	Severity  string    `json:"severity"`
	CreatedAt time.Time `json:"created_at"`
}

type NotificationService struct{}

func NewNotificationService() *NotificationService {
	return &NotificationService{}
}

func (s *NotificationService) GetComplianceAlerts(facilityID string) ([]ComplianceAlert, error) {
	var alerts []ComplianceAlert
	now := time.Now()
	thirtyDays := now.AddDate(0, 0, 30)

	// Expiring licenses
	var licenses []model.License
	if err := database.DB.Where("facility_id = ? AND expires_at IS NOT NULL AND expires_at <= ? AND status = ?",
		facilityID, thirtyDays, "active").Find(&licenses).Error; err != nil {
		return nil, err
	}
	for _, l := range licenses {
		alerts = append(alerts, ComplianceAlert{
			Type:     "license_expiring",
			Message:  "License " + l.LicenseNumber + " expires on " + l.ExpiresAt.Format("2006-01-02"),
			Entity:   "license",
			EntityID: l.ID.String(),
			Severity: "high",
			CreatedAt: now,
		})
	}

	// Quarantined batches
	var batches []model.Batch
	if err := database.DB.Where("facility_id = ? AND status = ?", facilityID, "quarantined").Find(&batches).Error; err != nil {
		return nil, err
	}
	for _, b := range batches {
		alerts = append(alerts, ComplianceAlert{
			Type:     "batch_quarantined",
			Message:  "Batch " + b.Name + " is in quarantine",
			Entity:   "batch",
			EntityID: b.ID.String(),
			Severity: "high",
			CreatedAt: now,
		})
	}

	// Stale plants
	cutoff := now.AddDate(0, 0, -60)
	var stalePlants []model.Plant
	if err := database.DB.Where("facility_id = ? AND state = ? AND updated_at < ?",
		facilityID, "active", cutoff).Find(&stalePlants).Error; err != nil {
		return nil, err
	}
	for _, p := range stalePlants {
		alerts = append(alerts, ComplianceAlert{
			Type:     "plant_stale",
			Message:  "Plant " + p.Name + " has not been updated in over 60 days",
			Entity:   "plant",
			EntityID: p.ID.String(),
			Severity: "medium",
			CreatedAt: now,
		})
	}

	return alerts, nil
}