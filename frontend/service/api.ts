import axios from "axios";
import { parseCookies } from "nookies";

const { "nextauth.token": token } = parseCookies();

export const api = axios.create({
  baseURL: process.env.BACKEND_URL, // url do backend
});

if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

export async function recoverUserInfo() {
  return api.get("/user/me");
}
