import { RenderHtmlheader } from "./header/header.js";
import { RenderSidebarLeft } from "./home/sidebarLeft.js";
import { gestionNavigation } from "./utils/gestionRouter/Routers.js";

export let dataConnect = {
  IsLog: false,
};
export let userConn = {
  IsConn: false,
  IsDisconn: false,
};
export function homeFetch() {
  let chemin = window.location.pathname;
  fetch("https://real-time-forum-w85u.onrender.com/api/home")
    .then((response) => response.json())
    .then((data) => {
      if (data.connect === false) {
        if (chemin == "/register") {
          gestionNavigation("/register");
        } else {
          gestionNavigation("/login");
        }
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération de la session :", error);
    });

  if (chemin != "/register" && chemin != "/login") {
    const leftSideBar = document.querySelector(".sidebar_left");
    const header = document.querySelector("header");
    header.innerHTML = RenderHtmlheader();
    leftSideBar.innerHTML = RenderSidebarLeft();
    document.addEventListener("DOMContentLoaded", (event) => {
      event.preventDefault();
      // console.log(" = ", chemin);
      let msgIcon = document.querySelector(".chat");
      msgIcon.addEventListener("click", () => {
        gestionNavigation("/messages");
      });
      // let notifIcon = document.querySelector(".chat")
      // notifIcon.addEventListener("click", () => {
      //   gestionNavigation("/notifications");
      // })

      gestionNavigation(chemin);
    });
  }
  if (chemin != "/register" && chemin != "/login") {
    const leftSideBar = document.querySelector(".sidebar_left");
    const header = document.querySelector("header");
    header.innerHTML = RenderHtmlheader();
    leftSideBar.innerHTML = RenderSidebarLeft();

    routerHandle();
  }
}
homeFetch();
// routerHandle()
// window.addEventListener("popstate", (event) => {
//   const chemin = window.location.pathname;
//   gestionNavigation(chemin);
// });

export function routerHandle() {
  var navbarLinks = document.querySelectorAll(".navbar_link");
  navbarLinks.forEach(function (navbarLink) {
    navbarLink.addEventListener("click", function () {
      var href = navbarLink.getAttribute("data-href");
      gestionNavigation(href);
    });
  });
}
