package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	// Lancements du servers
	fmt.Println("http://localhost:9000/")
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
