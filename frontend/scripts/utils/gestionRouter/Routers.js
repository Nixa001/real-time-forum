import { RenderHtmlMessages } from "../../message/message.js";
import { RenderMainBody } from "../../home/main.js";
import { clearSession } from "../sessions.js";
import { RenderHtmlProfile } from "../../profil/profil.js";
import { RenderHtmlLogin } from "../../login/RenderHtmlLogin.js";
import { RenderHtmlRegister } from "../../register/Register.js";
import { LoginHandler } from "../users/loginHandlers.js";
import { RegisterHandlers } from "../users/registerHandlers.js";
import { RenderPostHandlers } from "../posts/renderPostHandlers.js";
import { post } from "../posts/postHandlers.js";
import {
  disconnectSocket,
  formatDate,
  getUsersDataMsg,
  initWebSocket,
  sendMessageToServer,
  socket,
} from "../chat/chat.js";
import { userConn } from "../../index.js";

const url = "https://real-time-forum-w85u.onrender.com/api/home";
export let userId = {
  IdReceiver: 0,
  IdSender: 0,
};
export let typingTimeout = {
  val: 0,
};

// window.addEventListener("beforeunload", () => {
//   disconnectSocket();
// });

// let logout = document.querySelector(".connect")
// if (logout != null) {
//   logout.addEventListener("click", () => {
//     sendMessageToServer("IsOffline", 0, userId.IdSender, "GET");
//   })
// }

export async function gestionNavigation(chemin) {
  if (!socket) {
    initWebSocket();
  }
  const main = document.querySelector("body");
  const mainBody = document.querySelector(".main_body");
  return new Promise((resolve, reject) => {
    switch (chemin) {
      case "/":
      case "/home":
        var newPath = "/home";
        // history.pushState(null, null, newPath);
        history.pushState({ path: newPath }, null, newPath);
        mainBody.innerHTML = new RenderMainBody().getHtml();
        RenderPostHandlers(url);
        post();
        break;

      case "/register":
        var newPath = "/register";
        history.pushState({ path: newPath }, null, newPath);
        // history.pushState(null, null, newPath);
        main.innerHTML = new RenderHtmlRegister().getHtml();
        let signIn = document.querySelector(".navbar_link_signIn");
        signIn.addEventListener("click", () => {
          gestionNavigation("/login");
        });
        RegisterHandlers();
        break;

      case "/login":
        var newPath = "/login";
        history.pushState({ path: newPath }, null, newPath);
        // history.pushState(null, null, newPath);
        main.innerHTML = new RenderHtmlLogin().getHtml();

        let signUp = document.querySelector(".navbar_link_signUp");
        signUp.addEventListener("click", () => {
          gestionNavigation("/register");
        });

        LoginHandler();
        console.log("login");
        break;

      case "/logout":
        clearSession();
        var newPath = "/logout";
        history.pushState({ path: newPath }, null, newPath);
        // history.pushState(null, null, newPath);
        main.innerHTML = new RenderHtmlLogin().getHtml();
        setTimeout(() => {
          sendMessageToServer("IsOffline", 0, userId.IdSender, "GET");
          disconnectSocket();
        }, 1500);
        let signout = document.querySelector(".navbar_link_signUp");
        signout.addEventListener("click", () => {
          gestionNavigation("/register");
        });
        gestionNavigation("/login");
        break;

      case "/messages":
        var newPath = "/messages";
        history.pushState({ path: newPath }, null, newPath);
        // history.pushState(null, null, newPath);
        let checkMsg = document.querySelector(".espace-message");
        if (checkMsg == undefined) {
          mainBody.innerHTML = new RenderHtmlMessages().getHtml();

          let all_messages = document.querySelector(".all_messages");
          all_messages.innerHTML = "";
          getUsersDataMsg();
          var sendButton = document.getElementById("sendButton");

          let evenTypin = document.querySelector(".msg_sender_input");

          //ON TYPING
          evenTypin.addEventListener("input", function () {
            if (!typingTimeout.val) {
              sendMessageToServer(
                "IS TYPING",
                userId.IdReceiver,
                userId.IdSender,
                "GET"
              );
            } else {
              clearTimeout(typingTimeout.val);
            }

            typingTimeout.val = setTimeout(() => {
              typingTimeout.val = null;
            }, 100);

            // console.log("Contenu du textarea:", valeurTextarea);
          });

          //END TYPING

          //EVENT SEND MSG
          sendButton.addEventListener("click", () => {
            const messageContent =
              document.querySelector(".msg_sender_input").value;
            sendMessageToServer(
              messageContent,
              userId.IdReceiver,
              userId.IdSender,
              "POST"
            );
            let all_messages = document.querySelector(".all_messages");
            all_messages.innerHTML = "";
            getUsersDataMsg();

            let espace_message = document.querySelector(".espace-message");
            if (messageContent != "") {
              let receive_msg = document.createElement("div");
              receive_msg.className = "send-message";
              receive_msg.textContent =
                document.querySelector(".msg_sender_input").value;

              let dateMsg = document.createElement("span");
              dateMsg.className = "date_msg";
              dateMsg.textContent = "Me: " + formatDate();

              receive_msg.appendChild(dateMsg);
              espace_message.appendChild(receive_msg);
            }
            espace_message.scrollTop = espace_message.scrollHeight;

            document.querySelector(".msg_sender_input").value = "";
          });
          //END SEND MSG
        }
        break;
      case "/notifications":
      case "/profile":
        let main_bod = document.querySelector(".main_body");
        main_bod.innerHTML = "";
        let msgHeade = document.createElement("h2");
        msgHeade.className = "error_page";
        msgHeade.textContent = "Page not yet implemented";
        main_bod.appendChild(msgHeade);
        break;

        // var newPath = "/profile";
        // history.pushState({ path: newPath }, null, newPath);
        // history.pushState(null, null, newPath);
        // mainBody.innerHTML = new RenderHtmlProfile().getHtml();

        break;
      default:
        let main_body = document.querySelector(".main_body");
        let msgHeader = document.createElement("h2");
        msgHeader.className = "error_page";
        msgHeader.textContent = "ERROR PAGE";
        main_body.appendChild(msgHeader);
        console.log("Route Inconnu :", chemin);
    }
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
