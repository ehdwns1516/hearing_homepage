import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [contents, setContents] = useState([]);
  const [editable, setEditable] = useState(false);
  const [type, setType] = useState(-1);
  const [isLogin] = useRecoilState(atomIsLogin);
  const [pageType] = useRecoilState(atomPageType);

  useEffect(() => {
    (async () => {
      setEditable(false);
      try {
        const response = await getDetailPageImages(subMenu);
        setContents(response.data.imageURLs);
        setType(pageType[subMenu]);
      } catch (error) {
        if (error.response.status === 500) {
          try {
            const res = await postInitDetailPage(subMenu);
            console.log(res);
            return;
          } catch (err) {
            console.log(err.response);
          }
        }
        console.log(error.response);
      }
    })();
  }, [subMenu, pageType]);

  useEffect(() => {
    (async () => {
      if (!imageIsChanged.current) return;
      try {
        await putDetailPageImages(subMenu, contents);
      } catch (error) {
        console.log(error.response);
      }
      imageIsChanged.current = false;
    })();
  }, [contents, subMenu]);

  const imgInputBtnClick = useCallback(
    (event, index) => {
      imageIndex.current = index;
      imageInput.current.click();
    },
    [imageIndex]
  );

  const imgDeleteBtnClick = useCallback(
    (event, index) => {
      if (window.confirm('이미지를 정말 삭제하시겠습니까?')) {
        const afterContents = [...contents];
        afterContents.splice(index, 1);
        imageIsChanged.current = true;
        setContents(afterContents);
      }
    },
    [contents]
  );

  const editBtnClick = useCallback(
    (event) => {
      event.preventDefault();
      setEditable(!editable);
    },
    [editable]
  );

  const onChangeImage = useCallback(
    async (event) => {
      if (!event.target.files[0]) return;
      selectedImage.current = event.target.files[0];
      let data = new FormData();
      data.append('image', selectedImage.current);
      try {
        const response = await postUploadImagesToS3(data);
        const afterContents = [...contents];
        afterContents.splice(imageIndex.current, 0, response.data.url);
        imageIsChanged.current = true;
        setContents(afterContents);
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    },
    [contents]
  );

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
