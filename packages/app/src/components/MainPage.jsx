import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';
import ImageSlideEditModal from './ImageSlideEditModal';
import TopNavBar from './TopNavBar';
import { useNavigate } from 'react-router-dom';
import { postInitNoticeInfo, getNoticeInfos } from '../apis/APIs';
import logo from '../images/oticon-logo.png';
import { useRecoilState } from 'recoil';
import { atomIsLogin } from '../recoils';

const MainPage = () => {
  const [editImageSlideModalOpened, setEditImageSlideModalOpened] = useState(false);
  const [imageInfos, setImageInfos] = useState(Array);
  const [imageCurrentNo, setImageCurrentNo] = useState(1);
  const [isLogin, setIsLogin] = useRecoilState(atomIsLogin);
  const navigate = useNavigate();

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
      <LogoWrapper>
        <LogoImg src={logo} onClick={() => navigate('/')} />
      </LogoWrapper>
      <TopNavBar></TopNavBar>
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
        visibleEditImageSlide={visibleEditImageSlide}
        isLogin={isLogin}
      ></ImageSlide>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  padding-top: 50px;
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  /* background-color: aqua; */
  object-fit: cover;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  height: auto;
  width: auto;
  vertical-align: middle;
  cursor: pointer;
`;

export default MainPage;
