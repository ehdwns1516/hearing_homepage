import React, { useState } from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';
import ImageSlideEditModal from './ImageSlideEditModal';

const MainPage = () => {
  const [editImageSlideModalOpened, setEditImageSlideModalOpened] = useState(false);

  const openEditImageSlide = () => {
    console.log(editImageSlideModalOpened);
    setEditImageSlideModalOpened(!editImageSlideModalOpened);
  };

  return (
    <WholeWrapper>
      <OpenEditImageSlideButton onClick={openEditImageSlide}>
        수정
      </OpenEditImageSlideButton>
      {editImageSlideModalOpened ? (
        <ImageSlideEditModal openEditImageSlide={openEditImageSlide} />
      ) : null}
      <ImageSlide images={[]}></ImageSlide>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  padding-top: 50px;
  height: 100vh;
  width: 100%vw;
`;

const OpenEditImageSlideButton = styled.button`
  height: 50px;
  width: 100px;
`;

export default MainPage;
