import { createDiv, createText, createImage,  createInput } from "./utils/utils.js";

export function login() {
    const loginPageDiv = createDiv('login_page');
    const leftSideDiv = createDiv('left_side');
    const headerLoginDiv = createDiv('header_login');

    headerLoginDiv.appendChild(createImage('/views/assets/login/github.svg', 'logo'));
    headerLoginDiv.appendChild(createText('text_header_login', "Don't have an account? <span>Sign up !</span>"));

    leftSideDiv.appendChild(headerLoginDiv);

    const contentLoginDiv = createDiv('content_login');
    contentLoginDiv.appendChild(createText('h1', 'Welcome Back'));

    const loginOtherDiv = createDiv('login_other');
    loginOtherDiv.appendChild(createText('h4', 'Login in to account'));

    const loginImagesDiv = createDiv('');

    loginImagesDiv.appendChild(createImage('/views/assets/login/google.svg', 'google'));
    loginImagesDiv.appendChild(createImage('/views/assets/login/githubb.svg', 'github'));

    loginOtherDiv.appendChild(loginImagesDiv);
    contentLoginDiv.appendChild(loginOtherDiv);
    contentLoginDiv.appendChild(createLoginForm());
    leftSideDiv.appendChild(contentLoginDiv);

    const rightSideDiv = createDiv('right_side');
    // rightSideDiv.style.background = "url('/views/assets/login/image_side.jpg')"

    loginPageDiv.appendChild(leftSideDiv);
    loginPageDiv.appendChild(rightSideDiv);

    document.body.appendChild(loginPageDiv);
}
function createLoginForm() {
    const form = document.createElement('form');
    form.action = '#';
    form.method = 'get';

    form.appendChild(createInput('text', 'email', 'Email or Username'));
    form.appendChild(createInput('password', 'password', 'Password'));

    const submitButton = document.createElement('input');
    submitButton.className = 'btn-submit';
    submitButton.type = 'submit';
    submitButton.value = 'LOG IN';
    submitButton.name = 'login';
    form.appendChild(submitButton);

    return form;
}
// login()
