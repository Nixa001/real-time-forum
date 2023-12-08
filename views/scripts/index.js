import { renderMainBody } from "./home/main.js";
import { renderSidebarLeft } from "./home/sidebarLeft.js";
import { renderProfil } from "./profil/profil.js";
import { header } from "/views/scripts/header.js";
import { login } from "/views/scripts/login.js";
import { register } from "/views/scripts/register.js";



document.addEventListener("DOMContentLoaded", () => {
    // login()
    // register()
    const headerHtml = header()
    const profil = renderProfil()
    const sidebarLeft = renderSidebarLeft()
    const mainBodyHtml = renderMainBody();
    document.body.innerHTML = headerHtml + sidebarLeft + mainBodyHtml;
});