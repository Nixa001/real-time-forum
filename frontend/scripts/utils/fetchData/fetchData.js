import { RenderHtmlheader } from "../../header/header.js";
import { RenderMainBody } from "../../home/main.js";
import { RenderSidebarLeft } from "../../home/sidebarLeft.js";
import { homeFetch, routerHandle } from "../../index.js";
import { initWebSocket, sendMessageToServer, socket } from "../chat/chat.js";
import { AddComment } from "../commentPost/commentPost.js";
import { gestionNavigation, userId } from "../gestionRouter/Routers.js";
import { AddPost, RenderPostHandlers } from "../posts/renderPostHandlers.js";

/**
 * La fonction `myfunc` est un écouteur d'événements qui empêche le comportement par défaut d'une
 * soumission de formulaire, récupère les données du formulaire, les convertit en objet, envoie une
 * requête POST à un point de terminaison d'API avec les données du formulaire au format JSON et gère
 * la réponse.
 * @param elem - Le paramètre `elem` représente l'élément HTML auquel l'écouteur d'événement sera
 * attaché. Il peut s'agir de n'importe quel élément HTML valide, tel qu'un bouton, un formulaire ou un
 * champ de saisie.
 * @param e - Le paramètre `e` dans la fonction `myfunc` représente le type d'événement que vous
 * souhaitez écouter sur l'élément `elem`. Il s'agit généralement d'une chaîne représentant le nom de
 * l'événement, tel que "click", "submit", "keydown", etc.
 */
let url = "http://localhost:9000/api/home"


export const fetchData = (elem, e, urlApi, postID = 0) => {
  // console.log(elem);
  elem.addEventListener(e, (event) => {
    event.preventDefault();

    const formData = new FormData(elem);
    formData.append("postID", postID)
    fetch(urlApi, {
      method: "POST",
      // contentType: "application/json",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          if (data.connect) {
            initWebSocket()

            setTimeout(() => {
              sendMessageToServer("IsOnline", 0, userId.IdSender, "GET");
            }, 1500);
            userId.IdSender = data.user.Id
            renderHome()
            // window.location.href = "/" + data.page;
            history.pushState(null, null, "/home");
            routerHandle()
            // gestionNavigation("/home")

            // setTimeout(() => {
            //   sendMessageToServer("IsOnline", 0, userId.IdSender, "GET");
            // }, 100);

          }
          if (data.isComment) {
            let commentDiv = document.querySelector(".comments" + data.comment.PostId)
            AddComment(data.comment, commentDiv, data.comment.UserId)
            let Input = document.querySelector(".content_comment" + data.comment.PostId);
            let nbrComment = document.querySelector(".comment-span" + data.comment.PostId)
            nbrComment.innerHTML = data.nbrComment
            Input.value = "";

          }
          if (data.isPost) {
            AddPost(data.post, data, true)
            let Input = document.querySelector(".title_post");
            Input.value = "";
          }
        } else {
          const error_login_msg = document.querySelector(".error_login_msg")
          error_login_msg.textContent = "Email or Password incorrect !"
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  });
};


function renderHome() {

  const main = document.querySelector("body");
  main.innerHTML = `
  <header></header>
  <div class="sidebar_left sidebar"> </div>
  <main class="main_body"></main>
  <div class="commentDiv" style="display: none;"></div>
  `
  const leftSideBar = document.querySelector(".sidebar_left");
  const header = document.querySelector("header");
  header.innerHTML = RenderHtmlheader()
  leftSideBar.innerHTML = RenderSidebarLeft()
  const mainBody = document.querySelector(".main_body");
  RenderPostHandlers(url);
  mainBody.innerHTML = new RenderMainBody().getHtml();

  window.addEventListener("popstate", (event) => {
    const chemin = window.location.pathname;
    gestionNavigation(chemin);
  });
  homeFetch()
}

