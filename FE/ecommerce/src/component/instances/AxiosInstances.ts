import axios from "axios";
import { BASE_URL_D, BASE_URL_U } from "../constant/Constant";

export const axiosIstancesU = axios.create({
  baseURL: BASE_URL_U,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosIstancesD = axios.create({
  baseURL: BASE_URL_D,
  headers: {
    "Content-Type": "application/json",
  },
});
