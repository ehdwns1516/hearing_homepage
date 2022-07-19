import styled from 'styled-components';
import { getColor } from '../../utils';

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

export { WholeWrapper, Title, Description, AccentText };
