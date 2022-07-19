import styled from 'styled-components';
import { getColor } from '../../utils';

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  flex-direction: column;
  align-items: center;
  object-fit: cover;
`;

const LogoImg = styled.img`
  vertical-align: middle;
  width: auto;
  height: auto;
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  width: 1200px;
  height: auto;
  min-height: calc(100vh - 275px);
  margin-bottom: 5px;
`;

const RowContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const CenterSummary = styled.img`
  width: 50%;
  height: 400px;
  border: 1px solid grey;
  border-top: none;
  border-bottom: none;
  cursor: pointer;
`;

const HowToCome = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 400px;
  border: 1px solid grey;
  border-left: none;
`;

const HowToComeLink = styled.div`
  text-align: left;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  border: 0px;
  background-color: ${getColor('purple')};
  color: ${getColor('white')};
  font-size: 22px;
  font-weight: bold;
  line-height: 50px;

  :hover {
    background-color: ${getColor('dark_purple')};
  }
  cursor: pointer;
`;

const Map = styled.div`
  width: 100%;
  height: 350px;
`;

const CallInfo = styled.img`
  width: 50%;
  height: 250px;
  border: 1px solid grey;
  border-top: none;
  border-right: none;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 250px;
  border: 1px solid grey;
  border-top: none;
`;

const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const LinkImg = styled.img`
  display: block;
  position: relative;
  top: 40px;
  width: 50%;
  height: 50%;
  border-radius: 100px;
  cursor: pointer;
`;

const LinkText = styled.div`
  position: relative;
  top: 40px;
  width: 50%;
  height: auto;
  margin-top: 10px;
  color: ${getColor('gray')};
  font-size: 22px;
  font-weight: bold;
  line-height: 25px;
  cursor: pointer;
`;

export {
  WholeWrapper,
  LogoWrapper,
  LogoImg,
  ContentsWrapper,
  RowContents,
  CenterSummary,
  HowToCome,
  HowToComeLink,
  Map,
  CallInfo,
  LinkWrapper,
  LinkInfo,
  LinkImg,
  LinkText,
};
