package posts

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"time"
)

func CreatePost(w http.ResponseWriter, r *http.Request) {
	db := utils.CreateDB()
	_, err := session.GetSession(r, db)
	if err != nil {
		if err != nil {
			response := Reponse{
				Status:  true,
				Connect: false,
				Message: "Cookie not set",
				Page:    "login",
			}
			WriteResponse(w, response)
			return
		}
	}

	var post models.Post
	var media_post string

	// session.GetSession(w, r, utils.CreateDB())
	erro := utils.UploadHandler(w, r, &media_post)
	if erro != "ok" && erro != "no file" {
		return
	}

	post.Title = r.FormValue("title_post")
	post.Content = "exple contenu"
	post.Media = media_post
	dateActuel := time.Now()
	format := "2006-01-02 15:04:05"
	post.Date = dateActuel.Format(format)

	sql, err := db.Prepare("INSERT INTO posts (postTitle, postContent, postMedia, postDate, userId) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		fmt.Println("Error when insert post")
		return
	}

	data, err := Decode(models.UserSession.Data)
	if err != nil {
		//log.Fatal(err.Error())
	}

	if post.Title == "" {
		fmt.Println("Empty post")
		return
		// log.Fatal("post title vide")
	}
	_, err = sql.Exec(post.Title, post.Content, post.Media, post.Date, data.ID)
	if err != nil {
		fmt.Println("Error when exec insert post")
		return
	}

	categ := insertCategories(db, r, post)
	if categ != "ok"{
		return
	}

	log := true

	var id int
	err = db.QueryRow("SELECT id FROM posts WHERE postTitle = ? AND userID = ?", post.Title, data.ID).Scan(&id)
	if err != nil {
		fmt.Println("Erreur select id on comment")
		fmt.Println(err.Error())
	}

	post.Id = id
	post.UserId = data.ID

	var reponse = map[string]interface{}{}
	if log {
		user := InfoUserPosted(db, data.ID)
		reponse = map[string]interface{}{
			"status":  log,
			"message": "connect successfully",
			"page":    "home",
			"user":    user,
			"isPost":  true,
			"post":    post,
		}
	}

	responsJson, err := json.Marshal(reponse)
	if err != nil {
		fmt.Println(err.Error())
	}

	w.Write(responsJson)
}

func insertCategories(db *sql.DB, r *http.Request, post models.Post) string {

	//--- recuperer les categories
	postCatTechno := r.FormValue("techno")
	postCatSport := r.FormValue("sport")
	postCatSante := r.FormValue("sante")
	postCatMusique := r.FormValue("musique")
	postCatNews := r.FormValue("news")
	postCatOther := r.FormValue("other")
	req, err := db.Prepare("SELECT id FROM categories WHERE categoryName = ? OR categoryName = ? OR categoryName = ? OR categoryName = ? OR categoryName = ? OR categoryName = ?")
	if err != nil {
		fmt.Println("Error when select category")
		return "Error when select category"
	}
	defer req.Close()
	rows, err := req.Query(postCatTechno, postCatSport, postCatSante, postCatMusique, postCatNews, postCatOther)
	if err != nil {
		fmt.Println("Error when Query categories")
		return "Error when Query categories"
	}
	defer rows.Close()
	// Parcourir les résultats
	tabID_Category := []int{}
	for rows.Next() {
		var id int
		if err := rows.Scan(&id); err != nil {
			fmt.Println("Error when Scan id categories")
			return "Error when Scan id categories"
		}
		tabID_Category = append(tabID_Category, id)
	}
	if len(tabID_Category) == 0 {
		err := map[string]interface{}{"Error": " CATEGORY IS NOT CHECKED"}
		fmt.Println(err)
		return "CATEGORY IS NOT CHECKED"
	}
	if err := rows.Err(); err != nil {
		return "err"
	}

	id_post, err := utils.CreateDB().Prepare("SELECT id FROM posts WHERE postTitle = ? AND postDate = ? ")
	if err != nil {
		return "err"
	}
	id, err := id_post.Query(post.Title, post.Date)
	var id_Post int
	for id.Next() {
		if err := id.Scan(&id_Post); err != nil {
			return "err"
		}
	}

	for i := 0; i < len(tabID_Category); i++ {
		req_b, err := utils.CreateDB().Prepare("INSERT INTO postCategory (postID, categoryID) VALUES (?, ?)")
		if err != nil {
			fmt.Println("Error when insert postCategory ")
			return "Error when insert postCategory "
		}
		_, err = req_b.Exec(id_Post, tabID_Category[i])
		if err != nil {
			fmt.Println("Problem dans l'insertion de la categorie post")
			return "Problem dans l'insertion de la categorie post"
		}
	}
	return "ok"
}
func Decode(jsonString string) (models.User, error) {
	var user models.User
	err := json.Unmarshal([]byte(jsonString), &user)
	if err != nil {
		return models.User{}, fmt.Errorf("Erreur lors de la conversion JSON en struct : %w", err)
	}
	return user, nil
}
