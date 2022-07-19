import styled from 'styled-components';
import { getColor } from '../../utils';

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NotFoundWrapper = styled.div`
  text-align: center;
  width: 50%;
  height: 30%;
`;

const MainPageButton = styled.img`
  width: 420px;
  height: 100px;
  cursor: pointer;
`;

const NotFoundContent1 = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
`;

const NotFoundContent2 = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  color: ${getColor('gray')};
  font-style: italic;
  font-size: 20px;
`;

const ReturnHome = styled.a`
  margin-top: 30px;
  font-size: 20px;
`;

export {
  WholeWrapper,
  NotFoundWrapper,
  MainPageButton,
  NotFoundContent1,
  NotFoundContent2,
  ReturnHome,
};
