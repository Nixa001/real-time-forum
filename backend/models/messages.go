package models

type Message struct {
	ID             int    `json:"id"`
	MessageContent string `json:"messageContent"`
	UserID         int    `json:"userID"`
	UserIdReceiver int    `json:"userIdReceiver"`
	Date           string `json:"date"`
	UserName       string `json:"userName"`
}
