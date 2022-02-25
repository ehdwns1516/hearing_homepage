import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';
import ImageSlideEditModal from './ImageSlideEditModal';
import { postInitNoticeInfo, getNoticeInfos } from '../apis/APIs';

const MainPage = () => {
  const [editImageSlideModalOpened, setEditImageSlideModalOpened] = useState(false);
  const [imageInfos, setImageInfos] = useState(Array);
  const [imageCurrentNo, setImageCurrentNo] = useState(1);

  useEffect(() => {
    getNoticeInfos('MainPageCarousel')
      .then((res) => {
        setImageInfos(res.data.infos);
      })
      .catch((err) => {
        if (err.response.status === 500)
          postInitNoticeInfo('MainPageCarousel')
            .then((res) => {
              console.log(res);
              return;
            })
            .catch((err) => console.log(err));
      });
  }, []);

  const visibleEditImageSlide = () => {
    if (editImageSlideModalOpened) window.location.reload();
    setEditImageSlideModalOpened(!editImageSlideModalOpened);
  };

  return (
    <WholeWrapper>
      <OpenEditImageSlideButton onClick={visibleEditImageSlide}>
        수정
      </OpenEditImageSlideButton>
      {editImageSlideModalOpened ? (
        <ImageSlideEditModal
          visibleEditImageSlide={visibleEditImageSlide}
          imageInfos={imageInfos}
          imageCurrentNo={imageCurrentNo}
          setImageCurrentNo={setImageCurrentNo}
        />
      ) : null}
      <ImageSlide
        imageInfos={imageInfos}
        imageCurrentNo={imageCurrentNo}
        setImageCurrentNo={setImageCurrentNo}
      ></ImageSlide>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  padding-top: 50px;
  height: 100vh;
  width: 100%vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OpenEditImageSlideButton = styled.button`
  height: 50px;
  width: 100px;
`;

export default MainPage;
