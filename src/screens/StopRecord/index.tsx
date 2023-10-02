import { useEffect, useMemo, useState } from "react";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import NetInfo from '@react-native-community/netinfo';
import Select from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { useApp } from "../../context/App";
import { Container, Header, Title, Wrapper, ButtonLogout } from "./styles";
import { ISelect } from "../../interfaces/select";
import ListItems from "../../components/ItemList";
import Button from "../../components/Button";
import { IRegistry } from "../../interfaces/registry";
import { Alert } from "react-native";
import { Timer } from "../../components/Timer";


export default function StopRecords({ navigation }) {
    const { resources, addRegistry, signOut, sync, registry } = useApp()
    const [fieldsList, setFieldList] = useState<ISelect[]>([])
    const [formRegistry, setFormRegistry] = useState<IRegistry>({
        idFarm: null,
        idField: null,
        idMachinery: null,
        idReason: null,
        latitude: null,
        longitude: null,
        minutes: 10,
        note: '',
        uuid: null,
        created: null,
        sync: null
    })

    const farmsList = useMemo(() => {
        const list = resources?.farms.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
        return list as ISelect[]
    }, [resources])

    const machineriesList = useMemo(() => {
        const list = resources?.machineries.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
        return list as ISelect[]
    }, [resources])

    const reasonsList = useMemo(() => {
        const list = resources?.reasons.map((item) => {
            return {
                id: item.id,
                name: item.name,
                icon: item.icon
            }
        })
        return list as ISelect[]
    }, [resources])

    function handleSelectedFarm(id: number) {
        setFormRegistry({ ...formRegistry, idFarm: id })
        const list: ISelect[] = []
        resources?.farms.forEach((item) => {
            if (item.id == id) {
                item.fields.map((item) => {
                    list.push(item)
                })
            }
        })
        setFieldList(list)
    }

    function handleAddRegistry() {
        if (!!formRegistry.idFarm && !!formRegistry.idField && !!formRegistry.idMachinery && !!formRegistry.idReason) {
            addRegistry(formRegistry)
            Alert.alert('Adicionado a parada')
            navigation.navigate('Records')
        } else {
            Alert.alert('Aviso', 'Preencha Todos os campos por favor')
        }
    }

    function handleSignOut() {
        Alert.alert(
            'Aviso',
            'Tem certeza que vc quer deslogar?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => signOut(),
                },
            ],
            { cancelable: false },
        );
    }

    useEffect(() => {
        NetInfo.fetch().then(async (state) => {
            console.log('Netinfo: ', state.isConnected)
            if (state.isConnected) {
                sync()
            }
        });

    }, [registry])

    return (
        <Container>
            <Header>
                <ButtonLogout onPress={handleSignOut}>
                    <Icon name="arrow-left" size={25} />
                </ButtonLogout>

                <Title>Registro de Parada</Title>
            </Header>
            <Select title="Equipamento" list={machineriesList} onChance={(value) => setFormRegistry({ ...formRegistry, idMachinery: value })} />
            <Wrapper>
                <Select title="Fazenda" list={farmsList} width={65} onChance={handleSelectedFarm} />
                <Select title="Talhão" list={fieldsList} width={30} onChance={(value) => setFormRegistry({ ...formRegistry, idField: value })} />
            </Wrapper>
            <ListItems list={reasonsList} title="Motivo" onChance={(value) => setFormRegistry({ ...formRegistry, idReason: value })} />
            <TextArea title="Nota de parada" />
            <Wrapper>
                <Timer onChange={(value) => setFormRegistry({ ...formRegistry, minutes: value })} />
                <Button title="Salvar" width={40} onPress={handleAddRegistry} />
            </Wrapper>

        </Container>
    )
}