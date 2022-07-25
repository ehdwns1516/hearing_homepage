import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { getColor } from '../../utils';
import ImageList from '@mui/material/ImageList';
import ImageEnlargeModal from '../ImageEnlargeModal';
import {
  CustomImageListItem,
  DeleteImageButton,
  ControlPageWrapper,
  PageButtonWrapper,
  PageButtonList,
  PageButton,
  PageButtonNext,
  PageButtonPrev,
} from './styles.jsx';

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
    window.onresize = function () {
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

  const deleteImage = useCallback(
    (index) => {
      if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
        const afterImages = [...allImages];
        afterImages.splice(index + (currentPageNum - 1) * 12, 1);
        setAllImages(afterImages);
        imageIsChanged.current = true;
      }
    },
    [allImages, currentPageNum, setAllImages]
  );

  const openEnlargeImageModal = useCallback(
    (index) => {
      if (editable) return;
      if (!imageModalOpened) setSelectedImageIndex((currentPageNum - 1) * 12 + index);

      setImageEnlargeModal(!imageModalOpened);
    },
    [
      editable,
      imageModalOpened,
      setSelectedImageIndex,
      currentPageNum,
      setImageEnlargeModal,
    ]
  );

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
            <CustomImageListItem key={index} onClick={() => openEnlargeImageModal(index)}>
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
          openEnlargeImageModal={openEnlargeImageModal}
        ></ImageEnlargeModal>
      ) : null}
    </React.Fragment>
  );
};

export default StandardImageList;
