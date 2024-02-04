import { Entity } from "../pageEntity.js";

export class RenderHtmlRegister extends Entity {
    constructor() {
        super();
        this.setTitle("Register");
    }
    getHtml() {
        return `
        <div class="login_page">
        <div class="left_side">
            <div class="header_login"><img src="/frontend/assets/login/github.svg" alt="logo">
                <p class="text_header_login">You have already an account? <a class="navbar_link navbar_link_signIn"> <span>Sign In
                            !</span></a><a></a>
                </p>
            </div>
            <div class="content_login">
                <h1>Sign Up</h1>
                <div class="login_other">
                    <h4>Login in to account</h4>
                    <div class=""><img src="/frontend/assets/login/google.svg" alt="google"><img
                            src="/frontend/assets/login/github.svg" alt="github"></div>
                </div>
                <form action="#" method="post" class="form_register">
                    <input type="text" name="first_name" placeholder="First name" class="input-field">
                    <input type="text" name="last_name" placeholder="Last name" class="input-field">
                    <input type="text" name="username" placeholder="Username" class="input-field">
                    <input type="number" name="age" placeholder="Age" class="input-field" min="1" max="100">
                    <input type="email" name="email" placeholder="Email" class="input-field">
                    <select name="sexe" id="" class="input-field">
                        <option value="m">M</option>
                        <option value="f">F</option>
                    </select>
                    <input type="password" name="password" placeholder="Password" class="input-field">
                    <input class="btn-submit" type="submit" value="REGISTER" name="register">
                </form>
            </div>
        </div>
        <div class="right_side"></div>
    </div>
        `;
    }
}
