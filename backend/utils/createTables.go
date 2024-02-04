package utils

import (
	"database/sql"
	"fmt"
)

func CreateTable(db *sql.DB) {
	// Activer les contraintes FOREIGN KEY avec ON DELETE CASCADE et ON UPDATE CASCADE
	// _, err := db.Exec("PRAGMA foreign_keys = ON;")
	// if err != nil {
	// 	fmt.Println("error1, ", err)
	// }
	// Creation de la table user
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS users ( 
			id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
			firstName TEXT,
			lastName TEXT,
			userName TEXT,
			age TEXT,
			genre TEXT,
			userMail TEXT,
			userPass TEXT,
			isOnline INTEGER
			) 
			 `)
	if err != nil {
		fmt.Println("error2", err)
	}

	// Creation de la table catégorie
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, 
			categoryName TEXT
		)
		`)

	if err != nil {
		fmt.Println("error3", err)
		//log.Fatal(err.Error())
	}

	var idCategory string
	err = db.QueryRow("SELECT id FROM categories WHERE categoryName = 'other'").Scan(&idCategory)
	if err != nil {
		_, err = db.Exec(`
			INSERT INTO categories (categoryName) VALUES ('technologie');
			INSERT INTO categories (categoryName) VALUES ('sport');
			INSERT INTO categories (categoryName) VALUES ('other');
			INSERT INTO categories (categoryName) VALUES ('musique');
			INSERT INTO categories (categoryName) VALUES ('sante');
			INSERT INTO categories (categoryName) VALUES ('news');			
			`)
	}

	// Inserer donnee de la table catégorie

	if err != nil {
		// fmt.Println("Categorie insert")
		//log.Fatal(err.Error())
	}

	// Creation de la table users
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS posts (
			id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, 
			postTitle TEXT,
			postContent TEXT,
			postMedia TEXT,
			postDate TEXT, 
			userID INTEGER, 
			FOREIGN KEY("userID") 
			REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
		 )
		`)
	if err != nil {
		fmt.Println("error4")
		// log.Fatal(err)
	}

	// Création tavle belong
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS postCategory ( 
			postID INTEGER, 
			categoryID INTEGER, 
			PRIMARY KEY(postID, categoryID), 
			FOREIGN KEY(postID) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE, 
			FOREIGN KEY(categoryID) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE 
		)
		`)
	if err != nil {
		fmt.Println("Belong")
		// log.Fatal(err)
	}

	// Création de la table likes-post

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS likePost ( 
			id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, 
			postID INTEGER, 
			userID INTEGER, 
			isLike INTEGER, 
			FOREIGN KEY(postID) REFERENCES "posts"("id") ON DELETE CASCADE, FOREIGN KEY("userID") REFERENCES "users"("id") ON DELETE CASCADE 
		)
		`)
	if err != nil {
		fmt.Println("Like_post")
		// log.Fatal(err)
	}

	// Créate de la table commente
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS comment ( 
			id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, 
			content_comment TEXT, 
			postID INTEGER, 
			userID INTEGER, 
			FOREIGN KEY(postID) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE, 
			FOREIGN KEY(userID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
		)
		`)
	if err != nil {
		fmt.Println("Comment")
		// log.Fatal(err)
	}

	// Creation de le table likes_comment
	_, err = db.Exec(
		`
		CREATE TABLE IF NOT EXISTS likesComments (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			commentID INTEGER,
			userID INTEGER,
			isLike INTEGER, 
			FOREIGN KEY("commentID") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE, 
			FOREIGN KEY("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
		)
	`)
	if err != nil {
		fmt.Println("Like_comment")
		// log.Fatal(err)
	}
	// Creation de la table session
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS sessions (
    	id TEXT PRIMARY KEY,
    	expiration DATETIME,
    	data VARCHAR(255)
		)
		`)
	if err != nil {
		fmt.Println("Session")
		// log.Fatal(err)
	}

	_, err = db.Exec(
		`CREATE TABLE IF NOT EXISTS messages (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			messageContent TEXT,
			userID INTEGER,
			userIdReceiver INTERGER,
			date TEXT,
			FOREIGN KEY (userID) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
			FOREIGN KEY (userIdReceiver) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
		)`)
	if err != nil {
		fmt.Println("Message")
		// log.Fatal(err)
	}

}
