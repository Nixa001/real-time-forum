import { fetchData } from "../fetchData/fetchData.js";

export const post = () => {
  const urlApi = "https://real-time-forum-w85u.onrender.com/api/post";

  let elems = document.querySelector(".form_post");
  let e = "submit";
  if (elems != null) {
    fetchData(elems, e, urlApi);
  }
};
