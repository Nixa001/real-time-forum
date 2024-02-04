package models

type Comment struct {
	Id         int
	Content    string
	PostId     int
	UserId     int
	NameUser   string `json:"NameUser"`
	Nbrlike    int
	NbrDislike int
	IsLiked    bool
	IsDisliked bool
}
