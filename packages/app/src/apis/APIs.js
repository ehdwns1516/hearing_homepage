import axios from './defaultAxios';

export const postAdminLogin = async (ID, PW) => {
  return await axios.post('/admin/login', {
    data: {
      id: ID,
      password: PW,
    },
  });
};

export const postUploadImagesToS3 = async (data) => {
  return await axios.post('/upload/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postInitDetailPage = async (subMenu) => {
  return await axios.post(`/detail/${subMenu}/images`);
};

export const getDetailPageImages = async (subMenu) => {
  return await axios.get(`/detail/${subMenu}/images`);
};

export const putDetailPageImages = async (subMenu, contentURLs) => {
  return await axios.put(`/detail/${subMenu}/images`, {
    data: {
      imageURLs: contentURLs,
    },
  });
};
