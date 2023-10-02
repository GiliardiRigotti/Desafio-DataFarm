import { Search } from "../../components/Search";
import { Text, FlatList } from 'react-native'
import { Container } from "./styles";
import { useApp } from "../../context/App";
import { useMemo } from "react";

export default function Records() {
    const { registry, resources } = useApp()

    const registryList = useMemo(() => {
        const list = []
        registry?.forEach((item) => {
            const farm = resources?.farms.filter((itemFarm) => itemFarm.id == item.idFarm) || []
            const reason = resources?.reasons.filter((itemReason) => itemReason.id == item.idReason) || []
            const machinerie = resources?.machineries.filter((itemMachineries) => itemMachineries.id == item.idMachinery) || []
            if (farm.length > 0) {
                const field = farm[0].fields.filter((itemField) => itemField.id == item.idField)
                list.push({
                    uuid: item.uuid,
                    farm: farm[0],
                    field: field[0],
                    machinerie: machinerie[0],
                    reason: reason[0],
                    note: item.note
                })
            }


        })
        return []
    }, [registry])

    return (
        <Container>
            <Text>Registros</Text>
            <Search registrys={[]} onChance={() => { }} />
            <FlatList
                data={registry}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }) => (
                    <Text>{item.uuid}</Text>
                )}
            />
        </Container>
    )
}