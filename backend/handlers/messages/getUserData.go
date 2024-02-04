package messages

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/comments"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"time"
)

type User struct {
	ID        int              `json:"Id"`
	FirstName string           `json:"FirstName"`
	LastName  string           `json:"LastName"`
	UserName  string           `json:"UserName"`
	Age       string           `json:"Age"`
	Genre     string           `json:"Genre"`
	UserMail  string           `json:"UserMail"`
	UserPass  string           `json:"UserPass"`
	IsOnline  bool             `json:"IsOnline"`
	Messages  []models.Message `json:"messages"`
}

type Response struct {
	IsMessage   bool             `json:"isMessage"`
	Message     string           `json:"message"`
	Page        string           `json:"page"`
	CurrentUser int              `json:"currentUser"`
	Messages    []models.Message `json:"messages"`
	Users       []User           `json:"users"`
}

func GetUsersDataMsg(w http.ResponseWriter, r *http.Request) {
	db := utils.CreateDB()
	_, err := session.GetSession(r, db)
	if err != nil {
		response := Response{
			IsMessage: false,
			Message:   "Cookie not set",
			Page:      "login",
		}
		responsJson, err := json.Marshal(response)
		if err != nil {
			fmt.Println(err.Error())
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
	users, err := GetUsersFromDatabase(db, dataUser.ID, true)
	if err != nil {
		fmt.Println("err on getting users or msgs")
		fmt.Println("err", err)
		response := Response{
			IsMessage: false,
			Message:   "Cannot get messages data",
			Page:      "login",
		}
		responsJson, err := json.Marshal(response)
		if err != nil {
			fmt.Println(err.Error())
		}
		w.Write(responsJson)
	}
	response := Response{
		IsMessage:   true,
		Message:     "Sucess",
		Page:        "messages",
		CurrentUser: dataUser.ID,
		Users:       users,
	}
	responsJson, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err.Error())
	}
	w.Write(responsJson)
}
func ifdupllicate(userId int, usersId []int) bool {
	for _, i := range usersId {
		if i == userId {
			return true
		}
	}
	return false

}

func ifdupllicat(userId int, usersId []User) bool {
	for _, i := range usersId {
		if i.ID == userId {
			return true
		}
	}
	return false

}

func GetUsersFromDatabase(db *sql.DB, CurrentUser int, IsMsg bool) ([]User, error) {
	var usersId []int
	var count int
	var users []User

	db.QueryRow("SELECT COUNT(*) FROM messages WHERE userID = ? OR userIdReceiver = ?", CurrentUser, CurrentUser).Scan(&count)
	if count > 0 {
		rowsUsersMsg, err := db.Query("SELECT userID, userIdReceiver FROM messages WHERE userID = ? OR userIdReceiver = ? ORDER BY id DESC", CurrentUser, CurrentUser)

		if err != nil {
			return nil, err
		}
		defer rowsUsersMsg.Close()

		var userId int
		var userIdReceiver int
		var id int
		for rowsUsersMsg.Next() {
			rowsUsersMsg.Scan(&userId, &userIdReceiver)
			stm := `SELECT * FROM users WHERE id = ?`

			if CurrentUser == userId && !ifdupllicate(userIdReceiver, usersId) {
				usersId = append(usersId, userIdReceiver)
				id = userIdReceiver

				query, err := db.Query(stm, id)
				if err != nil {
					//log.Fatal(err.Error())
				}
				defer query.Close()
				var user User
				for query.Next() {
					err = query.Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.Age, &user.Genre, &user.UserMail, &user.UserPass, &user.IsOnline)
					if err != nil {
						fmt.Println(err)
					}
				}
				user.Messages, _ = MessagesForUser(db, CurrentUser, user.ID)
				users = append(users, user)
			}

			if CurrentUser == userIdReceiver && !ifdupllicate(userId, usersId) {
				usersId = append(usersId, userId)
				id = userId

				query, err := db.Query(stm, id)
				if err != nil {
					//log.Fatal(err.Error())
				}
				defer query.Close()
				var user User
				for query.Next() {
					err = query.Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.Age, &user.Genre, &user.UserMail, &user.UserPass, &user.IsOnline)
					if err != nil {
						fmt.Println(err)
					}
				}
				user.Messages, _ = MessagesForUser(db, CurrentUser, user.ID)
				users = append(users, user)
			}

		}

	}
	// if IsMsg {
	// 	return users, nil
	// }
	rows, err := db.Query("SELECT * FROM users ORDER BY firstName ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.Age, &user.Genre, &user.UserMail, &user.UserPass, &user.IsOnline)
		if err != nil {
			return nil, err
		}
		if !ifdupllicat(user.ID, users) {
			user.Messages, _ = MessagesForUser(db, CurrentUser, user.ID)
			users = append(users, user)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func MessagesForUser(db *sql.DB, CurrentUser, UserID int) ([]models.Message, error) {
	query := `SELECT * FROM messages WHERE (userID = ? AND userIdReceiver = ?) OR (userID = ? AND userIdReceiver = ?);`
	rows, err := db.Query(query, CurrentUser, UserID, UserID, CurrentUser)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.Message

	for rows.Next() {
		var message models.Message

		err := rows.Scan(
			&message.ID,
			&message.MessageContent,
			&message.UserID,
			&message.UserIdReceiver,
			&message.Date,
		)
		if err != nil {
			return nil, err
		}
		row, _ := db.Query("SELECT userName FROM users WHERE id = ?", message.UserID)

		defer row.Close()

		// Parcourir les résultats
		for row.Next() {
			if err := row.Scan(&message.UserName); err != nil {
				fmt.Println("error on select username")
				// log.Fatal(err)
			}
		}
		parsedTime, err := time.Parse("2006-01-02 15:04:05", message.Date)
		if err != nil {
			fmt.Println("Erreur lors de la conversion de la date :", err)
		}

		message.Date = parsedTime.Format("Jan 2, 2006, 15:04")
		messages = append(messages, message)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return messages, nil
}
