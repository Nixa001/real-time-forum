package utils

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func Cryter(str string) []byte {
	passwd := []byte(str)
	cryptPasswd, err := bcrypt.GenerateFromPassword(passwd, bcrypt.DefaultCost)
	if err != nil {
		fmt.Println(err.Error())
	}
	return cryptPasswd
}

func DeCryper(passSaisie string, passCryter []byte) bool {
	err := bcrypt.CompareHashAndPassword(passCryter, []byte(passSaisie))
	if err != nil {
		return false
	}
	return true
}
