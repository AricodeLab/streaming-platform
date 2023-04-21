import axios from "axios";
import { parseCookies } from "nookies";

const cokkies = parseCookies();

export const api = axios.create({
  baseURL: "https://8b32-186-49-44-203.ngrok-free.app/",
  withCredentials: true,
});
const { Authentication: token } = cokkies;
if (token) api.defaults.headers.Authorization = `${token}`;

export async function recoverUserInfo(cokkies?) {
  if (cokkies) {
    const { Authentication: token } = cokkies;
    if (token) api.defaults.headers.Authorization = `${token}`;
  }

  return api.get("/users/me", {
    headers: {
      Cookie: `Authentication=${cokkies.Authentication}`
    },
  });
}
