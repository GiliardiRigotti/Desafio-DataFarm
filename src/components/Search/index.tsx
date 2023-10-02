import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Container, TextInput } from "./styles";
import { colors } from '../../constants/colors';
import { IRegistry } from '../../interfaces/registry';
import { useState } from 'react';

interface Props {
    registrys: IRegistry[]
    onChance: () => void
}

export function Search({ registrys, onChance }: Props) {
    const [searchText, setSearchText] = useState<string>("")

    const contains = ({ note }: IRegistry, query: string) => {

        if (note.includes(query)) {
            return true;
        }

        return false;
    };

    function handleSearch() {
        const registryFiltered = registrys.filter((registry) => {
            return contains(registry, searchText)
        })
        console.log(registryFiltered)
    }

    return (
        <Container>
            <Icon name='magnify' size={20} color={colors.gray} />
            <TextInput onChangeText={setSearchText} onEndEditing={handleSearch} />
        </Container>
    )
}