export function RenderHtmlheader() {
    const html = `
            <a class="header__left">
                <img src="/frontend/assets/icons/comment.png" alt="logo">
            </a>
            <div class="header__input">
                <form action="search" method="POST">
                    <span class="material-icons">search</span>
                    <input type="search" placeholder="Search ..." name="search">
                </form>
            </div>
            <div class="header__right"><span class="material-icons chat">chat</span>
                <span class="material-icons notification">notifications</span>
            </div>
    `
    return html
    // const headerDiv = createText('header', "");

    // const logoLink = createLink('/', 'header__left');
    // const logoImage = createImage('/frontend/assets/login/github.svg', 'logo');
    // logoLink.appendChild(logoImage);

    // headerDiv.appendChild(logoLink);

    // const inputDiv = createDiv('header__input');
    // const searchForm = createForm('search', 'POST');
    // searchForm.innerHTML = `
    //     <span class="material-icons">search</span>
    //     <input type="search" placeholder="Search ..." name="search" />
    // `;
    // inputDiv.appendChild(searchForm);

    // const rightDiv = createDiv('header__right');
    // const messagesLink = createLink('/messages', '');
    // messagesLink.innerHTML = '<span class="material-icons chat">chat</span>';
    // const notificationLink = createLink('/notifications', '');
    // notificationLink.innerHTML = '<span class="material-icons notification">notifications</span>';
    // rightDiv.appendChild(messagesLink);
    // rightDiv.appendChild(notificationLink);

    // headerDiv.appendChild(inputDiv);
    // headerDiv.appendChild(rightDiv);

    // let body = document.body;
    // body.insertBefore(headerDiv, body.firstChild);
    // console.log(headerDiv.outerHTML);
    // return headerDiv.outerHTML
    // document.body.appendChild(headerDiv)
}
