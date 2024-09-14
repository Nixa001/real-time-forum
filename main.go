package main

import (
	"fmt"
	"net/http"
	"real-time-forum/backend/handlers/comments"
	"real-time-forum/backend/handlers/like"
	"real-time-forum/backend/handlers/messages"
	"real-time-forum/backend/handlers/posts"
	"real-time-forum/backend/handlers/session"
	"real-time-forum/backend/handlers/socket"
	"real-time-forum/backend/handlers/users"
	"real-time-forum/backend/utils"
)


func main() {
	utils.ClearScreen()
port := "9000" // Variable pour le port
    addr := fmt.Sprintf(":%s", port)

	utils.CreateDB()
	fmt.Println("Data base create successfull")
	fs := http.FileServer(http.Dir("frontend"))
	http.Handle("/frontend/", http.StripPrefix("/frontend/", fs))
	http.HandleFunc("/", home)
	http.HandleFunc("/api/login", users.LoginHandleFetch)
	http.HandleFunc("/api/logout", session.DeleteSession)
	http.HandleFunc("/api/post", posts.CreatePost)
	http.HandleFunc("/api/register", users.RegisterHandlersFetch)
	http.HandleFunc("/api/comments", comments.HandleComment)
	http.HandleFunc("/api/like", like.HandleLikePostComment)
	http.HandleFunc("/api/likeComment", like.HandleLikePostComment)
	http.HandleFunc("/api/home", posts.RenderPost)
	http.HandleFunc("/api/", posts.RenderPost)
	http.HandleFunc("/api/getUsersDataMsg", messages.GetUsersDataMsg)
	http.HandleFunc("/ws", socket.HandleChatSocket)

	fmt.Println("http://localhost:9000/")
	http.ListenAndServe(addr, nil)
}

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./index.html")
}
