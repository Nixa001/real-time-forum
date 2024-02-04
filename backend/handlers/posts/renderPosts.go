package posts

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/comments"
	"real-time-forum/backend/handlers/messages"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"strconv"
)

type Reponse struct {
	Status   bool            `json:"status"`
	Connect  bool            `json:"connect"`
	Message  string          `json:"message"`
	Page     string          `json:"page"`
	Token    string          `json:"token"`
	Posts    []models.Post   `json:"posts"`
	User     models.User     `json:"user"`
	AllUsers []messages.User `json:"allUsers"`
}

func RenderPost(w http.ResponseWriter, r *http.Request) {
	var db = utils.CreateDB()
	defer db.Close()
	_, err := session.GetSession(r, db)
	if err != nil {
		reponse := Reponse{
			Status:  true,
			Connect: false,
			Message: "Cookie not set",
			Page:    "login",
		}
		responsJson, err := json.Marshal(reponse)
		if err != nil {
			//log.Fatal(err.Error())
		}
		w.Write(responsJson)
		return
	}

	cookie, err := r.Cookie("session")
	if err != nil {
		fmt.Println("Error when get cookie on comment")
	}
	dataUserJson := comments.InfoUserComment(w, r, cookie.Value, db)
	var dataUser models.User
	err = json.Unmarshal([]byte(dataUserJson), &dataUser)
	if err != nil {
		fmt.Println("Erreur lors de la conversion JSON :", err)
	}
	IsLikeComment := false
	posts, err := getPosts(w, r, db, dataUser.ID, IsLikeComment)
	if err != nil {
		//log.Fatal(err.Error())
	}
	allUsers, _ := messages.GetUsersFromDatabase(db, dataUser.ID, false)
	// if len(posts) > 0 {
	var response Reponse
	response.Status = true
	response.Connect = true
	response.Message = "Post successfully"
	response.Page = "home"
	response.Token = "12345"
	response.Posts = posts
	response.User = dataUser
	response.AllUsers = allUsers
	WriteResponse(w, response)
	// }
}

func getPosts(w http.ResponseWriter, r *http.Request, db *sql.DB, UserID int, IsLikeComment bool) ([]models.Post, error) {
	var posts []models.Post
	stm := `SELECT * FROM posts ORDER BY id DESC`

	query, err := db.Query(stm)
	if err != nil {
		return nil, err
	}
	defer query.Close()

	for query.Next() {
		var post models.Post
		err = query.Scan(&post.Id, &post.Title, &post.Content, &post.Media, &post.Date, &post.UserId)
		if err != nil {
			return nil, err
		}
		var idUser string

		err = db.QueryRow("SELECT userID FROM posts WHERE id = ?", post.Id).Scan(&idUser)
		if err != nil {
			fmt.Println(err)
		}
		IdUser, _ := strconv.Atoi(idUser)
		dataUser := InfoUserPosted(db, IdUser)
		post.User = dataUser
		post.Comments = getComments(post.Id, db, UserID)
		post.Nbrlikes, post.NbrDislikes = GetLikes(post.Id, db, IsLikeComment)
		numUserLike := IfUserlike(post.Id, UserID, db, IsLikeComment)
		if numUserLike == 1 {
			post.IsLiked = true
		} else if numUserLike == 0 {
			post.IsDisliked = true
		} else if numUserLike == -1 {
			post.IsLiked = false
			post.IsDisliked = false

		}
		posts = append(posts, post)
	}

	return posts, nil
}

