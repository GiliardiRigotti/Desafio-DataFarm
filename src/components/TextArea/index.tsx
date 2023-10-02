import { TextInputProps } from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Container, TextInput, Title, Wrapper } from "./styles";
import { colors } from "../../constants/colors";

interface Props extends TextInputProps {
    title: string
}

export function TextArea({ title, ...rest }: Props) {
    return (
        <Container>
            <Wrapper>
                <Icon name='square-edit-outline' size={25} color={colors.gray} />
                <Title>
                    {title}
                </Title>
            </Wrapper>
            <TextInput
                textAlignVertical="top"
                editable
                multiline={true}
                numberOfLines={5}
                {...rest}
            />
        </Container>
    )
}