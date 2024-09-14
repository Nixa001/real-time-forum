import { typingTimeout, userId } from "../gestionRouter/Routers.js";
import { RenderPostHandlers } from "../posts/renderPostHandlers.js";
import { createSound, playSound } from "../utils.js";

const websocketURL = "wss://real-time-forum-w85u.onrender.com";
export var socket;

var connectToast = true;

export function initWebSocket() {
  socket = new WebSocket(websocketURL);

  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection opened");
  });
  socket.addEventListener("close", (event) => {
    console.log("WebSocket connection closed");
  });
  socket.addEventListener("message", (event) => {
    const dataMsg = JSON.parse(event.data);
    let userInfo = document.querySelector(".info_online" + dataMsg.idSender);
    if (
      dataMsg.type === "GET" &&
      dataMsg.content == "IsOnline" &&
      connectToast == true
    ) {
      let updateConnect = document.querySelector(".checkbox__wrapper");
      if (updateConnect) {
        let url = "https://real-time-forum-w85u.onrender.com/api/home";
        RenderPostHandlers(url, true);
      }
      if (userInfo != null) {
        let url = "https://real-time-forum-w85u.onrender.com/api/home";
        RenderPostHandlers(url, true);
      }
      createToast("notification.mp3");
      toast(dataMsg.fullName, dataMsg.content);
      connectToast = false;
    } else if (dataMsg.type === "GET" && dataMsg.content == "IsOffline") {
      if (userInfo != null) {
        let url = "https://real-time-forum-w85u.onrender.com/api/home";
        RenderPostHandlers(url, true);
      }
      createToast("notification.mp3");
      toast(dataMsg.fullName, dataMsg.content);
      connectToast = true;
    } else if (dataMsg.type === "GET" && dataMsg.content == "IS TYPING") {
      let validUser = document.querySelector(
        ".espace-message" + dataMsg.idSender
      );
      if (validUser) {
        showTypingMessage();
      }
    } else if (dataMsg.type === "POST") {
      createToast("msg.mp3");
      toast(dataMsg.fullName, dataMsg.content);
      updateMessages(dataMsg);
    }

    // console.log(dataMsg);
  });
}
const showTypingMessage = () => {
  let is_typing = document.querySelector(".is_typing");

  if (is_typing != null) {
    is_typing.textContent = "is typing ...";

    clearTimeout(typingTimeout.val);

    typingTimeout.val = setTimeout(() => {
      is_typing.textContent = "";
    }, 1000);
  }
};

// window.addEventListener("load", () => {
//   initWebSocket();
// });

export function updateMessages(dataMsg) {
  let msgbox = document.querySelector(".espace-message" + dataMsg.idSender);
  let userBox = document.querySelector(".message-list" + dataMsg.idSender);
  if (msgbox) {
    let divmsg = document.createElement("div");
    divmsg.className = "receive-message";
    divmsg.textContent = dataMsg.content;

    let dateMsg = document.createElement("span");
    dateMsg.className = "date_msg";
    dateMsg.textContent = "@" + dataMsg.UserName + ": " + formatDate();

    divmsg.appendChild(dateMsg);
    let all_messages = document.querySelector(".all_messages");
    all_messages.innerHTML = "";

    msgbox.appendChild(divmsg);
    msgbox.scrollTop = msgbox.scrollHeight;
  }
  let mess = document.querySelector(".message-top");
  if (mess) {
    getUsersDataMsg();
  }
}
function createToast(notif) {
  createSound(notif);
  playSound();

  var toast = document.createElement("div");
  toast.classList.add("toast");

  var toastContent = document.createElement("div");
  toastContent.classList.add("toast-content");

  var message = document.createElement("div");
  message.classList.add("message");

  var paragraph = document.createElement("p");
  paragraph.classList.add("text", "text-1");
  paragraph.innerHTML = " ";

  message.appendChild(paragraph);

  toastContent.appendChild(message);

  toast.appendChild(toastContent);

  var progress = document.createElement("div");
  progress.classList.add("progress");
  toast.appendChild(progress);

  document.body.appendChild(toast);
}

function toast(fullName, typeToast) {
  let nameConn = document.querySelector(".text-1");
  if (typeToast == "IsOnline") {
    nameConn.innerHTML =
      fullName + "<span class='text text-2'> is connected</span>";
  } else if (typeToast == "IsOffline") {
    nameConn.innerHTML =
      fullName + "<span class='text text-2'> is disconnected</span>";
  } else {
    nameConn.innerHTML =
      fullName + "<span class='text text-2'> has sent a new message</span>";
  }
  let toast = document.querySelector(".toast");
  let progress = document.querySelector(".progress");
  let timer1, timer2;

  toast.classList.add("active");
  progress.classList.add("active");

  timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000);

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
}

