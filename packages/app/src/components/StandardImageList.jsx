import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ImageEnlargeModal from './ImageEnlargeModal';
import { getColor } from '../utils';

const StandardImageList = ({ editable, allImages, setAllImages, imageIsChanged }) => {
  const ImageListRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentControlButtonsPage, setCurrentControlButtonsPage] = useState(1);
  const [currentPageImages, setCurrentPageImages] = useState([]);
  const [controlButtonNum, setControlButtonNum] = useState([]);
  const [imageModalOpened, setImageEnlargeModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    window.onresize = function (event) {
      setImageHeight(ImageListRef.current.offsetHeight / 3 - 20);
    };
    setImageHeight(ImageListRef.current.offsetHeight / 3 - 20);
  }, []);

  useEffect(() => {
    let slicedItems = allImages.slice((currentPageNum - 1) * 12, currentPageNum * 12);
    const slicedItemsSize = slicedItems.length;
    if (slicedItemsSize < 12) {
      for (let i = 0; i < 12 - slicedItemsSize; i++) {
        slicedItems.push(null);
      }
    }
    setCurrentPageImages(slicedItems);

    if (slicedItemsSize === 0 && currentPageNum !== 1)
      setCurrentPageNum(currentPageNum - 1);

    let controlButtonNum_ = [];
    let maxPageCount = Math.ceil(allImages.length / 12) || 1;
    for (let i = 1; i <= maxPageCount; i++) {
      controlButtonNum_.push(i);
    }
    setControlButtonNum(controlButtonNum_);
  }, [currentPageNum, allImages]);

  const deleteImage = (index) => {
    if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
      const afterImages = [...allImages];
      afterImages.splice(index + (currentPageNum - 1) * 12, 1);
      setAllImages(afterImages);
      imageIsChanged.current = true;
    }
  };

  const openEnlageImageModal = (index) => {
    if (editable) return;
    if (!imageModalOpened) setSelectedImageIndex((currentPageNum - 1) * 12 + index);

    setImageEnlargeModal(!imageModalOpened);
  };

  return (
    <React.Fragment>
      <ImageList
        ref={ImageListRef}
        cols={4}
        gap={15}
        rowHeight={imageHeight}
        sx={{
          width: '88%',
          height: '70%',
          paddingLeft: '15px',
          paddingRight: '15px',
          paddingBottom: '5px',
          paddingTop: '5px',
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        {currentPageImages.map((imageUrl, index) =>
          !imageUrl ? (
            <CustomImageListItem key={index} empty={'true'}></CustomImageListItem>
          ) : (
            <CustomImageListItem key={index} onClick={() => openEnlageImageModal(index)}>
              {editable ? (
                <DeleteImageButton onClick={() => deleteImage(index)}>
                  -
                </DeleteImageButton>
              ) : null}
              <img
                src={`${imageUrl}`}
                alt={'None'}
                style={{ width: '100%' }}
                draggable={false}
              />
            </CustomImageListItem>
          )
        )}
      </ImageList>
      <ControlPageWrapper>
        <PageButtonPrev
          onClick={() => {
            if (currentControlButtonsPage === 1) return;
            setCurrentControlButtonsPage(currentControlButtonsPage - 1);
          }}
        >
          <IoIosArrowBack style={{ width: '35px', height: '35px' }}></IoIosArrowBack>
        </PageButtonPrev>
        <PageButtonWrapper>
          <PageButtonList
            style={{
              transform: `translate3d(
                ${(currentControlButtonsPage - 1) * -310}px, 0px, 0px`,
            }}
            maxPageCount={controlButtonNum.length}
          >
            {controlButtonNum.map((item) =>
              currentPageNum === item ? (
                <PageButton
                  key={item}
                  style={{ backgroundColor: `${getColor('dark_purple')};` }}
                >
                  {item}
                </PageButton>
              ) : (
                <PageButton key={item} onClick={() => setCurrentPageNum(item)}>
                  {item}
                </PageButton>
              )
            )}
          </PageButtonList>
        </PageButtonWrapper>
        <PageButtonNext
          onClick={() => {
            if (currentControlButtonsPage === Math.ceil(controlButtonNum.length / 5))
              return;
            setCurrentControlButtonsPage(currentControlButtonsPage + 1);
          }}
        >
          <IoIosArrowForward
            style={{ width: '35px', height: '35px' }}
          ></IoIosArrowForward>
        </PageButtonNext>
      </ControlPageWrapper>
      {imageModalOpened ? (
        <ImageEnlargeModal
          images={allImages}
          imageIndex={selectedImageIndex}
          openEnlageImageModal={openEnlageImageModal}
        ></ImageEnlargeModal>
      ) : null}
    </React.Fragment>
  );
};

const CustomImageListItem = styled(ImageListItem)`
  overflow: hidden;
  margin: auto;
  border-radius: 10px;
  background-color: ${getColor('black')};

  :hover {
    opacity: ${(props) => (props.empty ? '1' : '0.75')};
    box-shadow: 0 0 0.4em ${getColor('purple')};
  }
  cursor: ${(props) => (props.empty === 'true' ? 'default' : 'pointer')};
`;
const DeleteImageButton = styled.div`
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  line-height: 23px;
  font-size: 35px;
  z-index: 1;
  :hover {
    opacity: 0.5;
  }
  cursor: pointer;
`;

const ControlPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
`;

const PageButtonWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 310px;
  height: 100%;
  margin-top: 20px;
`;

const PageButtonList = styled.div`
  width: ${(props) => props.maxPageCount * 62}px;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: center;
  transition: all 300ms ease 0s;
  margin: auto;
`;

const PageButton = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 25px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 25px;
  line-height: 50px;

  :hover {
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const PageButtonNext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 5px;
  margin-top: 20px;
  border-radius: 25px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('white')};
  font-size: 25px;
  font-weight: bold;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
  cursor: pointer;
`;

const PageButtonPrev = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 5px;
  margin-top: 20px;
  background-color: ${getColor('dark_gray')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 25px;

  :hover {
    background-color: ${getColor('darker_gray')};
  }
  cursor: pointer;
`;

export default StandardImageList;
