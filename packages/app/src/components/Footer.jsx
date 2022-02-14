import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <WholeWrapper>
      <HorizonLine />
      <MyFooter>
        <div
          style={{
            marginBottom: '5px',
            marginLeft: '50px',
          }}
        >
          <span>Github: </span>
          <a
            href='https://github.com/ehdwns1516/hearing_homepage'
            target='_blank'
            style={{
              color: 'white',
            }}
          >
            Link
          </a>
        </div>
        <div
          style={{
            marginBottom: '5px',
            marginLeft: '50px',
          }}
        >
          e-mail: ehdwns1516@ajou.ac.kr
        </div>
        <div
          style={{
            marginBottom: '5px',
            marginLeft: '50px',
          }}
        >
          Copyright © 2022 ehdwns1516 All Rights Reserved.
        </div>
      </MyFooter>
    </WholeWrapper>
  );
};

const WholeWrapper = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 100%;
  height: 90px;
  width: 100%;
  max-width: 100%;
  background-color: #63214e;
`;

const MyFooter = styled.footer`
  height: auto;
  width: 100%;
  font-size: 14px;
  color: lightgray;
`;

const HorizonLine = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  line-height: 0em;
  margin-bottom: 10px;
`;

export default Footer;
