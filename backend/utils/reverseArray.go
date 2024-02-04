package utils

func RverseArray(arr []int) []int {
	// Obtenez la longueur du tableau
	length := len(arr)

	// Utilisez une boucle pour échanger les éléments du début et de la fin
	for i := 0; i < length/2; i++ {
		// Échangez les éléments à l'indice i et à l'indice correspondant de la fin du tableau
		arr[i], arr[length-1-i] = arr[length-1-i], arr[i]
	}
	return arr
}
