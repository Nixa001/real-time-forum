package socket

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/comments"
	"real-time-forum/backend/models"
	"real-time-forum/backend/utils"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var clients map[int]*websocket.Conn

type Message struct {
	Type       string `json:"type"`
	Content    string `json:"content"`
	IdReceiver int    `json:"idReceiver"`
	IdSender   int    `json:"idSender"`
}
type Resp struct {
	Type       string `json:"type"`
	Content    string `json:"content"`
	IdReceiver int    `json:"idReceiver"`
	IdSender   int    `json:"idSender"`
	FullName   string `json:"fullName"`
	Username   string `json:"UserName"`
}
type Isconnect struct {
	Type     string `json:"type"`
	Content  string `json:"content"`
	IdSender int    `json:"idSender"`
}

func HandleChatSocket(w http.ResponseWriter, r *http.Request) {
	db := utils.CreateDB()

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Impossible de passer à WebSocket", http.StatusInternalServerError)
		return
	}

	cookie, err := r.Cookie("session")
	if err != nil {
		// http.Error(w, "Erreur lors de la récupération du cookie sur le commentaire", http.StatusInternalServerError)
		return
	}

	dataUserJson := comments.InfoUserComment(w, r, cookie.Value, db)
	var dataUser models.User

	err = json.Unmarshal([]byte(dataUserJson), &dataUser)
	if err != nil {
		// http.Error(w, "Erreur lors de la conversion JSON", http.StatusInternalServerError)
		return
	}
	userID := dataUser.ID

	if clients == nil {
		clients = make(map[int]*websocket.Conn)
	}

	clients[userID] = conn

	defer func() {
		delete(clients, userID)
		conn.Close()
	}()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}

		var message Message
		err = json.Unmarshal(msg, &message)
		// message.IdSender = userID
		if err != nil {
			fmt.Println("Erreur de décodage JSON:", err)
			continue
		}

		response := Resp{
			Type:       message.Type,
			Content:    message.Content,
			IdReceiver: message.IdReceiver,
			IdSender:   message.IdSender,
			FullName:   dataUser.FirstName + " " + dataUser.LastName,
			Username:   dataUser.UserName,
		}
		if message.Type == "POST" {
			handlePostMessage(db, conn, userID, response)
		} else if message.Type == "GET" {
			if message.Content == "IS TYPING" {
				handleTyping(response)
			}
			handleGetMessage(db, conn, userID, response)
		}
	}
}
func handlePostMessage(db *sql.DB, conn *websocket.Conn, userID int, message Resp) {
	if message.Content == "" {
		fmt.Println("Empty message")
		return
	}
	sql, err := db.Prepare("INSERT INTO messages (messageContent, userID, userIdReceiver, date) VALUES (?, ?, ?, ?)")
	if err != nil {
		fmt.Println("Error when insert message")
		return
	}

	message.IdSender = userID
	dateActuel := time.Now()
	format := "2006-01-02 15:04:05"
	date := dateActuel.Format(format)
	_, err = sql.Exec(message.Content, message.IdSender, message.IdReceiver, date)
	if err != nil {
		fmt.Println("Error when exec insert message")
		return
	}
	fmt.Printf("%s a envoyé : %s\n", conn.RemoteAddr(), message.Content)

	for id, clientConn := range clients {
		if id == message.IdReceiver {
			msg, err := json.Marshal(message)
			if err != nil {
				fmt.Println("Error encoding message:", err)
				return
			}
			if err := clientConn.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}
		}
	}
}

func handleGetMessage(db *sql.DB, conn *websocket.Conn, userID int, message Resp) {
	var stmt *sql.Stmt
	var err error

	if message.Content == "IsOnline" {
		stmt, err = db.Prepare("UPDATE users SET isOnline = true WHERE id = ?")
	} else if message.Content == "IsOffline" {
		stmt, err = db.Prepare("UPDATE users SET isOnline = false WHERE id = ?")
	}else{
		return
	}
	if err != nil {
		fmt.Println("Error when preparing SQL :", err)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(message.IdSender)
	if err != nil {
		fmt.Println("Error when executing SQL:", err)
		return
	}

	// fmt.Printf("%s a envoyé : %s\n", conn.RemoteAddr(), message.Content)

	for id, clientConn := range clients {
		if id != message.IdSender {
			msg, err := json.Marshal(message)
			if err != nil {
				fmt.Println("Error encoding message:", err)
				return
			}

			if err := clientConn.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}
		}
	}
}

func handleTyping(message Resp) {

	for id, clientConn := range clients {
		if id != message.IdSender {
			msg, err := json.Marshal(message)
			if err != nil {
				fmt.Println("Error encoding message:", err)
				return
			}

			if err := clientConn.WriteMessage(websocket.TextMessage, msg); err != nil {
				return
			}
		}
	}
}
