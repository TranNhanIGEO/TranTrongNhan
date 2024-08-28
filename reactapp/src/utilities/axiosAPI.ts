import axios from "axios";

export const axiosAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: { "Content-Type": "multipart/form-data" },
});
