package models

type User struct {
	ID        int    `json:"Id"`
	FirstName string `json:"FirstName"`
	LastName  string `json:"LastName"`
	UserName  string `json:"UserName"`
	Age       string `json:"Age"`
	Genre     string `json:"Genre"`
	UserMail  string `json:"UserMail"`
	UserPass  string `json:"UserPass"`
	IsOnline  bool   `json:"IsOnline"`
}

var Users []User
