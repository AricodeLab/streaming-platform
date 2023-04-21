import axios from "axios";
import { parseCookies } from "nookies";

const cokkies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3001",
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
