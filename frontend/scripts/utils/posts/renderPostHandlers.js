import { commentPostHandler } from "../commentPost/commentHandler.js";
import { RenderCommentHtml, createCommentDiv } from "../commentPost/commentPost.js";
import { gestionNavigation, userId } from "../gestionRouter/Routers.js";
import { handleLikePost } from "../likesPost/likePosts.js";
import { createSound, playSound } from "../utils.js";

export const RenderPostHandlers = async (urlApi, isReg = false) => {
  try {
    const response = await fetch(urlApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status) {
      const posts = data.posts;

      DisplayUsers(data.allUsers, data.user.Id);

      if (isReg) {
        return;
      }

      let fullName = document.querySelector(".userFullNameConnect");
      let userName = document.querySelector(".userNameConnect");

      if (fullName != null) {
        fullName.textContent = data.user.FirstName + " " + data.user.LastName;
      }

      if (userName != null) {
        userName.textContent = "@" + data.user.UserName;
      }

      userId.IdSender = data.user.Id;

      if (posts != null) {
        for (const post of posts) {
          await new Promise(resolve => setTimeout(() => {
            AddPost(post, data);
            resolve();
          }, 200));
        }
      }
    } else {
      alert("COOL");
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
};

export const DisplayUsers = (users, currentUserId) => {
  let onlineUsersDiv = document.querySelector(".online")
  if (users != null && onlineUsersDiv != null) {
    onlineUsersDiv.innerHTML = ""
    users.forEach((user) => {
      if (user.Id != currentUserId) {
        var divInfoOnline = document.createElement("div");
        divInfoOnline.className = "info_online";
        divInfoOnline.classList.add("info_online" + user.Id);
        if (user.IsOnline == true) {
          divInfoOnline.classList.add("info_onlineC");
        } else {
          divInfoOnline.classList.add("info_onlineD");
        }

        var imgOnlineProfil = document.createElement("img");
        imgOnlineProfil.className = "online_profil";
        imgOnlineProfil.src = "/frontend/assets/profilibg.jpg";
        imgOnlineProfil.alt = "profil";

        var h4UserNameOnline = document.createElement("h4");
        h4UserNameOnline.className = "user_name_online";
        h4UserNameOnline.innerHTML = user.FirstName + " " + user.LastName + ` <span class = "userNameConnect">@${user.UserName} </span>`;

        divInfoOnline.appendChild(imgOnlineProfil);
        divInfoOnline.appendChild(h4UserNameOnline);

        onlineUsersDiv.appendChild(divInfoOnline);

        divInfoOnline.addEventListener("click", async function () {
          window.history.pushState({}, "", "/messages");
          await gestionNavigation("/messages");

          let userMsg = document.querySelector(".message-list" + user.Id);
          // if (userMsg) {
          userMsg.click();
          // }
        });

      }
    })
  }

}
export const AddPost = (post, data, invert = false) => {

  const mainDiv = document.querySelector(".main");

  const postDiv = document.createElement("div");
  postDiv.classList.add("post_div");

  const postDivTop = document.createElement("div");
  postDivTop.classList.add("post_div_top");

  const headerPost = document.createElement("div");
  headerPost.classList.add("header_post");

  const infoPost = document.createElement("div");
  infoPost.classList.add("info_post");

  const profil = document.createElement("img");
  profil.src = "/frontend/assets/profilibg.jpg";

  const userNamePost = document.createElement("h3");
  userNamePost.classList.add("user_name_post");
  const usernamePost = document.createElement("span");
  usernamePost.classList.add("username_post");
  if (invert) {
    userNamePost.textContent = data.user.FirstName + " " + data.user.LastName;
    usernamePost.textContent = "@" + data.user.UserName;
  }
  else {
    userNamePost.textContent = post.User.FirstName + " " + post.User.LastName;
    usernamePost.textContent = "@" + post.User.UserName;
  }

  const titlePost = document.createElement("h4");
  titlePost.classList.add("title_post");
  titlePost.textContent = post.Title;

  const imgPost = document.createElement("img");
  imgPost.classList.add("img_post");
  if (post.Media != "")
    imgPost.src = "/frontend/assets/upload/" + post.Media;

  let footer_post = FooterPosts(post, data);
  infoPost.appendChild(profil);
  infoPost.appendChild(userNamePost);
  infoPost.appendChild(usernamePost);
  headerPost.appendChild(infoPost);
  headerPost.appendChild(titlePost);
  postDivTop.appendChild(headerPost);
  postDivTop.appendChild(imgPost);
  postDiv.appendChild(postDivTop);
  postDiv.appendChild(footer_post);

  let commentDiv = createCommentDiv(post.Id, post.Comments, data.user.Id)
  postDiv.appendChild(commentDiv);
  if (mainDiv) {
    if (!invert) {
      mainDiv.appendChild(postDiv);
    } else {
      let createPostDiv = document.querySelector(".create_post");
      mainDiv.insertBefore(postDiv, createPostDiv.nextSibling);
    }
  }


  commentPostHandler(post.Id)
}

const FooterPosts = (post, data) => {
  const footerPostDiv = document.createElement("div");
  footerPostDiv.classList.add("footer_post");

  const likePostDiv = document.createElement("button");
  likePostDiv.className = "like_post";
  // likePostDiv.id = postID
  // likePostDiv.id = postId.toString;
  likePostDiv.value = "Like";

  likePostDiv.onclick = function () {
    createSound("like.wav")
    playSound()
    handleLikePost(this.value, post.Id, data.user.Id);
  };

  const likeIcon = document.createElement("img");
  likeIcon.className = "like-img" + post.Id + "post"

  if (post.IsLiked == true) {
    likeIcon.src = "/frontend/assets/icons/like.png";
  } else {
    likeIcon.src = "/frontend/assets/icons/likew.png";
  }
  likeIcon.alt = "";
  likeIcon.setAttribute("srcset", "");

  const likeCountSpan = document.createElement("span");
  likeCountSpan.className = "like-span" + post.Id + "post"
  likeCountSpan.textContent = post.Nbrlikes;

  likePostDiv.appendChild(likeIcon);
  likePostDiv.appendChild(likeCountSpan);

  footerPostDiv.appendChild(likePostDiv);

  const dislikePostDiv = document.createElement("button");
  dislikePostDiv.classList = "like_post";
  dislikePostDiv.value = "Dislike";

  dislikePostDiv.onclick = function () {
    createSound("dislike.wav")
    playSound()
    handleLikePost(this.value, post.Id, data.user.Id);
  };

  const dislikeIcon = document.createElement("img");
  dislikeIcon.className = "dislike-img" + post.Id + "post"
  if (post.IsDisliked == true) {
    dislikeIcon.src = "/frontend/assets/icons/dislike.png";
  } else {
    dislikeIcon.src = "/frontend/assets/icons/dislikew.png";
  }
  dislikeIcon.alt = "";
  dislikeIcon.setAttribute("srcset", "");

  const dislikeCountSpan = document.createElement("span");
  dislikeCountSpan.className = "dislike-span" + post.Id + "post"
  dislikeCountSpan.textContent = post.NbrDislikes;

  dislikePostDiv.appendChild(dislikeIcon);
  dislikePostDiv.appendChild(dislikeCountSpan);

  footerPostDiv.appendChild(dislikePostDiv);

  const commentPostDiv = document.createElement("button");
  commentPostDiv.classList.add("comment_post");

  commentPostDiv.onclick = function () {
    RenderCommentHtml(post.Id)
  };

  const commentIcon = document.createElement("img");
  commentIcon.src = "/frontend/assets/icons/comment.png";
  commentIcon.alt = "";
  commentIcon.setAttribute("srcset", "");

  const commentCountSpan = document.createElement("span");
  commentCountSpan.className = "comment-span" + post.Id
  if (post.Comments != null) {
    commentCountSpan.textContent = post.Comments.length;
  } else {
    commentCountSpan.textContent = 0;
  }

  commentPostDiv.appendChild(commentIcon);
  commentPostDiv.appendChild(commentCountSpan);

  footerPostDiv.appendChild(commentPostDiv);
  return footerPostDiv;
};

