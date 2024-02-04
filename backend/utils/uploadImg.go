package utils

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

const MaxFileSize = 20 * 1024 * 1024

func UploadHandler(w http.ResponseWriter, r *http.Request, media_post *string) string {
	r.ParseMultipartForm(MaxFileSize + 1)
	file, header, err := r.FormFile("image_post")
	if err != nil {
		return "no file"
	}
	defer file.Close()
	contentType := header.Header.Get("Content-Type")
	if !IsValidImageType(contentType) {
		fmt.Println("Invalid image format")
		return "err"
	}
	if header.Size > MaxFileSize {
		fmt.Println("Image is more than 20mo")
		return "err"
	}
	*media_post = header.Filename
	newFile, err := os.Create("./frontend/assets/upload/" + header.Filename)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return "err"
	}
	defer newFile.Close()
	_, err = io.Copy(newFile, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return "err"
	}
	fmt.Println("Image uploaded ...")
	return "ok"
}
