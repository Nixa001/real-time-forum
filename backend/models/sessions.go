package models

import "time"

type Session struct {
	ID         string
	Expiration time.Time
	Data       string
}

var UserSession Session
