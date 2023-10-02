import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.View`
    height: 40px;
    width: 80%;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    border-radius: 5px;
    background-color: ${colors.grayLight};
`;

export const TextInput = styled.TextInput`
    width: 90%;
    font-size: 14px;
    margin-left: 3px;
    color: ${colors.gray};
`;