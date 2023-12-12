import { renderMainBody } from "./home/main.js";
import { renderSidebarLeft } from "./home/sidebarLeft.js";
import { renderHtmlMessages } from "./message/message.js";
import { header } from "/views/scripts/header.js";
import { login } from "/views/scripts/login.js";
import { register } from "/views/scripts/register.js";



document.addEventListener("DOMContentLoaded", () => {
    // login()
    register()
    // const headerHtml = header()
    // const sidebarLeft = renderSidebarLeft()
    const mainBodyHtml = renderMainBody();
    // const message = renderHtmlMessages()
    // document.body.innerHTML = headerHtml + sidebarLeft + mainBodyHtml 
});