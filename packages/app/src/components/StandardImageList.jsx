import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { cardClasses } from '@mui/material';

const StandardImageList = ({ images }) => {
  const ImageListRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentButtonPage, setCurrentButtonPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    window.onresize = function (event) {
      setImageHeight(ImageListRef.current.offsetHeight / 3 - 20);
    };
    setImageHeight(ImageListRef.current.offsetHeight / 3 - 20);

    let pageNumbers_ = [];
    let maxPageCount = Math.ceil(itemData.length / 12) || 1;
    for (let i = 1; i <= maxPageCount; i++) {
      pageNumbers_.push(i);
    }
    setPageNumbers(pageNumbers_);
  }, []);

  useEffect(() => {
    let slicedItems = itemData.slice((currentPage - 1) * 12, currentPage * 12);
    const slicedItemsSize = slicedItems.length;
    if (slicedItemsSize < 12) {
      for (let i = 0; i < 12 - slicedItemsSize; i++) {
        slicedItems.push({ title: null });
      }
    }
    setCurrentImages(slicedItems);
  }, [currentPage]);

  const findIndex = (index) => {
    console.log(index);
  };

  return (
    <React.Fragment>
      <ImageList
        ref={ImageListRef}
        cols={4}
        gap={15}
        rowHeight={imageHeight}
        style={{
          backgroundColor: 'white',
          width: '88%',
          height: '70%',
          borderRadius: '10px',
        }}
      >
        {currentImages.map((item, index) =>
          !item.title ? (
            <CustomImageListItem key={index} empty={true}></CustomImageListItem>
          ) : (
            <CustomImageListItem key={index}>
              <DeleteImageButton onClick={() => findIndex(index)}>-</DeleteImageButton>
              <img
                src={`${item.img}`}
                // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                // srcSet={`${item.img}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading='lazy'
              />
            </CustomImageListItem>
          )
        )}
      </ImageList>
      <ControlPageWrapper>
        <PageButtonPrev
          onClick={() => {
            if (currentButtonPage === 1) return;
            setCurrentButtonPage(currentButtonPage - 1);
          }}
        >
          {'<'}
        </PageButtonPrev>
        <PageButtonWrapper>
          <PageButtonList
            style={{
              transform: `translate3d(
                ${(currentButtonPage - 1) * -310}px, 0px, 0px`,
            }}
            maxPageCount={pageNumbers.length}
          >
            <>
              {pageNumbers.map((item) => (
                <PageButton key={item}>{item}</PageButton>
              ))}
            </>
          </PageButtonList>
        </PageButtonWrapper>
        <PageButtonNext
          onClick={() => {
            if (currentButtonPage === Math.ceil(pageNumbers.length / 5)) return;
            setCurrentButtonPage(currentButtonPage + 1);
          }}
        >
          {'>'}
        </PageButtonNext>
      </ControlPageWrapper>
    </React.Fragment>
  );
};

const itemData = [
  {
    img: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

const CustomImageListItem = styled(ImageListItem)`
  overflow: hidden;
  border-radius: 10px;
  margin: auto;
  cursor: ${(props) => (props.empty ? 'default' : 'pointer')};
  background-color: black;

  :hover {
    opacity: ${(props) => (props.empty ? '1' : '0.75')};
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
  background-color: red;
  color: white;
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
  color: white;
  margin: auto;
  background-color: #b4338a;

  :hover {
    background-color: #892e6c;
  }
  cursor: pointer;
`;

const PageButtonNext = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  color: white;
  font-size: 25px;
  line-height: 50px;
  font-weight: bold;
  background-color: grey;
  margin-left: 5px;
  cursor: pointer;
  :hover {
    background-color: darkgrey;
  }
`;

const PageButtonPrev = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  color: white;
  font-size: 25px;
  line-height: 50px;
  font-weight: bold;
  background-color: grey;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    background-color: darkgrey;
  }
`;

export default StandardImageList;
