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
          boxShadow: 3,
          paddingLeft: '15px',
          paddingRight: '15px',
          paddingBottom: '5px',
          paddingTop: '5px',
          borderRadius: 3,
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
  border-radius: 10px;
  margin: auto;
  cursor: ${(props) => (props.empty === 'true' ? 'default' : 'pointer')};
  background-color: ${getColor('black')};

  :hover {
    opacity: ${(props) => (props.empty ? '1' : '0.75')};
    box-shadow: 0 0 0.4em ${getColor('purple')};
  }
`;
const DeleteImageButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 30px;
  height: 30px;
  line-height: 23px;
  border-radius: 20px;
  display: inline-block;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  font-size: 35px;
  z-index: 1;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

const ControlPageWrapper = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PageButtonWrapper = styled.div`
  width: 310px;
  height: 100%;
  overflow: hidden;
  text-align: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  line-height: 50px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 25px;
  color: ${getColor('white')};
  margin: auto;
  background-color: ${getColor('purple')};

  :hover {
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const PageButtonNext = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  color: ${getColor('white')};
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${getColor('dark_gray')};
  margin-right: 5px;
  cursor: pointer;
  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

const PageButtonPrev = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  color: ${getColor('white')};
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background-color: ${getColor('dark_gray')};
  margin-right: 5px;
  cursor: pointer;
  :hover {
    background-color: ${getColor('darker_gray')};
  }
`;

export default StandardImageList;
