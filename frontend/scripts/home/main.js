import { Entity } from "../pageEntity.js";
import { RenderSidebarRight } from "./sidebarRight.js";

export class RenderMainBody extends Entity {
  constructor() {
    super();
    this.setTitle("Home");
  }
  getHtml() {
    return (
      `
        <div class="main">
            <div class="create_post create_poste">
                <form class="form_post" action="" method="POST" data-form="post"  enctype=multipart/form-data>
                    <textarea class="title_post" name="title_post" placeholder="Let's post something ..." required></textarea>
                    <div class="send_post">


                        
                    <div class="checkbox__wrapper">
                    <div>
                        <input type="checkbox" id="check" value="technologie" name="techno" />
                        <label for="check">Tech</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checks" value="sport" name="sport" />
                        <label for="checks">Sport</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkS" value="sante" name="sante" />
                        <label for="checkS">Sante</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkM" value="musique" name="music" />
                        <label for="checkM">Musique</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checkN" value="news" name="news" />
                        <label for="checkN">News</label>
                    </div>
                    <div>
                        <input type="checkbox" id="checko" value="other" name="other" checked />
                        <label for="checko">Other</label>
                    </div>
                </div>

                        <label for="image_post" class="upload_image material-symbols-outlined">image</label>
                        <input type="file" name="image_post" id="image_post" hidden>
                        <input class="submit_post material-icons" type="submit" value="send">
                    </div>
                </form>
            </div>
            <div class="post_div_top">
                
            </div>
                
        </div>` + RenderSidebarRight()
    );
  }

}

