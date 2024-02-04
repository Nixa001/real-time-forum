import { fetchData } from "../fetchData/fetchData.js";

export const RegisterHandlers = () => {
  const url = "http://localhost:9000/api/register";
  const elems = document.querySelector(".form_register");
  const e = "submit";
  if (elems !=null) {
    fetchData(elems, e, url)
  }
};
