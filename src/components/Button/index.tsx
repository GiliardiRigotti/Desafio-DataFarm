import { TouchableOpacityProps, ActivityIndicator } from "react-native";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
    title: string
    isLoading?: boolean
    width?: number
}

export default function Button({ title, isLoading, width = 80, ...rest }: Props) {
    return (
        <Container {...rest} style={{ width: `${width}%` }}>
            {
                isLoading ?
                    <ActivityIndicator size={30} />
                    :
                    <Title>
                        {title}
                    </Title>
            }

        </Container>
    )
}