package comments

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"strconv"
)

type DataComments struct {
	ContentComment string `json:"content_comment"`
}

type Response struct {
	Status     bool           `json:"status"`
	Message    string         `json:"message"`
	Page       string         `json:"page"`
	IsComment  bool           `json:"isComment"`
	Comment    models.Comment `json:"comment"`
	NbrComment int            `json:"nbrComment"`
}

func HandleComment(w http.ResponseWriter, r *http.Request) {
	var sqlD = utils.CreateDB()

	if r.Method == "POST" {
		contentComment := r.FormValue("content_comment")
		postId := r.FormValue("postID")
		cookie, err := r.Cookie("session")
		if err != nil {
			http.Error(w, "Erreur lors de la récupération du cookie sur le commentaire", http.StatusInternalServerError)
			return
		}
		if contentComment == "" {
			fmt.Println("Empty comment")
			return
		}

		dataUserJson := InfoUserComment(w, r, cookie.Value, sqlD)
		var dataUser models.User

		err = json.Unmarshal([]byte(dataUserJson), &dataUser)
		if err != nil {
			http.Error(w, "Erreur lors de la conversion JSON", http.StatusInternalServerError)
			return
		}

		_, err = sqlD.Exec("INSERT INTO comment (content_comment, postID, userID) VALUES (?, ?, ?)", contentComment, postId, dataUser.ID)
		if err != nil {
			http.Error(w, "Erreur lors de l'exécution de l'insertion du commentaire", http.StatusInternalServerError)
			return
		}

		var idU int
		postID, _ := strconv.Atoi(postId)
		err = sqlD.QueryRow("SELECT id FROM comment WHERE postID = ? AND userID = ? AND content_comment = ?", postID, dataUser.ID, contentComment).Scan(&idU)
		if err != nil {
			fmt.Println("Erreur lors de la requête SELECT:", err)
			http.Error(w, "Erreur lors de la récupération de l'ID du commentaire", http.StatusInternalServerError)
			return
		}

		comment := models.Comment{
			Id:       idU,
			Content:  contentComment,
			PostId:   postID,
			UserId:   dataUser.ID,
			NameUser: dataUser.FirstName + " " + dataUser.LastName,
		}

		response := Response{
			Status:     true,
			Message:    "Post réussi",
			Page:       "home",
			IsComment:  true,
			Comment:    comment,
			NbrComment: getNbrComment(sqlD, postID),
		}

		responseJSON, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Erreur lors de la création de la réponse JSON", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(responseJSON)
	}
}

func InfoUserComment(w http.ResponseWriter, r *http.Request, id string, sql *sql.DB) string {
	var data string
	stm := `SELECT data FROM sessions where id = ?`

	query, err := sql.Query(stm, id)
	if err != nil {
		//log.Fatal(err.Error())
		http.Error(w, "Erreur lors de la requête SELECT pour la session", http.StatusInternalServerError)
		return ""
	}

	defer query.Close()
	for query.Next() {
		err = query.Scan(&data)
		if err != nil {
			//log.Fatal(err.Error())
			http.Error(w, "Erreur lors de la récupération des données de session", http.StatusInternalServerError)
			return ""
		}
	}
	return data
}
func getNbrComment(db *sql.DB, postID int) int {
	var comment int
	err := db.QueryRow("SELECT COUNT(*) FROM comment WHERE postID = ?", postID).Scan(&comment)
	if err != nil {
		fmt.Println(err)
	}
	return comment
}
