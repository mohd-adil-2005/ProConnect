import axios from "axios"

  export const BASE_URL= "https://pro-connect0.onrender.com/";
  export const clientServer= axios.create({
    baseURL:BASE_URL,
});
