import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Container, TextInput } from "./styles";
import { colors } from '../../constants/colors';
import { IRegistry, IRegistryItem } from '../../interfaces/registry';
import { useEffect, useState } from 'react';

interface Props {
    registrys: IRegistryItem[]
    onChange: (registryItems: IRegistryItem[]) => void
}

export function Search({ registrys, onChange }: Props) {
    const [listSearch, setListSearch] = useState<IRegistryItem[]>([])

    function handleSearch(query: string) {
        const registryFiltered = registrys.filter((registry) => registry.reason.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || registry.note.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
        setListSearch(registryFiltered)
    }

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(listSearch)
        }
    }, [listSearch])

    return (
        <Container>
            <Icon name='magnify' size={20} color={colors.gray} />
            <TextInput onChangeText={handleSearch} />
        </Container>
    )
}