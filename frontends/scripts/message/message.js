export function renderHtmlMessages() {
    const messages = `
    <div class="container container_messages">
    <div class="content-left">
        <div class="message-top">
            <h2>Messages</h2>
            <input type="text" class="search" placeholder="Search message">
            <input type="button" value="+ New Chat" class="tnt-submit">
            <div class="all_messages">

                <div class="message-list">
                    <img src="/views/assets/profilibg.jpg" alt="" srcset="">
                    <div class="content-users-message">
                        <div class="name-time">
                            <h2>Moi</h2>
                            <span class="time">30s</span>
                        </div>
                        <p>Je suis la</p>
                    </div>
                </div>
                <div class="message-list">
                    <img src="/views/assets/profil.jpg" alt="" srcset="">
                    <div class="content-users-message">
                        <div class="name-time">
                            <h2>Nixa</h2>
                            <span class="time">20s</span>
                        </div>
                        <p>Bonjour mon gars je t'es la</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-right">
        <div class="content-right-top">
            <img src="/views/assets/profilibg.jpg" alt="" srcset="">
            <div class="content-users-connected">
                <h2>Ibg</h2>
                <p>Active</p>
            </div>
        </div>
        <div class="espace-message">
            <div class="receive-message">
                Lorem ipsum dolor sit amet consectetur adipi sicing elit.
            </div>
            <div class="send-message">
                Quae necessitatibus sint est ab qui minus molestiae harum porro, natus molestias, hic quibusdam
                tempore ullam voluptas iure ratione ipsum impedit quasi.
            </div>
        </div>
        <div class="content-right-bottom">
            <div class="create_post">
                <form class="form_post" action="/post">
                    <textarea class="title_post" placeholder="Your message ..."></textarea>
                    <div class="send_post">
                        <label for="image_post" class="upload_image material-symbols-outlined">image</label>
                        <input type="file" name="image_post" id="image_post" hidden>
                        <input class="submit_post material-icons" type="submit" value="send">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`
    return messages
}