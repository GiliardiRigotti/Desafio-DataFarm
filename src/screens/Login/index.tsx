import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Location from 'expo-location';
import { images } from "../../assets";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useApp } from "../../context/App";
import { Container, Logo, SubTitle, Title, Wrapper } from "./styles";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading } = useApp();

    async function handleSignIn() {
        console.log('login')
        await signIn(email, password)
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão de localização negada');
                return;
            }
        })();
    }, []);

    return (
        <Container>
            <Logo source={images.logo} resizeMode="contain" />
            <Wrapper>
                <Title>
                    Login
                </Title>
                <SubTitle>
                    Acesse o aplicativo
                </SubTitle>
            </Wrapper>
            <Input title="Email" onChangeText={setEmail} />
            <Input title="Password" password onChangeText={setPassword} />
            <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />
        </Container>
    )
}