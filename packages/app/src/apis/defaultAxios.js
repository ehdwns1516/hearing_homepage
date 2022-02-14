import axios from 'axios';

const client = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: 'http://13.125.116.14:3001/api',
});

client.interceptors.request.use(function (config) {
  const admin = sessionStorage.getItem('admin');
  if (!admin) {
    config.headers['x-access-token'] = null;
    return config;
  }
  const accessToken = JSON.parse(admin);
  config.headers['x-access-token'] = accessToken;
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      // error.response.request.responseURL !== 'http://localhost:3001/api/admin/login'
      error.response.request.responseURL !== 'http://13.125.116.14:3001/api/admin/login'
    ) {
      sessionStorage.removeItem('admin');
      sessionStorage.removeItem('isLogin');
      alert('로그인이 만료되었습니다. 다시 로그인하세요.');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default client;
