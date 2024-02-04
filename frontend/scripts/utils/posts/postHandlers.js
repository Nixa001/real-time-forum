import { fetchData } from "../fetchData/fetchData.js";

export const post = () => {
  const urlApi = "http://localhost:9000/api/post";

  let elems = document.querySelector(".form_post");
  let e = "submit";
  if (elems !=null) {
    fetchData(elems, e, urlApi)
  }
};
