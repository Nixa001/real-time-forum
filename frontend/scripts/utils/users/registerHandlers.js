import { fetchData } from "../fetchData/fetchData.js";

export const RegisterHandlers = () => {
  const url = "https://real-time-forum-w85u.onrender.com/api/register";
  const elems = document.querySelector(".form_register");
  const e = "submit";
  if (elems != null) {
    fetchData(elems, e, url);
  }
};
