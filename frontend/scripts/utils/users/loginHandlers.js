import { fetchData } from "../fetchData/fetchData.js";

export const LoginHandler = () => {
  const urlApi = "https://real-time-forum-w85u.onrender.com/api/login";
  let elems = document.querySelector(".form_login");
  let e = "submit";
  if (elems != null) {
    fetchData(elems, e, urlApi);
  }
};
