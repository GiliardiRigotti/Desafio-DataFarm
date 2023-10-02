import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.TouchableOpacity`
margin-top: 30px;
  height: 55px;
  width: 80%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color:${colors.green};
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
`;
