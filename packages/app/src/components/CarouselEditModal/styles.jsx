import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { getColor } from '../../utils';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  outline: 0;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  display: block;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  top: 50%;
  margin: 0 auto;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: ${getColor('white')};
  transform: translateY(-50%);
`;
const ModalContents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const EditImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  margin-top: 40px;
  border: 3px solid grey;
  border-radius: 5px;
`;

const AddImageButton = styled.button`
  display: inline-block;
  width: 40px;
  border: 0px;
  background-color: ${getColor('green')};
  color: ${getColor('white')};
  font-weight: bold;
  font-size: 35px;

  :hover {
    background-color: ${getColor('dark_green')};
  }
`;

const ImageHiddenInput = styled.input`
  display: none;
`;

const ImageLinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: ${(props) => props.width + 10}px;
  height: 100px;
  padding-left: 3px;
`;
const ImageLinkInput = styled.input`
  width: 90%;
  height: 50px;
  padding-left: 10px;
  border-radius: 5px;
  border: 0px;
  outline: 2px solid grey;
  font-style: italic;
  font-size: 20px;

  :focus {
    outline: 2px solid ${getColor('purple')};
  }
`;

const ImageLinkAddButton = styled.div`
  width: 10%;
  height: 50px;
  margin-left: 10px;
  border: 3px solid ${getColor('purple')};
  border-radius: 5px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;

  :hover {
    border: 3px solid ${getColor('dark_purple')};
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const CloseButtonlImage = styled(IoIosClose)`
  width: 70px;
  height: 70px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 70px;
  height: 70px;
  margin: auto;

  :hover {
    ${CloseButtonlImage} {
      color: ${getColor('darker_gray')};
    }
  }
  cursor: pointer;
`;

export {
  ModalWrapper,
  ModalOverlay,
  ModalInner,
  ModalContents,
  EditImageWrapper,
  AddImageButton,
  ImageHiddenInput,
  ImageLinkWrapper,
  ImageLinkInput,
  ImageLinkAddButton,
  CloseButtonlImage,
  CloseButton,
};
