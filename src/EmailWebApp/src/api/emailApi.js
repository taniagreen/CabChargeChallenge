import axios from 'axios';

export default function postMessage(message) {
  return axios.post('api/email', message);
}
