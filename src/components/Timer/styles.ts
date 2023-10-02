import styled from "styled-components/native";
import { colors } from "../../constants/colors";

export const Container = styled.TouchableOpacity`
    margin-top: 15px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50%;
`;

export const Button = styled.TouchableOpacity`

`;

export const TimeLabel = styled.View`
    border-radius: 15px;
    background-color: ${colors.orangeLight};
    height: 55px;
    width: 70%;
    align-items: center;
    justify-content: center;
    margin: 5px;
`;

export const TimeText = styled.Text`
    color:${colors.white};
    font-size: 18px;
`;