package models

type Post struct {
	Id          int
	Title       string
	Content     string
	Media       string
	Date        string
	UserId      int
	Comments    []Comment
	Nbrlikes    int
	NbrDislikes int
	IsLiked     bool
	IsDisliked  bool
	User        User
}

var Posts []Post
