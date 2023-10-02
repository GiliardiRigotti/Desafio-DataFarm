import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.View`
    margin-top: 10px;
    flex-direction: row;
    width: 80%;
    border-bottom-width: 2px;
    border-color: ${colors.grayLight};
`;

export const Wrapper = styled.View`
    width: 65%;
`;

export const Title = styled.Text`
    font-size: 16px;
    font-weight: 900;
`;

export const Description = styled.Text`
    font-size: 14px;
    color: ${colors.gray};
`;

export const DateLabel = styled.View`
    width: 30%;
    align-items: center;
`;

export const DateText = styled.Text`
    font-size: 10px;
    color: ${colors.gray};
`;