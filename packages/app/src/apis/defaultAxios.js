import axios from 'axios';
axios.defaults.baseURL = 'http://13.125.116.14:3001/api'; // 배포 url
// axios.defaults.baseURL = 'http://localhost:3001/api'; // local url
// axios.defaults.withCredentials = true;

export default axios;
