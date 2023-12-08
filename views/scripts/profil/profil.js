
export function renderProfil() {
    const profil = `
    <div class="profilDiv">
      <div class="headerProfil">
        <div class="profilImage" style="background: url(/views/assets/cover.png);background-size: cover;">
          <img src="/views/assets/profil.jpg" alt="" srcset="" />
        </div>
      </div>
      <div class="info_user">
        <h2>Nicolas Faye<span>@Nixa001</span></h2>
        <div class="editProfil"><img src="/views/assets/icons/edit.png" alt="" srcset=""></div>
      </div>
      <div class="details_user">
        <h2>About Me</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptas nesciunt possimus ratione ullam
          modi, recusandae fugiat. Dolorem tempore placeat assumenda dolore ipsum, natus adipisci iste cumque, voluptatum
          inventore quibusdam.</p>
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
    </div>
        `
    return profil
}