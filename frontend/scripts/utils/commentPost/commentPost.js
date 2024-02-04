import { handleLikePost } from "../likesPost/likePosts.js";
import { createSound, playSound } from "../utils.js";

export const RenderCommentHtml = (postId) => {
    let divComent = document.querySelector('.commentDiv' + postId)
    // let comment = RenderCommentHtml()
    divComent.style.display = 'flex'
}

export const createCommentDiv = (postID, Comments, UserID) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("commentDiv");
    commentDiv.classList.add("commentDiv" + postID);

    const closeButton = document.createElement("button");
    closeButton.onclick = function () {
        Close(postID);
    };

    const closeIcon = document.createElement("img");
    closeIcon.classList.add("close");
    closeIcon.src = "./frontend/assets/icons/close.png";
    closeIcon.alt = "";
    closeIcon.setAttribute("srcset", "");

    closeButton.appendChild(closeIcon);
    commentDiv.appendChild(closeButton);

    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("comments" + postID);
    commentsDiv.classList.add("comments")


    if (Comments != null) {


        Comments.forEach(commentData => {
            AddComment(commentData, commentsDiv, UserID)
        });
    }
    const form = document.createElement("form");
    form.method = "POST";
    form.classList.add("commentSender" + postID);

    const titleInput = document.createElement("input");
    titleInput.classList.add("content_comment" + postID);
    titleInput.type = "text";
    titleInput.name = "content_comment"; // Attribut name pour le champ du commentaire

    const submitButton = document.createElement("input");
    submitButton.classList.add("submit_post", "material-icons");
    submitButton.type = "submit";
    submitButton.value = "send";

    form.appendChild(titleInput);
    form.appendChild(submitButton);

    commentDiv.appendChild(commentsDiv);
    commentDiv.appendChild(form);


    return commentDiv;
};

export const Close = (postId) => {
    let divComment = document.querySelector('.commentDiv' + postId)
    divComment.style.display = 'none';
}

export const AddComment = (commentData, commentsDiv, UserID) => {

    const comment = document.createElement("div");
    comment.classList.add("comment");

    const topContainer = document.createElement("div");
    topContainer.classList.add("topContainer");

    const profileImage = document.createElement("img");
    profileImage.src = "/frontend/assets/profilibg.jpg";
    profileImage.alt = "";
    profileImage.setAttribute("srcset", "");

    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = commentData.NameUser;

    topContainer.appendChild(profileImage);
    topContainer.appendChild(usernameSpan);

    const content = document.createElement("div");
    content.classList.add("content");
    content.textContent = commentData.Content;

    const bottomContainer = document.createElement("div");
    bottomContainer.classList.add("bottomContainer");

    const likeButton = document.createElement("button");


    likeButton.className = "like_comment";
    likeButton.value = "Like";

    likeButton.onclick = function () {
        createSound("like.wav")
        playSound()
        handleLikePost(this.value, commentData.Id, UserID, true);
    };

    const likeIcon = document.createElement("img");
    likeIcon.className = "likeComment-img" + commentData.Id + "comment"

    if (commentData.IsLiked == true) {
        likeIcon.src = "/frontend/assets/icons/like.png";
    } else {
        likeIcon.src = "/frontend/assets/icons/likew.png";
    }
    likeIcon.alt = "";
    likeIcon.setAttribute("srcset", "");
    const likeCountSpan = document.createElement("span");
    likeCountSpan.className = "likeComment-span" + commentData.Id + "comment"
    likeCountSpan.textContent = commentData.Nbrlike;
    likeButton.appendChild(likeIcon);
    likeButton.appendChild(likeCountSpan);

    const dislikeButton = document.createElement("button");
    const dislikeIcon = document.createElement("img");
    dislikeIcon.className = "dislikeComment-img" + commentData.Id + "comment"
    dislikeButton.value = "Dislike";
    dislikeButton.onclick = function () {
        createSound("dislike.wav")
        playSound()
        handleLikePost(this.value, commentData.Id, UserID, true);
    };
    if (commentData.IsDisliked == true) {
        dislikeIcon.src = "/frontend/assets/icons/dislike.png";
    } else {
        dislikeIcon.src = "/frontend/assets/icons/dislikew.png";
    }
    dislikeIcon.alt = "";
    dislikeIcon.setAttribute("srcset", "");
    const dislikeCountSpan = document.createElement("span");
    dislikeCountSpan.className = "dislikeComment-span" + commentData.Id + "comment"
    dislikeCountSpan.textContent = commentData.NbrDislike;
    dislikeButton.appendChild(dislikeIcon);
    dislikeButton.appendChild(dislikeCountSpan);

    bottomContainer.appendChild(likeButton);
    bottomContainer.appendChild(dislikeButton);

    comment.appendChild(topContainer);
    comment.appendChild(content);
    comment.appendChild(bottomContainer);
    commentsDiv.insertBefore(comment, commentsDiv.firstChild);
}