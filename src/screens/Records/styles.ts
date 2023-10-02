import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.View`
  flex:1;
  padding-top: 30px;
  align-items: center;
  background-color: ${colors.white};
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    alignItems: 'center'
  }
})`
  width: 100%;
`;
