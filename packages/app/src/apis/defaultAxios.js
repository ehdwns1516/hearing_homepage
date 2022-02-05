import axios from 'axios';
axios.defaults.baseURL = 'http://13.124.144.188:3001/api'; // 배포 url
// axios.defaults.baseURL = 'http://localhost:3001/api'; // local url
// axios.defaults.withCredentials = true;

export default axios;
