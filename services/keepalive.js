import axios from "axios";
import resa from "./resa.js";

const config = {
  baseURL: 'https://phbk.onrender.com',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

const myself = axios.create(config);
const min = 1000 * 60;
const alive = min * 2;

function sendKeepAlive() {
  resa.find();
  console.log('Sending KA');
  // myself.post('/keep-alive')
}

export function keepAlive() {
  setInterval(() => sendKeepAlive(), alive);
}