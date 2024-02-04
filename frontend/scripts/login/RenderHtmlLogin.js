import { Entity } from "../pageEntity.js";

export class RenderHtmlLogin extends Entity {
  constructor() {
    super();
    this.setTitle("Login");
  }

  getHtml() {
    return `
        <div class="login_page">
        <div class="left_side">
            <div class="header_login"><img src="/frontend/assets/login/github.svg" alt="logo">
                <text_header_login>Don't have an account? <a  class="navbar_link navbar_link_signUp"><span>Sign Up !</span></a></text_header_login>
            </div>
            <div class="content_login">
                <h1>Welcome Back</h1>
                <div class="login_other">
                    <h4>Login in to account</h4>
                    <div class=""><img src="/frontend/assets/login/google.svg" alt="google"><img src="/frontend/assets/login/githubb.svg" alt="github"></div>
                </div>
                <p class="error_login_msg"></p>
                <form  class="form_login" method="POST" data-form="login">
                    <input type="text" id="email" name="email" placeholder="Email or Username" class="input-field email">
                    <input type="password" id="password" name="password" placeholder="Password" class="input-field password">
                    <input class="btn-submit btn-submit_login" type="submit" value="LOG IN">
                </form>
            </div>
        </div>
        <div class="right_side"></div>
    </div>
    `;
  }
}
