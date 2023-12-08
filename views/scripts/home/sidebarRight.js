export function renderSidebarRight() {
    const sidebarRight = `
    
    <div class="sidebar_right sidebar">
        <div class="messages">
            <h3>Last messages</h3>
            <div class="user_message">
                <img class="message" src="/views/assets/profilibg.jpg" alt="profil" srcset="">
                <div class="name_message_div">
                    <h4 class="user_name_post">Ibrahima Gueye</h4>
                    <p class="user_name_message">Lorem ipsum dolor sit</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="online">
            <h3>Online contacts</h3>
            <div class="info_online">
                <img class="online_profil" src="/views/assets/profilibg.jpg" alt="profil" srcset="">
                <h4 class="user_name_online">Ibrahima Gueye</h4>
            </div>
        </div>
    </div>
`
    return sidebarRight
}