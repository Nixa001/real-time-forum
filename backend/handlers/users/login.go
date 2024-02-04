package users

import (
	"fmt"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	fmt.Println("login")
	http.ServeFile(w, r, "./index.html")
}
