export const handleLikePost = (
  buttonValue,
  postID,
  userID,
  isLikeComment = false
) => {
  let url = "https://real-time-forum-w85u.onrender.com/api/like";
  if (isLikeComment) {
    url = "https://real-time-forum-w85u.onrender.com/api/likeComment";
  }
  let liked = false;
  if (buttonValue !== "Dislike") {
    liked = true;
  }
  fetchElement(url, postID, userID, liked, isLikeComment);
};

const fetchElement = (url, PostID, UserID, Like, IsLikeComment) => {
  fetch(url, {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      PostID: PostID,
      UserID: UserID,
      Like: Like,
      IsLikeComment: IsLikeComment,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status) {
        likeStatus(data);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la requête:", error);
    });
};

const likeStatus = (data) => {
  let isLikeDiv = document.querySelector(".like-img" + data.TypeLike);
  let isDislikeDiv = document.querySelector(".dislike-img" + data.TypeLike);
  let nbrLikeDiv = document.querySelector(".like-span" + data.TypeLike);
  let nbrDislikeDiv = document.querySelector(".dislike-span" + data.TypeLike);
  if (data.IsLikeComment == true) {
    isLikeDiv = document.querySelector(".likeComment-img" + data.TypeLike);
    isDislikeDiv = document.querySelector(
      ".dislikeComment-img" + data.TypeLike
    );
    nbrLikeDiv = document.querySelector(".likeComment-span" + data.TypeLike);
    nbrDislikeDiv = document.querySelector(
      ".dislikeComment-span" + data.TypeLike
    );
  }

  nbrLikeDiv.innerHTML = data.NbrLike;
  nbrDislikeDiv.innerHTML = data.NbrDislike;

  if (data.IsLike) {
    isLikeDiv.src = "/frontend/assets/icons/like.png";
    isDislikeDiv.src = "/frontend/assets/icons/dislikew.png";
  } else {
    isLikeDiv.src = "/frontend/assets/icons/likew.png";
  }
  if (data.IsDislike) {
    isDislikeDiv.src = "/frontend/assets/icons/dislike.png";
    isLikeDiv.src = "/frontend/assets/icons/likew.png";
  } else {
    isDislikeDiv.src = "/frontend/assets/icons/dislikew.png";
  }
};
