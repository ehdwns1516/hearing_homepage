import React, { useState, useEffect, useRef } from 'react';
import SideNavBar from '../../layouts/SideNavBar';
import { useRecoilState } from 'recoil';
import StandardImageList from '../../components/StandardImageList';
import PreparingPage from '../../components/Preparing';
import {
  WholeWrapper,
  TitleText,
  ContentsWrapper,
  SideWrapper,
  HorizonLine,
  InnerText,
  AddImageButton,
  EditButton,
  DeleteImageButton,
  ImageHiddenInput,
  ContentImg,
  ImgWrapper,
} from './styles.jsx';
import {
  postUploadImagesToS3,
  postInitDetailPage,
  getDetailPageImages,
  putDetailPageImages,
} from '../../apis/APIs';

import { atomIsLogin, atomPageType } from '../../recoil/atoms';

const DetailPage = ({ topMenu, subMenu }) => {
  const imageInput = useRef(null);
  const selectedImage = useRef(null);
  const imageIsChanged = useRef(false);
  const imageIndex = useRef(0);
  const [contents, setContents] = useState(Array);
  const [editable, setEditable] = useState(false);
  const [type, setType] = useState(-1);
  const [isLogin] = useRecoilState(atomIsLogin);
  const [pageType] = useRecoilState(atomPageType);

  useEffect(() => {
    setEditable(false);
    getDetailPageImages(subMenu)
      .then((res) => {
        setContents(res.data.imageURLs);
        setType(pageType[subMenu]);
      })
      .catch((err) => {
        if (err.response.status === 500)
          postInitDetailPage(subMenu)
            .then((res) => {
              console.log(res);
              return;
            })
            .catch((err) => console.log(err));
      });
  }, [subMenu]);

  useEffect(() => {
    if (!imageIsChanged.current) return;
    putDetailPageImages(subMenu, contents).catch((err) => console.log(err));
    imageIsChanged.current = false;
  }, [contents]);

  const imgInputBtnClick = (event, index) => {
    imageIndex.current = index;
    imageInput.current.click();
  };

  const imgDeleteBtnClick = (event, index) => {
    if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
      const afterContents = [...contents];
      afterContents.splice(index, 1);
      imageIsChanged.current = true;
      setContents(afterContents);
    }
  };

  const editBtnClick = (event) => {
    event.preventDefault();
    setEditable(!editable);
  };

  const onChangeImage = (event) => {
    if (!event.target.files[0]) return;
    selectedImage.current = event.target.files[0];
    let data = new FormData();
    data.append('image', selectedImage.current);

    postUploadImagesToS3(data)
      .then((res) => {
        const afterContents = [...contents];
        afterContents.splice(imageIndex.current, 0, res.data.url);
        imageIsChanged.current = true;
        setContents(afterContents);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditContents = (content, index) => {
    return (
      <React.Fragment key={index}>
        <ImgWrapper>
          <div style={{ overflow: 'visible', height: '0px' }}>
            <DeleteImageButton onClick={(e) => imgDeleteBtnClick(e, index)}>
              이미지 삭제
            </DeleteImageButton>
          </div>

          <ContentImg src={content} editable={editable} />
        </ImgWrapper>
        <AddImageButton onClick={(e) => imgInputBtnClick(e, index + 1)}>
          이미지 추가
        </AddImageButton>
      </React.Fragment>
    );
  };

  const ViewContents = (imageUrl, index) => {
    return (
      <React.Fragment key={index}>
        <ImgWrapper>
          <ContentImg src={imageUrl} editable={editable} />
        </ImgWrapper>
      </React.Fragment>
    );
  };

  return (
    <WholeWrapper>
      <ImageHiddenInput
        ref={imageInput}
        type='file'
        accept='image/*'
        onChange={onChangeImage}
      ></ImageHiddenInput>
      <SideWrapper>
        <SideNavBar currentPage={subMenu} />
      </SideWrapper>
      <ContentsWrapper>
        <TitleText>{topMenu}</TitleText>
        <HorizonLine>
          <InnerText>{subMenu}</InnerText>
        </HorizonLine>
        {editable ? (
          <EditButton islogin={isLogin} onClick={editBtnClick}>
            수정 완료
          </EditButton>
        ) : (
          <EditButton islogin={isLogin} onClick={editBtnClick}>
            수정
          </EditButton>
        )}
        {editable ? (
          <AddImageButton onClick={(e) => imgInputBtnClick(e, 0)}>
            이미지 추가
          </AddImageButton>
        ) : null}

        {contents.length === 0 ? <PreparingPage></PreparingPage> : null}

        {contents.length && type === 0
          ? contents.map((imageUrl, index) =>
              editable ? EditContents(imageUrl, index) : ViewContents(imageUrl, index)
            )
          : null}

        {contents.length && type === 1 ? (
          <StandardImageList
            editable={editable}
            allImages={contents}
            setAllImages={setContents}
            imageIsChanged={imageIsChanged}
          ></StandardImageList>
        ) : null}
      </ContentsWrapper>
    </WholeWrapper>
  );
};

export default DetailPage;
