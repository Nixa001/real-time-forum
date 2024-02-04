package utils

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func CreateDB() *sql.DB {
	DB, err := sql.Open("sqlite3", "./backend/database/realTimeForum.db")
	if err != nil {
		fmt.Println("err on open db")
		//log.Fatal(err.Error())
	}

	return DB
}

// CreateTable(DB)

var DB = CreateDB()
