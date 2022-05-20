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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const Title = styled.div`
  width: 100%;
  color: ${getColor('gray')};
  font-size: 65px;
  font-weight: bold;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 30px;
  color: ${getColor('gray')};
  font-size: 35px;
  font-weight: bold;
`;

const AccentText = styled.span`
  color: ${getColor('purple')};
`;

export default PreparingPage;
