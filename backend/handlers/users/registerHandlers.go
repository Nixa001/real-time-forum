package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"strconv"
)

func RegisterHandlersFetch(w http.ResponseWriter, r *http.Request) {
	var userCreateAcounte models.User
	var db = utils.CreateDB()
	// defer db.Close()
	var count int
	userCreateAcounte.FirstName = r.FormValue("first_name")
	userCreateAcounte.LastName = r.FormValue("last_name")
	userCreateAcounte.UserName = r.FormValue("username")
	userCreateAcounte.Age = r.FormValue("age")
	userCreateAcounte.UserMail = r.FormValue("email")
	userCreateAcounte.Genre = r.FormValue("sexe")
	userCreateAcounte.UserPass = r.FormValue("password")
	age, err := strconv.Atoi(userCreateAcounte.Age)
	if err != nil {
		fmt.Println("Format age incorrect")
		return
	}
	if age < 0 {
		fmt.Println("Entrer un age valide")
		return
	}
	if userCreateAcounte.FirstName == "" || userCreateAcounte.LastName == "" || userCreateAcounte.UserMail == "" || userCreateAcounte.UserPass == "" {
		fmt.Println("All input required")
		return
	}
	if userCreateAcounte.Genre != "m" && userCreateAcounte.Genre != "f" {
		fmt.Println("Genre Incorect")
		return
	}
	db.QueryRow("SELECT COUNT(*) FROM users WHERE userName = ? OR userMail = ?", userCreateAcounte.UserName, userCreateAcounte.UserMail).Scan(&count)

	if count != 0 {
		fmt.Println("Username ou mail already exist")
		return
	}

	if !utils.IsValidEmail(userCreateAcounte.UserMail) {
		fmt.Println("Veuillez saisir un email valide")
		return
	}

	stm := `INSERT INTO users (firstName, lastName, userName, age, genre, userMail, userPass, isOnline) VALUES (?,?,?,?,?,?,?,?)`
	query, err := db.Prepare(stm)
	if err != nil {
		fmt.Println("error when insert user")
		return
		//log.Fatal(err.Error())
	}
	defer query.Close()
	passwdCrypter := utils.Cryter(userCreateAcounte.UserPass)
	_, err = query.Exec(userCreateAcounte.FirstName, userCreateAcounte.LastName, userCreateAcounte.UserName, userCreateAcounte.Age, userCreateAcounte.Genre, userCreateAcounte.UserMail, passwdCrypter, true)
	if err != nil {
		//log.Fatal(err.Error())
	}
	stm = `SELECT id FROM users where userMail = ? AND userName = ?	`
	querys := db.QueryRow(stm, userCreateAcounte.UserMail, userCreateAcounte.UserName)
	if err != nil {
		//log.Fatal(err.Error())
	}

	err = querys.Scan(&userCreateAcounte.ID)
	if err != nil {
		//log.Fatal(err.Error())
	}

	session.CreateSession(w, r, userCreateAcounte)

	reponse := map[string]interface{}{
		"status":  "success",
		"connect": true,
		"message": "register succesfully",
		"page":    "home",
		"user":    userCreateAcounte,
		"token":   "12345",
	}

	resonsJson, err := json.Marshal(reponse)
	if err != nil {
		//log.Fatal(err.Error())
	}
	w.Write(resonsJson)
}
