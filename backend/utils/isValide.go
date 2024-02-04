package utils

import (
	"fmt"
	"regexp"
	"strings"
)

func IsValidEmail(email string) bool {
	// Utilisation d'une expression régulière simple pour la validation d'une adresse e-mail.
	// Cette expression régulière ne couvre pas tous les cas possibles, mais elle est suffisante pour des cas courants.
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

	match, err := regexp.MatchString(emailRegex, email)
	if err != nil {
		fmt.Println("Erreur lors de l'évaluation de l'expression régulière :", err)
		return false
	}

	return match
}

func IsValidImageType(contentType string) bool {
	contentType = strings.ToLower(contentType)
	return contentType == "image/jpeg" ||
		contentType == "image/jpg" ||
		contentType == "image/png" ||
		contentType == "image/gif" ||
		contentType == "image/bmp" ||
		contentType == "image/webp"
}
