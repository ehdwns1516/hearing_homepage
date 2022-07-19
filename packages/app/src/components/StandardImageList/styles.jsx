import styled from 'styled-components';
import { getColor } from '../../utils';
import ImageListItem from '@mui/material/ImageListItem';

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
export {
  CustomImageListItem,
  DeleteImageButton,
  ControlPageWrapper,
  PageButtonWrapper,
  PageButtonList,
  PageButton,
  PageButtonNext,
  PageButtonPrev,
};
