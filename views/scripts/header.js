import { createDiv, createForm, createImage, createLink, createText, } from "./utils/utils.js";

export function header() {
    const headerDiv = createText('header', "");

    const logoLink = createLink('/', 'header__left');
    const logoImage = createImage('/views/assets/login/github.svg', 'logo');
    logoLink.appendChild(logoImage);

    headerDiv.appendChild(logoLink);

    const inputDiv = createDiv('header__input');
    const searchForm = createForm('search', 'POST');
    searchForm.innerHTML = `
        <span class="material-icons">search</span>
        <input type="search" placeholder="Search ..." name="search" />
    `;
    inputDiv.appendChild(searchForm);

    const rightDiv = createDiv('header__right');
    const messagesLink = createLink('/messages', '');
    messagesLink.innerHTML = '<span class="material-icons chat">chat</span>';
    const notificationLink = createLink('/notifications', '');
    notificationLink.innerHTML = '<span class="material-icons notification">notifications</span>';
    rightDiv.appendChild(messagesLink);
    rightDiv.appendChild(notificationLink);

    headerDiv.appendChild(inputDiv);
    headerDiv.appendChild(rightDiv);

    let body = document.body;
    body.insertBefore(headerDiv, body.firstChild);
    // document.body.appendChild(headerDiv)
}
