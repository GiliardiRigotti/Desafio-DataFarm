import { useEffect, useMemo, useState } from "react";
import * as Location from 'expo-location';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { v4 as uuidv4 } from 'uuid';
import Select from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { useApp } from "../../context/App";
import { Container, Header, Title, Wrapper } from "./styles";
import { ISelect } from "../../interfaces/select";
import ListItems from "../../components/ItemList";
import Button from "../../components/Button";
import { IRegistry } from "../../interfaces/registry";
import { Alert } from "react-native";


export default function StopRecords() {
    const { resources, addRegistry } = useApp()
    const [location, setLocation] = useState(null);
    const [fieldsList, setFieldList] = useState<ISelect[]>([])
    const [formRegistry, setFormRegistry] = useState<IRegistry>({
        idFarm: null,
        idField: null,
        idMachinery: null,
        idReason: null,
        latitude: null,
        longitude: null,
        minutes: null,
        note: null,
        uuid: uuidv4()
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
        if (formRegistry) {
            Location.getCurrentPositionAsync({})
                .then((location) => addRegistry({
                    ...formRegistry,
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })).catch((error) => {
                    Alert.alert('Aviso', error || 'Erro de obter a localização, verique se seu GPS esteja ligado')
                })
        }
    }

    return (
        <Container>
            <Header>
                <Icon name="arrow-left" size={25} />
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
                <Button title="Salvar" width={40} />
                <Button title="Salvar" width={40} onPress={handleAddRegistry} />
            </Wrapper>

        </Container>
    )
}