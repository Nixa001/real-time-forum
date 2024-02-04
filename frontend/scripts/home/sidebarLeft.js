export function RenderSidebarLeft() {
    return `<div class="profil">
    <img src="/frontend/assets/profil.jpg" alt="" srcset="">
    <h2 class="userFullNameConnect"></h2>
    <span class="userNameConnect"></span>
</div>

<div class="navbar">
    <div class="home navbar_link" data-link data-href="/home">
        <img src="/frontend/assets/icons/homew.svg" alt="" srcset="">
        <h3>Home</h3>
    </div>
    <div class="messages navbar_link" data-link data-href="/messages">
        <img src="/frontend/assets/icons/messagew.png" alt="" srcset="" style="color: #fff;">
        <h3>Messages</h3>
    </div>
    <div class="notifications navbar_link" data-link data-href="/notifications">
        <img src="/frontend/assets/icons/notificationw.png" alt="" srcset="">
        <h3>Notifications</h3>
    </div>
    <div class="profile navbar_link" data-link data-href="/profile">
        <img src="/frontend/assets/icons/userw.png" alt="" srcset="">
        <h3>Profile</h3>
    </div>
    <div class="connect navbar_link" data-link data-href="/logout">
        <img src="/frontend/assets/icons/logout.png" alt="" srcset="">
        <h3>Logout</h3>
    </div>
</div>

        `;

}
