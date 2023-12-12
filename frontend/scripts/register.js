import { createDiv, createText, createImage, createInput } from "./utils/utils.js";

export function register() {
    const loginPageDiv = createDiv('login_page');
    const leftSideDiv = createDiv('left_side');
    const headerLoginDiv = createDiv('header_login');

    headerLoginDiv.appendChild(createImage('/frontend/assets/login/github.svg', 'logo'));
    headerLoginDiv.appendChild(createText('text_header_login', "You have already an account? <a href='/login'> <span>Sign In !</span><a>"));

    leftSideDiv.appendChild(headerLoginDiv);

    const contentLoginDiv = createDiv('content_login');
    contentLoginDiv.appendChild(createText('h1', 'Sign Up'));

    const loginOtherDiv = createDiv('login_other');
    loginOtherDiv.appendChild(createText('h4', 'Login in to account'));

    const loginImagesDiv = createDiv('');

    loginImagesDiv.appendChild(createImage('/frontend/assets/login/google.svg', 'google'));
    loginImagesDiv.appendChild(createImage('/frontend/assets/login/github.svg', 'github'));

    loginOtherDiv.appendChild(loginImagesDiv);
    contentLoginDiv.appendChild(loginOtherDiv);
    contentLoginDiv.appendChild(createRegisterForm());
    leftSideDiv.appendChild(contentLoginDiv);

    const rightSideDiv = createDiv('right_side');

    loginPageDiv.appendChild(leftSideDiv);
    loginPageDiv.appendChild(rightSideDiv);

    document.body.appendChild(loginPageDiv);
}

function createRegisterForm() {
    const form = document.createElement('form');
    form.action = '#';
    form.method = 'post';

    form.appendChild(createInput('text', 'first_name', 'First name'));
    form.appendChild(createInput('text', 'last_name', 'Last name'));
    form.appendChild(createInput('text', 'username', 'Username'));
    const ageInput = createInput('number', 'age', 'Age');
    ageInput.min = '1';
    ageInput.max = '100';
    form.appendChild(ageInput);
    form.appendChild(createInput('email', 'email', 'Email'));
    form.appendChild(createInput('password', 'password', 'Password'));

    const submitButton = document.createElement('input');
    submitButton.className = 'btn-submit';
    submitButton.type = 'submit';
    submitButton.value = 'REGISTER';
    submitButton.name = 'register';
    form.appendChild(submitButton);

    return form;
}

