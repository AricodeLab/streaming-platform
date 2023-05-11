import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { ILogin } from "../interfaces";
import { useRouter } from "next/router";

const cokkies = parseCookies();


export const api = axios.create({
  baseURL: "https://8b32-186-49-44-203.ngrok-free.app",
});
const { Authentication: token } = cokkies;
if (token) api.defaults.headers.Authorization = `${token}`;

export async function recoverUserInfo(cokkies?) {
  if (cokkies) {
    const { Authentication: token } = cokkies;
    if (token) api.defaults.headers.Authorization = `${token}`;
  }

  return api.get("https://backend-vx8e.onrender.com/users/me", {
    headers: {
      Cookie: `Authentication=${cokkies.Authentication}`
    },
  });
}



