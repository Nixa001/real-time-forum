
export function renderSidebarLeft() {
    const sidebarLeft = `
        <div class="sidebar_left sidebar">
            <div class="profil">
                <img src="/views/assets/profil.jpg" alt="" srcset="">
                <h2>Nicolas Faye</h2>
                <span>@nixa001</span>
            </div>
            <div class="navbar">
                <a href="/" class="home navbar_link">
                    <img src="/views/assets/icons/homew.svg" alt="" srcset="">
                    <h3>Home</h3>
                </a>
                <a href="/" class="messages navbar_link">
                    <img src="/views/assets/icons/messagew.png" alt="" srcset="" style="color: #fff;">
                    <h3>Messages</h3>
                </a>
                <a href="/" class="notifications navbar_link">
                    <img src="/views/assets/icons/notificationw.png" alt="" srcset="">
                    <h3>Notifications</h3>
                </a>
                <a href="/" class="profile navbar_link">
                    <img src="/views/assets/icons/userw.png" alt="" srcset="">
                    <h3>Profile</h3>
                </a>
                <a href="/" class="connect navbar_link">
                    <img src="/views/assets/icons/logout.png" alt="" srcset="">
                    <h3>Logout</h3>
                </a>
            </div>
        </div>
        `
    return sidebarLeft
}