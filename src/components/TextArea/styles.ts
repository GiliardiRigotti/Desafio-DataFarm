import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.View`
  margin-top: 10px;
  width: 80%;
`;

export const Title = styled.Text`
  font-size: 16px;
  color:${colors.gray};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  margin-top: 5px;
  padding: 10px;
  border-width: 1px;
  border-color: ${colors.gray};
  border-radius: 5px;
`;