import { fetchData } from "../fetchData/fetchData.js";
import { createSound, playSound } from "../utils.js";

export const commentPostHandler = (postID) => {
  const urlApi = "https://real-time-forum-w85u.onrender.com/api/comments";
  let elems = document.querySelector(".commentSender" + postID);
  let e = "submit";
  if (elems != null) {
    fetchData(elems, e, urlApi, postID);
  }
};
