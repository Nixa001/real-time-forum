package users

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
)

func LoginHandleFetch(w http.ResponseWriter, r *http.Request) {
	var userCnct models.User
	email := r.FormValue("email")
	password := r.FormValue("password")
	
	stm := `SELECT * FROM users WHERE userName = ? OR userMail = ?`

	query, err := utils.CreateDB().Query(stm, email, email)
	if err != nil {
		//log.Fatal(err.Error())
		fmt.Println("Error when select user")
	}
	defer query.Close()
	var log = false
	var user models.User
	for query.Next() {
		err = query.Scan(&userCnct.ID, &userCnct.FirstName, &userCnct.LastName, &userCnct.UserName, &userCnct.Age, &userCnct.Genre, &userCnct.UserMail, &userCnct.UserPass, &userCnct.IsOnline)
		if err != nil {
			fmt.Println(err)
		}
		if (userCnct.UserMail == email || userCnct.UserName == email) && utils.DeCryper(password, []byte(userCnct.UserPass)) /*utils.DeCryper(password, []byte(userCnct.UserPass))*/ {
			log = true
			user = models.User{
				ID:        userCnct.ID,
				FirstName: userCnct.FirstName,
				LastName:  userCnct.LastName,
				UserName:  userCnct.UserName,
				UserMail:  userCnct.UserMail}
		}
	}
	
	// if email == "" || password == "" {
	// 	fmt.Println("All input required")
	// 	return
	// }
	var reponse = map[string]interface{}{}
	if log {
		// user := email
		reponse = map[string]interface{}{
			"status":  log,
			"connect": true,
			"message": "connect successfully",
			"page":    "home",
			"user":    user,
			"token":   "1234567",
		}
		session.CreateSession(w, r, userCnct)
	}

	responsJson, err := json.Marshal(reponse)
	if err != nil {
		fmt.Println(err.Error())
	}

	w.Write(responsJson)

}

func generateSessionID() string {
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		// log.Fatal(err)
		fmt.Println("Error on session")
	}
	return fmt.Sprintf("%x", b)
}
