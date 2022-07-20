import axios from './defaultAxios';

export const postAdminLogin = (ID, PW) => {
  return axios.post('/admin/login', {
    data: {
      id: ID,
      password: PW,
    },
  });
};

export const postUploadImagesToS3 = (data) => {
  return axios.post('/upload/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postInitDetailPage = (subMenu) => {
  return axios.post(`/detail/${subMenu}/images`);
};

export const getDetailPageImages = (subMenu) => {
  return axios.get(`/detail/${subMenu}/images`);
};

export const putDetailPageImages = (subMenu, contentURLs) => {
  return axios.put(`/detail/${subMenu}/images`, {
    data: {
      imageURLs: contentURLs,
    },
  });
};

export const postInitNoticeInfo = (type) => {
  return axios.post(`/notice/${type}`);
};

export const getNoticeInfos = (type) => {
  return axios.get(`/notice/${type}`);
};

export const putNoticeInfos = (type, infos) => {
  return axios.put(`/notice/${type}`, {
    data: {
      infos: infos,
    },
  });
};
