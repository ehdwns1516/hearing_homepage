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
import naver_blog from '../images/naver-blog.png';
import NHIS from '../images/NHIS.jpeg';

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
            carousel_config={{ width: 1195, height: 530 }}
          />
        ) : null}
        <Carousel
          imageInfos={imageInfos}
          imageCurrentNo={imageCurrentNo}
          setImageCurrentNo={setImageCurrentNo}
          visibleEditCarousel={visibleEditCarousel}
          isLogin={isLogin}
          carousel_config={{ width: 1195, height: 530 }}
          autoSlideTime={7}
          editCarouselModalOpened={editCarouselModalOpened}
        ></Carousel>

        <RowContents>
          <CenterSummary
            src={center_summary}
            onClick={() => navigate('/센터소개/센터약력')}
          ></CenterSummary>
          <HowToCome>
            <HowToComeLink
              onClick={() => {
                window.open(
                  'https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=,,500375,1046319&rt1=&rt2=%EB%8D%B4%EB%A7%88%ED%81%AC%EC%98%A4%ED%8B%B0%EC%BD%98%EB%B3%B4%EC%B2%AD%EA%B8%B0%20%EC%88%98%EC%9B%90%EC%A0%90&rtIds=,12510627',
                  '_blank'
                );
              }}
            >
              빠른 길찾기
            </HowToComeLink>
            <Map id='map'>
              <KakaoMap></KakaoMap>
            </Map>
          </HowToCome>
        </RowContents>
        <RowContents>
          <CallInfo src={call_info}></CallInfo>
          <LinkWrapper>
            <LinkInfo>
              <LinkImg
                src={naver_blog}
                onClick={() => {
                  window.open(
                    'https://blog.naver.com/PostList.naver?blogId=sds00519&from=postList&categoryNo=52',
                    '_blank'
                  );
                }}
              ></LinkImg>
              <LinkText
                onClick={() => {
                  window.open(
                    'https://blog.naver.com/PostList.naver?blogId=sds00519&from=postList&categoryNo=52',
                    '_blank'
                  );
                }}
              >
                블로그 바로가기
              </LinkText>
            </LinkInfo>
            <LinkInfo>
              <LinkImg
                src={NHIS}
                onClick={() => {
                  window.open(
                    'https://blog.naver.com/PostList.naver?blogId=sds00519&from=postList&categoryNo=14',
                    '_blank'
                  );
                }}
              ></LinkImg>
              <LinkText
                onClick={() => {
                  window.open(
                    'https://blog.naver.com/PostList.naver?blogId=sds00519&from=postList&categoryNo=14',
                    '_blank'
                  );
                }}
              >
                보청기 보험급여
                <br />
                제도 안내
              </LinkText>
            </LinkInfo>
          </LinkWrapper>
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  margin-bottom: 5px;
`;

const RowContents = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CenterSummary = styled.img`
  width: 50%;
  height: 400px;
  border: 1px solid grey;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
`;

const HowToCome = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  border-left: none;
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
`;

const CallInfo = styled.img`
  width: 50%;
  height: 250px;
  cursor: pointer;
  border: 1px solid grey;
  border-top: none;
  border-right: none;
`;

const LinkWrapper = styled.div`
  width: 50%;
  height: 250px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-top: none;
`;

const LinkInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkImg = styled.img`
  position: relative;
  top: 40px;
  width: 50%;
  height: 50%;
  display: block;
  border-radius: 100px;
  cursor: pointer;
`;

const LinkText = styled.div`
  position: relative;
  top: 40px;
  width: 50%;
  height: auto;
  margin-top: 10px;
  line-height: 25px;
  font-size: 22px;
  color: grey;
  font-weight: bold;
  cursor: pointer;
`;
export default MainPage;
