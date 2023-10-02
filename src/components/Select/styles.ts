import styled from 'styled-components/native';
import { colors } from '../../constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  }
})

export const Container = styled.TouchableOpacity`
  margin-top: 10px;
  width: 80%;
  border-bottom-width: 2px;
  border-color: ${colors.grayLight};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color:${colors.green};
`;

export const SelectContainer = styled.View`
  margin: 5px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5px;
`;

export const SelectText = styled.Text`
  font-size: 14px;
  color:${colors.gray};
`;

export const ModalListOptions = styled.View`
  position: absolute;
  bottom: 0;
  height: 40%;
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: ${colors.white};
`;

export const ModalContainerTitle = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-self: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const ItemList = styled.TouchableOpacity`
  margin-top: 10px;
  align-items: center;
  width: 100%;
  border-bottom-width: 2px;
`;

export const ItemTitle = styled.Text`
  font-size: 20px;
`;

export const List = styled.FlatList`
  width: 100%;
  padding-top: 20px;
  background-color: ${colors.white};
`;

export const ButtonClose = styled.TouchableOpacity`
`;
