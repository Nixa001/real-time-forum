import { fetchData } from "../fetchData/fetchData.js";

export const LoginHandler = () => {
  const urlApi = "http://localhost:9000/api/login";
  let elems = document.querySelector(".form_login");
  let e = "submit";
  if (elems !=null) {
    fetchData(elems, e, urlApi)
  }
};
