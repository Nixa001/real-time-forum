package like

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/posts"
	"real-time-forum/backend/utils"
	"strconv"
)

type LikeRequest struct {
	PostID        int  `json:"PostID"`
	UserID        int  `json:"UserID"`
	Like          bool `json:"Like"`
	IsLikeComment bool `json:"IsLikeComment"`
}

type LikeResponse struct {
	Status        bool   `json:"status"`
	Message       string `json:"message"`
	IsLike        bool   `json:"IsLike"`
	IsDislike     bool   `json:"IsDislike"`
	NbrLike       int    `json:"NbrLike"`
	NbrDislike    int    `json:"NbrDislike"`
	TypeLike      string `json:"TypeLike"`
	IsLikeComment bool   `json:"IsLikeComment"`
}

func HandleLikePostComment(w http.ResponseWriter, r *http.Request) {
	var likeRequest LikeRequest
	if r.Method != "POST" {
		response := LikeResponse{Status: false, Message: "Page not found"}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
	db := utils.CreateDB()
	err := json.NewDecoder(r.Body).Decode(&likeRequest)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}
	postCommentID := likeRequest.PostID
	userID := likeRequest.UserID
	liked := likeRequest.Like
	IsLikeComment := likeRequest.IsLikeComment
	insertLike(db, postCommentID, userID, liked, IsLikeComment)
	numUserLike := posts.IfUserlike(postCommentID, userID, db, IsLikeComment)
	var isDisliked, isLiked bool
	if numUserLike == 1 {
		isLiked = true
	} else if numUserLike == 0 {
		isDisliked = true
	}
	nbrLike, nbrDislike := posts.GetLikes(postCommentID, db, IsLikeComment)
	val := strconv.Itoa(postCommentID)
	idLike := val + "post"
	if IsLikeComment {
		idLike = val + "comment"
	}
	response := LikeResponse{
		Status:        true,
		Message:       "Success",
		IsLike:        isLiked,
		IsDislike:     isDisliked,
		NbrLike:       nbrLike,
		NbrDislike:    nbrDislike,
		TypeLike:      idLike,
		IsLikeComment: IsLikeComment,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

}
func insertLike(db *sql.DB, postCommentID, userID int, liked, IsLikeComment bool) {
	//on check si le like n'est pas dans la db
	ifExist, isLikeDislike := checkIfLiked(db, postCommentID, userID, IsLikeComment)

	if !ifExist {
		// si le like n'existe pas il est ajoute
		stm := `INSERT INTO likePost (postID, userID, isLike) VALUES (?, ?, ?)`
		if IsLikeComment {
			stm = `INSERT INTO likesComments (commentID, userID, isLike) VALUES (?, ?, ?)`
		}
		query, err := db.Prepare(stm)
		if err != nil {
			fmt.Println("Erreur lors de la preparation  INSERT like")
			//log.Fatal(err.Error())
		}

		_, err = query.Exec(postCommentID, userID, liked)
		if err != nil {
			fmt.Println("Erreur lors de l'exécution de l'insertion du like")
			//log.Fatal(err.Error())
		}
	} else {
		// si le like existe deja, on met a jour ou supprime selon l action
		if (isLikeDislike && !liked) || !isLikeDislike && liked {
			var stm string
			if !liked {
				// si c est un like, mettre a jour la colonne isLike a false
				stm = `UPDATE likePost SET isLike = false WHERE postID = ? AND userID = ?`
				if IsLikeComment {
					stm = `UPDATE likesComments SET isLike = false WHERE commentID = ? AND userID = ?`
				}
			} else {
				// si c est un dislike, mettre à jour la colonne isLike a true
				stm = `UPDATE likePost SET isLike = true WHERE postID = ? AND userID = ?`
				if IsLikeComment {
					stm = `UPDATE likesComments SET isLike = true WHERE commentID = ? AND userID = ?`
				}
			}
			query, err := db.Prepare(stm)
			if err != nil {
				fmt.Println("Erreur lors de la preparation  UPDATE dislike")
				//log.Fatal(err.Error())
			}

			_, err = query.Exec(postCommentID, userID)
			if err != nil {
				fmt.Println("Erreur lors de l'exécution de la mise à jour dislike")
				//log.Fatal(err.Error())
			}
		} else if (isLikeDislike && liked) || (!isLikeDislike && !liked) {
			var stm string
			if IsLikeComment {
				stm = `DELETE FROM likesComments WHERE commentID = ? AND userID = ?`
			} else {
				stm = `DELETE FROM likePost WHERE postID = ? AND userID = ?`
			}
			query, err := db.Prepare(stm)
			if err != nil {
				fmt.Println("Erreur lors de la preparation  DELETE like")
				//log.Fatal(err.Error())
			}

			_, err = query.Exec(postCommentID, userID)
			if err != nil {
				fmt.Println("Erreur lors de l'exécution de la suppression like")
				//log.Fatal(err.Error())
			}
		}
	}
}

func checkIfLiked(db *sql.DB, postCommentID, userID int, IsLikeComment bool) (bool, bool) {

	var count int
	var like int
	var err error
	if !IsLikeComment {
		err = db.QueryRow("SELECT COUNT(*) FROM likePost WHERE postID = ? AND userID = ?", postCommentID, userID).Scan(&count)
	} else {
		err = db.QueryRow("SELECT COUNT(*) FROM likesComments WHERE commentID = ? AND userID = ?", postCommentID, userID).Scan(&count)

	}
	if err != nil {
		fmt.Println("Erreur lors de la vérification de l'existence du like")
		//log.Fatal(err.Error())
	}
	if count != 0 {
		if IsLikeComment {
			db.QueryRow("SELECT isLike FROM likesComments WHERE commentID = ? AND userID = ?", postCommentID, userID).Scan(&like)

		} else {
			db.QueryRow("SELECT isLike FROM likePost WHERE postID = ? AND userID = ?", postCommentID, userID).Scan(&like)
		}
	}

	return (count != 0), (like != 0)
}
