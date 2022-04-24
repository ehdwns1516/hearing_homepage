import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import CarouselEditModal from '../components/CarouselEditModal';
import KakaoMap from '../components/KakaoMap';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';
import { postInitNoticeInfo, getNoticeInfos } from '../apis/APIs';
import { useRecoilState } from 'recoil';
import { atomIsLogin } from '../recoils';
import logo from '../images/oticon-logo.png';
import center_summary from '../images/center-summary.jpeg';
import call_info from '../images/call-info.jpeg';

const MainPage = () => {
  const [editCarouselModalOpened, setEditCarouselModalOpened] = useState(false);
  const [imageInfos, setImageInfos] = useState(Array);
  const [imageCurrentNo, setImageCurrentNo] = useState(0);
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

  const visibleEditCarousel = () => {
    if (editCarouselModalOpened) window.location.reload();
    setEditCarouselModalOpened(!editCarouselModalOpened);
    console.log('object');
  };

  return (
    <WholeWrapper>
      <LogoWrapper>
        <LogoImg src={logo} onClick={() => navigate('/')} />
      </LogoWrapper>
      <TopNavBar></TopNavBar>
      <ContentsWrapper>
        {editCarouselModalOpened ? (
          <CarouselEditModal
            visibleEditCarousel={visibleEditCarousel}
            imageInfos={imageInfos}
            imageCurrentNo={imageCurrentNo}
            setImageCurrentNo={setImageCurrentNo}
          />
        ) : null}
        <Carousel
          imageInfos={imageInfos}
          imageCurrentNo={imageCurrentNo}
          setImageCurrentNo={setImageCurrentNo}
          visibleEditCarousel={visibleEditCarousel}
          isLogin={isLogin}
        ></Carousel>

        <RowContents>
          <CenterSummary
            src={center_summary}
            onClick={() => navigate('/센터소개/센터약력')}
          ></CenterSummary>
          <HowToCome>
            <HowToComeLink onClick={() => navigate('/오시는길/오시는길')}>
              오시는 길
            </HowToComeLink>
            <Map id='map'>
              <KakaoMap></KakaoMap>
            </Map>
          </HowToCome>
        </RowContents>
        <RowContents>
          <CallInfo src={call_info}></CallInfo>
          <LinkInfo></LinkInfo>
        </RowContents>
      </ContentsWrapper>
      <Footer />
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  padding-top: 10px;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
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

const ContentsWrapper = styled.div`
  height: auto;
  min-height: calc(100vh - 275px);
  width: 1200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 5px;
`;

const RowContents = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: wheat;
`;

const CenterSummary = styled.img`
  width: 50%;
  height: 400px;
  border: 1px solid grey;
  border-top: none;
  border-bottom: none;
  background-color: white;
  cursor: pointer;
`;

const HowToCome = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: column;
  /* background-color: black; */
`;

const HowToComeLink = styled.div`
  width: 100%;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  text-align: left;
  padding-left: 20px;
  line-height: 50px;
  cursor: pointer;
  border: 0px;
  background-color: #b4338a;

  :hover {
    background-color: #892e6c;
  }
`;

const Map = styled.div`
  width: 100%;
  height: 350px;
  /* background-color: black; */
`;

const CallInfo = styled.img`
  width: 50%;
  height: 250px;
  border: 1px solid grey;
  border-top: none;
  /* border-bottom: none; */
  background-color: white;
  cursor: pointer;
`;

const LinkInfo = styled.div`
  width: 50%;
  height: 250px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-top: none;
  background-color: black;
`;
export default MainPage;
