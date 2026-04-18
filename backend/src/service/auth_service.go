package service

import (
	"errors"

	"app/src/database"
	"app/src/middleware"
	"app/src/model"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrEmailTaken   = errors.New("email already registered")
	ErrInvalidCreds = errors.New("invalid email or password")
	ErrUserNotFound = errors.New("user not found")
)

type AuthService struct{}

func NewAuthService() *AuthService {
	return &AuthService{}
}

type RegisterInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string      `json:"token"`
	User  *model.User `json:"user"`
}

func (s *AuthService) Register(input RegisterInput) (*AuthResponse, error) {
	var existing model.User
	if err := database.DB.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		return nil, ErrEmailTaken
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := model.User{
		ID:           uuid.New(),
		Email:        input.Email,
		PasswordHash: string(hashed),
		Name:         input.Name,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	return s.makeToken(&user)
}

func (s *AuthService) Login(input LoginInput) (*AuthResponse, error) {
	var user model.User
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return nil, ErrInvalidCreds
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return nil, ErrInvalidCreds
	}

	return s.makeToken(&user)
}

func (s *AuthService) GetUserByID(id uuid.UUID) (*model.User, error) {
	var user model.User
	if err := database.DB.First(&user, "id = ?", id).Error; err != nil {
		return nil, ErrUserNotFound
	}
	return &user, nil
}

func (s *AuthService) GetUserFacilityIDs(userID uuid.UUID) ([]string, error) {
	var memberships []model.FacilityMembership
	if err := database.DB.Where("user_id = ?", userID).Find(&memberships).Error; err != nil {
		return nil, err
	}
	ids := make([]string, len(memberships))
	for i, m := range memberships {
		ids[i] = m.FacilityID.String()
	}
	return ids, nil
}

func (s *AuthService) makeToken(user *model.User) (*AuthResponse, error) {
	facilityIDs, err := s.GetUserFacilityIDs(user.ID)
	if err != nil {
		return nil, err
	}

	token, err := middleware.GenerateToken(user.ID.String(), user.Email, facilityIDs)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{Token: token, User: user}, nil
}