import React from 'react';
import styled from 'styled-components';
import { getColor } from '../utils';

const PreparingPage = () => {
  return (
    <WholeWrapper>
      <Title>
        <AccentText>페이지 준비중</AccentText> 입니다.
      </Title>
      <Description>
        빠른시일 내에 컨텐츠를 준비하여 이용에 불편함이 없도록 하겠습니다.
      </Description>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  font-size: 65px;
  font-weight: bold;
  color: ${getColor('gray')};
`;

const Description = styled.div`
  width: 100%;
  font-size: 35px;
  font-weight: bold;
  color: ${getColor('gray')};
  margin-top: 30px;
`;

const AccentText = styled.span`
  color: ${getColor('purple')};
`;

export default PreparingPage;
