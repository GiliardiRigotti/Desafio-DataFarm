import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.View`
margin-top: 10px;
width: 80%;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color:${colors.green};
`;

export const TextInput = styled.TextInput`
  margin-top: 10px;
  border-bottom-width: 2px;
  border-color: ${colors.grayLight};
  font-size: 14px;
  padding-left: 5px;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;