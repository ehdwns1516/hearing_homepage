import styled, { css } from 'styled-components';
import { getColor } from '../../utils';

const WholeWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TitleText = styled.span`
  margin-top: 30px;
  font-size: 30px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: scroll;
  overflow-x: hidden;
  width: calc(100% - 285px);
  height: 100%;
`;

const SideWrapper = styled.div`
  text-align: center;
  width: 285px;
  height: 100%;
  border-right: 1px solid ${getColor('purple')};
`;

const HorizonLine = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${getColor('purple')};
  line-height: 0em;
`;

const InnerText = styled.span`
  padding: 0 10px;
  background-color: ${getColor('white')};
  color: rgba(0, 0, 0, 0.5);
  font-size: 20px;
`;

const AddImageButton = styled.button`
  width: 90%;
  height: 40px;
  min-height: 40px;
  margin-bottom: 5px;
  border: 1px solid grey;
  background-color: ${getColor('green')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 20px;

  :hover {
    background-color: ${getColor('dark_green')};
  }
`;

const EditButton = styled.button`
  display: ${(props) => (props.islogin ? 'flow-root' : 'none')};
  width: 90%;
  height: 40px;
  min-height: 40px;
  margin-bottom: 5px;
  border: 1px solid grey;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 20px;
  :hover {
    background-color: ${getColor('dark_purple')};
  }
`;

const DeleteImageButton = styled.button`
  display: block;
  width: 120px;
  height: 60px;
  position: relative;
  top: 20px;
  margin-top: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  background-color: ${getColor('red')};
  color: ${getColor('white')};
  font-size: 20px;
  font-weight: bold;
  :hover {
    background-color: ${getColor('dark_red')};
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

const ContentImg = styled.img`
  width: 80%;
  height: auto;
  margin-bottom: 5px;
  margin-left: ${(props) =>
    props.editable
      ? css`
        calc(5% - 80px);
      `
      : css`
        0px;
      `};
  object-fit: fill;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export {
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
};
