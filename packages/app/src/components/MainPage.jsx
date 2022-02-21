import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';
import ImageSlideEditModal from './ImageSlideEditModal';

const MainPage = () => {
  const [editImageSlideModalOpened, setEditImageSlideModalOpened] = useState(false);

  const visibleEditImageSlide = () => {
    console.log(editImageSlideModalOpened);
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
          imageInfos={[]}
        />
      ) : null}
      <ImageSlide imageInfos={[]}></ImageSlide>
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
