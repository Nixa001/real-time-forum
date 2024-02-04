package session

import (
	"encoding/json"
	"net/http"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"time"

	"github.com/google/uuid"
)

// type SessionData struct {
// 	UserId            int
// 	UserName          string
// 	UserFirstLastName string
// 	Times             time.Time
// }

var session models.Session

func CreateSession(w http.ResponseWriter, r *http.Request, data models.User) {
	var token = uuid.NewString()
	session.Expiration = time.Now().Add(3 * time.Hour)
	// token = "1234"
	dataJson, err := json.Marshal(data)
	if err != nil {
		//log.Fatal(err.Error())
	}

	stm := `
		INSERT INTO sessions (id, expiration, data) VALUES(?, ?, ?)
	`
	req, err := utils.CreateDB().Prepare(stm)
	if err != nil {
		//log.Fatal(err.Error())
	}
	defer req.Close()
	_, err = req.Exec(token, session.Expiration, dataJson)
	if err != nil {
		//log.Fatal(err.Error())
	}
	cookie := http.Cookie{
		Name:     "session",
		Value:    token,
		Path:     "/",
		Expires:  session.Expiration,
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)
}
