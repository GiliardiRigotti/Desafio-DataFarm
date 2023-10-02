import styled from 'styled-components/native';
import { colors } from '../../constants/colors';

export const Container = styled.TouchableOpacity`
  margin-top: 10px;
  width: 80%;
  height: 38%;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color:${colors.green};
`;

export const ItemList = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  width: 100%;
`;

export const ItemTitle = styled.Text`
  font-size: 18px;
`;

export const List = styled.FlatList`
  background-color: ${colors.white};
  border-radius: 5px;
`;

export const Box = styled.View`
  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.gray};
`;