export function sendMessageToServer(message, idReceiver, idSender, method) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        type: method,
        content: message,
        idReceiver: idReceiver,
        idSender: idSender,
      })
    );
  } else {
    console.error("La connexion WebSocket n'est pas ouverte.");
  }
}
// socket.addEventListener("close", (event) => {
//   console.log("La connexion WebSocket est fermée.", event);
// });

export function disconnectSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
}

export function getUsersDataMsg() {
  const urlApi =
    "https://real-time-forum-w85u.onrender.com/api/getUsersDataMsg";
  fetch(urlApi, {
    method: "GET",
    contentType: "application/json",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isMessage) {
        let all_messages = document.querySelector(".all_messages");
        all_messages.innerHTML = "";
        data.users.forEach((element) => {
          if (data.currentUser != element.Id) {
            AddUsermsg(element, element.messages, data.currentUser);
          } else {
            let fullName = document.querySelector(".userFullNameConnect");
            let userame = document.querySelector(".userNameConnect");
            fullName.textContent = element.FirstName + " " + element.LastName;
            userame.textContent = "@" + element.UserName;
            userId.IdSender = data.currentUser;
          }
        });
      } else {
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
}

export function AddUsermsg(user, messages, currentUser) {
  if (messages != null) {
    messages = messages.reverse();
  }
  let all_messages = document.querySelector(".all_messages");
  let messageList = document.createElement("div");
  messageList.classList.add("message-list");
  messageList.classList.add("message-list" + user.Id);

  messageList.addEventListener("click", function () {
    let espace_messag = document.querySelector(".espace-message");
    let content_right = document.querySelector(".content-right");
    espace_messag.remove();

    let espace_message = document.createElement("div");
    all_messages.innerHTML = "";
    getUsersDataMsg();

    espace_message.className = "espace-message";
    espace_message.classList.add("espace-message" + user.Id);

    let thirdChild = content_right.children[0];

    content_right.insertBefore(espace_message, thirdChild.nextSibling);

    let msg_content = document.querySelector(".content-right");
    msg_content.style.display = "flex";
    userId.IdReceiver = user.Id;
    let fullnameUserMsg = document.querySelector(".fullnameUserMsg");
    fullnameUserMsg.textContent = user.FirstName + " " + user.LastName;
    let startMsg = 10;
    const messagesToAdd = 10;
    function afficherMessages(startMsg, messagesToAdd) {
      if (messages != null) {
        for (let i = startMsg; i < startMsg + messagesToAdd; i++) {
          const msg = messages[i];
          if (msg) {
            let messageContainer = document.createElement("div");
            messageContainer.textContent = msg.messageContent;
            let dateMsg = document.createElement("span");
            dateMsg.className = "date_msg";

            if (currentUser !== msg.userID) {
              messageContainer.className = "receive-message";
              dateMsg.textContent = "@" + user.UserName + ": " + msg.date;
            } else {
              messageContainer.className = "send-message";
              dateMsg.classList.add("send");
              dateMsg.textContent = "Me: " + msg.date;
            }

            messageContainer.appendChild(dateMsg);

            espace_message.insertBefore(
              messageContainer,
              espace_message.firstChild
            );
          }
        }
      }
    }

    afficherMessages(0, 10);
    espace_message.scrollTop = espace_message.scrollHeight;

    let scrollPositionBefore =
      espace_message.scrollHeight - espace_message.scrollTop;
    espace_message.addEventListener("scroll", function () {
      if (espace_message.scrollTop === 0) {
        setTimeout(() => {
          scrollPositionBefore =
            espace_message.scrollHeight - espace_message.scrollTop;

          afficherMessages(startMsg, messagesToAdd);
          espace_message.scrollTop =
            espace_message.scrollHeight - scrollPositionBefore;

          startMsg += messagesToAdd;
        }, 700);
      }
    });
  });

  let imgElement = document.createElement("img");
  imgElement.src = "/frontend/assets/profilibg.jpg";

  let contentUsersMessage = document.createElement("div");
  contentUsersMessage.classList.add("content-users-message");

  let nameTime = document.createElement("div");
  nameTime.classList.add("name-time");

  let h2Element = document.createElement("h2");
  h2Element.textContent = user.FirstName + " " + user.LastName;

  nameTime.appendChild(h2Element);

  let pElement = document.createElement("p");
  pElement.className = "date_msg";
  if (messages != null) {
    pElement.textContent = messages[0].messageContent;
  }

  contentUsersMessage.appendChild(nameTime);
  contentUsersMessage.appendChild(pElement);

  messageList.appendChild(imgElement);
  messageList.appendChild(contentUsersMessage);

  all_messages.appendChild(messageList);
}

export function formatDate() {
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const formattedDate = new Date().toLocaleString("en-US", options);
  return formattedDate;
}
