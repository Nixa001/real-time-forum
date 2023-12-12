import { renderSidebarLeft } from "./sidebarLeft.js";
import { renderSidebarRight } from "./sidebarRight.js";

export function renderMainBody() {
  const sidebarRight = renderSidebarRight();
  const mainBody = `
        <main class="main_body">
            <div class="main">
                <div class="post_div">
                    <div class="header_post">
                        <div class="info_post">
                            <img src="/views/assets/profil.jpg" alt="profil" srcset="">
                            <h3 class="user_name_post">Nicolas Faye</h3>
                            <span class="username_post">@nixa001</span>
                        </div>
                        <h4 class="title_post">Lorem ipsum dolor sit, amet consectetur adipisic ingamet consectetur
                            adipisicing elit.
                            Voluptate, aspernatur. Dolorum, impedit. Modi, beataes</h4>
                    </div>
                    <div class="img_post"><img src="/views/assets/imagepost2.jpg" alt="" srcset=""></div>
                    <div class="footer_post">
                        <div class="like_post"><img src="/views/assets/icons/likew.png" alt="" srcset=""><span>320</span>
                        </div>
                        <div class="dislike_post"><img src="/views/assets/icons/dislikew.png" alt=""
                                srcset=""><span>17</span>
                        </div>
                        <div class="comment_post"><img src="/views/assets/icons/comment.png" alt=""
                                srcset=""><span>110</span></div>
                    </div>
                </div>
                <div class="post_div">
                    <div class="header_post">
                        <div class="info_post">
                            <img src="/views/assets/profilibg.jpg" alt="profil" srcset="">
                            <h3 class="user_name_post">Ibrahima Gueye</h3>
                            <span class="username_post">@ibg</span>
                        </div>
                        <h4 class="title_post">Lorem ipsum dolor sit, amet consectetur adipisic ingamet consectetur
                            adipisicing elit.
                            Voluptate, aspernatur. Dolorum, impedit. Modi, beataes</h4>
                    </div>
                    <div class="img_post"><img src="/views/assets/imagepost.jpg" alt="" srcset=""></div>
                    <div class="footer_post">
                        <div class="like_post"><img src="/views/assets/icons/likew.png" alt="" srcset=""><span>320</span>
                        </div>
                        <div class="dislike_post"><img src="/views/assets/icons/dislikew.png" alt=""
                                srcset=""><span>17</span>
                        </div>
                        <div class="comment_post"><img src="/views/assets/icons/comment.png" alt=""
                                srcset=""><span>110</span></div>
                    </div>
                </div>
            </div>
          </form>
        </div>
  
        <div class="post_div">
          <div class="header_post">
            <div class="info_post">
              <img src="/views/assets/profil.jpg" alt="profil" srcset="">
              <h3 class="user_name_post">Nicolas Faye</h3>
              <span class="username_post">@nixa001</span>
            </div>
            <h4 class="title_post">Lorem ipsum dolor sit, amet consectetur adipisic ingamet consectetur
              adipisicing elit.
              Voluptate, aspernatur. Dolorum, impedit. Modi, beataes</h4>
          </div>
          <div class="img_post"><img src="/views/assets/imagepost2.jpg" alt="" srcset=""></div>
          <div class="footer_post">
            <div class="like_post"><img src="/views/assets/icons/likew.png" alt="" srcset=""><span>320</span>
            </div>
            <div class="dislike_post"><img src="/views/assets/icons/dislikew.png" alt="" srcset=""><span>17</span>
            </div>
            <div class="comment_post"><img src="/views/assets/icons/comment.png" alt="" srcset=""><span>110</span></div>
          </div>
        </div>
        <div class="post_div">
          <div class="header_post">
            <div class="info_post">
              <img src="/views/assets/profilibg.jpg" alt="profil" srcset="">
              <h3 class="user_name_post">Ibrahima Gueye</h3>
              <span class="username_post">@ibg</span>
            </div>
            <h4 class="title_post">Lorem ipsum dolor sit, amet consectetur adipisic ingamet consectetur
              adipisicing elit.
              Voluptate, aspernatur. Dolorum, impedit. Modi, beataes</h4>
          </div>
          <div class="img_post"><img src="/views/assets/imagepost.jpg" alt="" srcset=""></div>
          <div class="footer_post">
            <div class="like_post"><img src="/views/assets/icons/likew.png" alt="" srcset=""><span>320</span>
            </div>
            <div class="dislike_post"><img src="/views/assets/icons/dislikew.png" alt="" srcset=""><span>17</span>
            </div>
            <div class="comment_post"><img src="/views/assets/icons/comment.png" alt="" srcset=""><span>110</span></div>
          </div>
        </div>
      </div>
      </div>
        ${sidebarRight}
    </main>
    `;

  return mainBody;
}
