import { Entity } from "../pageEntity.js";

export class RenderHtmlMessages extends Entity {
    constructor() {
        super();
        this.setTitle("Messages");
    }

    getHtml() {
        return `
        <div class="content-left">
            <div class="message-top">
                <h2>Messages</h2>
                <input type="text" class="search" placeholder="Search message">
                <input type="button" value="+ New Chat" class="tnt-submit">
                <div class="all_messages">    
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="content-right-top">
                <img src="/frontend/assets/profilibg.jpg" alt="" srcset="">
                <div class="content-users-connected">
                    <h2 class="fullnameUserMsg"></h2>
                   <p class="is_typing"></p>
                </div>
            </div>
            <div class="espace-message">
            </div>
            <div class="content-right-bottom">
                <div class="create_post">
                     <div class="form_post" action="/post">
                        <textarea class="title_post msg_sender_input" placeholder="Your message ..." required=""></textarea>
                        <div class="send_post">
                            <button class="submit_post material-icons" id="sendButton">send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}