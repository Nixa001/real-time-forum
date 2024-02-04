/* La fonction `getSession` permet de récupérer la valeur d'un cookie de session
portant un nom donné. Il prend un paramètre `name` qui représente le nom du cookie
de session à récupérer. */

// export function getSession(name) {

//     var nameEQ = name + "=";
//     console.log('Name = ', nameEQ);
//     var ca = document.cookie.split(';');
//     console.log('ca = ', ca);
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }

export function setSession(token) {
    const daysToExpire = 1;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));

    const sessionDataString = JSON.stringify(token);

    document.cookie = `session=${sessionDataString}; expires=${expirationDate.toUTCString()}; path=/`;
    console.log(document.cookie);
}


export function clearSession() {
    fetch("/api/logout")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error("Erreur lors de la suppression de la session :", error));
}
