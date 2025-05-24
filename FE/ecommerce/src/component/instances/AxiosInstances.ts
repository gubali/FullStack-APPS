import axios from "axios";
import { BASE_URL_P, BASE_URL_U } from "../constant/Constant";

export const axiosIstancesU = axios.create({
  baseURL: BASE_URL_U,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosIstancesP = axios.create({
  baseURL: BASE_URL_P,
  headers: {
    "Content-Type": "application/json",
  },
});
