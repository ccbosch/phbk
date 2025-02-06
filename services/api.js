//import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config = {
  baseURL: 'https://allin-api.doinsport.club/clubs',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(config);
export default instance;
