import { Entity } from "../pageEntity.js";

export function RenderSidebarRight() {

    return `
        <div class="sidebar_right sidebar">
        <h3>Last messages</h3>
        <div class="messages">
            <div class="user_message">
                <img class="message" src="./frontend/assets/profilibg.jpg" alt="profil" srcset="">
                <div class="name_message_div">
                    <h4 class="user_name_post">Ibou Gueye</h4>
                    <p class="user_name_message">Lorem ipsum dolor sit</p>
                </div>
                </div>

            <div class="user_message">
            <img class="message" src="./frontend/assets/profilibg.jpg" alt="profil" srcset="">

            <div class="name_message_div">
            <h4 class="user_name_post">Nicolas Faye</h4>
            <p class="user_name_message">Lorem ipsum dolor sit</p>
            </div>
            </div>

            <div class="user_message">
            <img class="message" src="./frontend/assets/profilibg.jpg" alt="profil" srcset="">

            <div class="name_message_div">
            <h4 class="user_name_post">Madicke Yade</h4>
            <p class="user_name_message">Lorem ipsum dolor sit</p>
            </div>
            </div>
        </div>
        <hr>
        <h3>All users</h3>
        <div class="online">
        </div>
    </div>
        `;

}