func IfUserlike(postID, userID int, db *sql.DB, IsLikeComment bool) int {
	var count int
	var like int
	if !IsLikeComment {
		db.QueryRow("SELECT COUNT(*) FROM likePost WHERE postID = ? AND userID = ?", postID, userID).Scan(&count)
	} else {
		db.QueryRow("SELECT COUNT(*) FROM likesComments WHERE commentID = ? AND userID = ?", postID, userID).Scan(&count)
	}

	if count != 0 {
		if !IsLikeComment {
			db.QueryRow("SELECT isLike FROM likePost WHERE postID = ? AND userID = ?", postID, userID).Scan(&like)
		} else {
			db.QueryRow("SELECT isLike FROM likesComments WHERE commentID = ? AND userID = ?", postID, userID).Scan(&like)
		}
	} else {
		return -1
	}
	return like
}

func GetLikes(postID int, db *sql.DB, IsLikeComment bool) (int, int) {
	var like int
	var dislike int
	var err, err1 error
	if !IsLikeComment {
		err = db.QueryRow("SELECT COUNT(*) FROM likePost WHERE postID = ? AND isLike = ?", postID, 1).Scan(&like)
		err1 = db.QueryRow("SELECT COUNT(*) FROM likePost WHERE postID = ? AND isLike = ?", postID, 0).Scan(&dislike)

	} else {
		err = db.QueryRow("SELECT COUNT(*) FROM likesComments WHERE commentID = ? AND isLike = ?", postID, 1).Scan(&like)
		err1 = db.QueryRow("SELECT COUNT(*) FROM likesComments WHERE commentID = ? AND isLike = ?", postID, 0).Scan(&dislike)
	}
	if err != nil {
		fmt.Println("Erreur lors de la compte des likes", err)
	}
	if err1 != nil {
		fmt.Println("Erreur lors de la compte des dislikes", err)
	}
	return like, dislike
}

func getComments(postId int, sql *sql.DB, UserID int) []models.Comment {
	var comments []models.Comment
	stm := `
        SELECT * FROM comment WHERE postID = ?
    `
	query, err := sql.Query(stm, postId)
	if err != nil {
		//log.Fatal(err.Error())
	}
	defer query.Close()
	for query.Next() {
		var comment models.Comment
		err = query.Scan(&comment.Id, &comment.Content, &comment.PostId, &comment.UserId)
		name := getNameUser(comment.UserId, sql)
		if err != nil {
			//log.Fatal(err.Error())
		}
		comment.Nbrlike, comment.NbrDislike = GetLikes(comment.Id, sql, true)

		numUserLike := IfUserlike(comment.Id, UserID, sql, true)
		if numUserLike == 1 {
			comment.IsLiked = true
		} else if numUserLike == 0 {
			comment.IsDisliked = true
		}
		comment.NameUser = name
		comments = append(comments, comment)
	}
	return comments
}
func getNameUser(UserId int, sql *sql.DB) string {
	var name string
	stm := `
			SELECT firstName, lastName FROM users WHERE id = ?
		`
	queryComment, err := sql.Query(stm, UserId)
	if err != nil {
		//log.Fatal(err.Error())
	}

	defer queryComment.Close()
	for queryComment.Next() {
		firstName := ""
		lastName := ""
		err = queryComment.Scan(&firstName, &lastName)
		if err != nil {
			//log.Fatal(err.Error())
		}
		name = firstName + " " + lastName
	}
	return name
}

func InfoUserPosted(db *sql.DB, id int) models.User {
	var userCnct models.User
	stm := `SELECT * FROM users WHERE id = ?`

	query, err := db.Query(stm, id)
	if err != nil {
		//log.Fatal(err.Error())
	}
	defer query.Close()

	for query.Next() {
		err = query.Scan(&userCnct.ID, &userCnct.FirstName, &userCnct.LastName, &userCnct.UserName, &userCnct.Age, &userCnct.Genre, &userCnct.UserMail, &userCnct.UserPass, &userCnct.IsOnline)
		if err != nil {
			//log.Fatal(err.Error())
		}
	}
	return userCnct
}

func WriteResponse(w http.ResponseWriter, response Reponse) {
	responseJson, err := json.Marshal(response)
	if err != nil {
		//log.Fatal(err.Error())
	}
	w.Write(responseJson)
}
