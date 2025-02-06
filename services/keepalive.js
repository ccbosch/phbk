import axios from "axios";

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

}

export function keepAlive() {
  setInterval(() => myself.post('/keep-alive'), alive);
}