import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${colors.white};
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
`;


