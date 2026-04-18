package utils

import (
	"errors"
	"net/http"
)

var (
	ErrNotFound           = errors.New("resource not found")
	ErrUnauthorized       = errors.New("unauthorized")
	ErrForbidden          = errors.New("forbidden")
	ErrConflict           = errors.New("resource conflict")
	ErrBadRequest         = errors.New("bad request")
	ErrInternal           = errors.New("internal server error")
	ErrInvalidTransition  = errors.New("invalid state transition")
	ErrOptimisticLock     = errors.New("optimistic lock error: resource was modified")
)

func HTTPStatusFor(err error) int {
	switch {
	case errors.Is(err, ErrNotFound):
		return http.StatusNotFound
	case errors.Is(err, ErrUnauthorized):
		return http.StatusUnauthorized
	case errors.Is(err, ErrForbidden):
		return http.StatusForbidden
	case errors.Is(err, ErrConflict):
		return http.StatusConflict
	case errors.Is(err, ErrBadRequest):
		return http.StatusBadRequest
	case errors.Is(err, ErrInvalidTransition):
		return http.StatusUnprocessableEntity
	case errors.Is(err, ErrOptimisticLock):
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}
