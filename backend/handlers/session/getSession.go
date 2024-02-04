package session

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"real-time-forum/backend/models"
)

type Reponse struct {
	Status  bool   `json:"status"`
	Connect bool   `json:"connect"`
	Message string `json:"message"`
	Page    string `json:"page"`
	Token   string `json:"token"`
	User    models.Session
}

func GetSession(r *http.Request, db *sql.DB) (*models.Session, error) {
	cookie, err := r.Cookie("session")
	if err != nil {
		return nil, err
	}
	stm := `SELECT * FROM sessions WHERE id = ?`
	query, err := db.Prepare(stm)
	if err != nil {
		return nil, fmt.Errorf("cookie query failed: %w", err)
	}
	defer query.Close()
	err = query.QueryRow(cookie.Value).Scan(&models.UserSession.ID, &models.UserSession.Expiration, &models.UserSession.Data)
	if err != nil {
		// fmt.Println("err lors de la requette de recup session ", err.Error())
		return nil, fmt.Errorf("cookie query failed: %w", err)
	}

	if time.Now().Before(models.UserSession.Expiration) {
		_, err := db.Exec("UPDATE sessions SET expiration = ? WHERE id = ?", time.Now().Add(3*time.Hour), cookie.Value)
		if err != nil {
			return nil, fmt.Errorf("updating session expiration failed: %w", err)
		}
	} else {
		fmt.Println("Time not ")
		return nil, err
	}
	cookie.Expires = time.Now()

	return &models.UserSession, nil
}
