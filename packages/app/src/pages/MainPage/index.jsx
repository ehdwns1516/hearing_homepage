import React, { useState, useEffect, useCallback } from 'react';
import Carousel from '../../components/Carousel';
import loadable from '@loadable/component';
import KakaoMap from '../../components/KakaoMap';
import TopNavBar from '../../layouts/TopNavBar';
import Footer from '../../layouts/Footer';
import {
  WholeWrapper,
  LogoWrapper,
  LogoImg,
  ContentsWrapper,
  RowContents,
  CenterSummary,
  HowToCome,
  HowToComeLink,
  Map,
  CallInfo,
  LinkWrapper,
  LinkInfo,
  LinkImg,
  LinkText,
} from './styles.jsx';

import { useNavigate } from 'react-router-dom';
import { postInitNoticeInfo, getNoticeInfos } from '../../apis/APIs';
import { useRecoilState } from 'recoil';
import { atomIsLogin } from '../../recoil/atoms';
import logo from '../../images/oticon-logo.png';
import center_summary from '../../images/center-summary.jpeg';
import call_info from '../../images/call-info.jpeg';
import naver_blog from '../../images/naver-blog.png';
import NHIS from '../../images/NHIS.jpeg';
const CarouselEditModal = loadable(() => import('../../components/CarouselEditModal'));

const MainPage = () => {
  const [editCarouselModalOpened, setEditCarouselModalOpened] = useState(false);
  const [imageInfos, setImageInfos] = useState(Array);
  const [imageCurrentNo, setImageCurrentNo] = useState(0);
  const [isLogin] = useRecoilState(atomIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await getNoticeInfos('MainPageCarousel');
        setImageInfos(response.data.infos);
      } catch (error) {
        if (error.response.status === 500) {
          try {
            const res = await postInitNoticeInfo('MainPageCarousel');
            console.log(res);
            return;
          } catch (err) {
            console.log(err.response);
          }
          console.log(error.response);
        }
      }
    })();
  }, []);

  const visibleEditCarousel = useCallback(() => {
    if (editCarouselModalOpened) window.location.reload();
    setEditCarouselModalOpened(!editCarouselModalOpened);
  }, [editCarouselModalOpened]);

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
            onClick={() => navigate('/????????????/????????????')}
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
              ?????? ?????????
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
                ????????? ????????????
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
                ????????? ????????????
                <br />
                ?????? ??????
              </LinkText>
            </LinkInfo>
          </LinkWrapper>
        </RowContents>
      </ContentsWrapper>
      <Footer />
    </WholeWrapper>
  );
};

export default MainPage;
