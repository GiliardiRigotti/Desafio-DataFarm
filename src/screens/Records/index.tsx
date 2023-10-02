import { Search } from "../../components/Search";
import { Text } from 'react-native'
import { Container, List } from "./styles";
import { useApp } from "../../context/App";
import { useEffect, useMemo, useState } from "react";
import { IRegistryItem } from "../../interfaces/registry";
import { RegistryItem } from "../../components/RegistryItem";



export default function Records() {
    const { registry, resources } = useApp()
    const [list, setList] = useState<IRegistryItem[]>([])
    const [search, setSearch] = useState<IRegistryItem[]>([])

    useEffect(() => {
        const list: IRegistryItem[] = []
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
                    note: item.note,
                    minutes: item.minutes,
                    created: item.created
                })
            }
        })
        setList(list)
        setSearch(list)
    }, [registry])

    return (
        <Container>
            <Search registrys={list} onChange={setSearch} />
            <List
                data={search}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item }) => (
                    <RegistryItem data={item} />
                )}
            />
        </Container>
    )
}