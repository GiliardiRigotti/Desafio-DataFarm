import { TextInputProps, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { Container, TextInput, Title, Button } from "./styles";
import { useState } from "react";
import { colors } from "../../constants/colors";

interface Props extends TextInputProps {
    title: string
    password?: boolean
}

export default function Input({ title, password = false, ...rest }: Props) {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    return (
        <Container>
            <Title>
                {title}
            </Title>
            {
                password ?
                    <>
                        <TextInput
                            secureTextEntry={hidePassword}
                            {...rest}
                        />
                        <Button onPress={() => setHidePassword(!hidePassword)}>
                            {
                                hidePassword ?
                                    <Icon name="eye" size={30} color={colors.grayLight} />
                                    :
                                    <Icon name="eye-off" size={30} color={colors.grayLight} />
                            }

                        </Button>
                    </>
                    :
                    <TextInput
                        {...rest}
                    />
            }
        </Container>
    )
}