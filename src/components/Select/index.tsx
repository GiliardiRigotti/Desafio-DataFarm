import { useState } from "react";
import { ButtonClose, Container, ItemList, ItemTitle, List, ModalContainerTitle, ModalListOptions, ModalTitle, SelectContainer, SelectText, Title, styles } from "./styles";
import { Modal, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { colors } from "../../constants/colors";
import { ISelect } from "../../interfaces/select";

interface Props {
    title: string
    placeholder?: string
    list: ISelect[]
    width?: number
    onChance: (id: number) => void
}

export default function Select({ title, placeholder, list, width = 80, onChance }: Props) {
    const [select, setSelect] = useState<boolean>(false)
    const [selectedText, setSelectedText] = useState<string>()

    function handleSelected(item: ISelect) {
        onChance(item.id)
        setSelectedText(item.name)
        setSelect(!select)
    }
    return (
        <>
            <Container onPress={() => setSelect(!select)} style={{ width: `${width}%` }}>
                <Title>
                    {title}
                </Title>
                <SelectContainer>
                    {
                        selectedText ?
                            <SelectText>
                                {selectedText}
                            </SelectText>
                            :
                            <SelectText>
                                Selecionar
                            </SelectText>
                    }

                    <Icon name='chevron-down' size={20} color={colors.gray} />
                </SelectContainer>
            </Container>
            <Modal
                transparent
                visible={select}
            >
                <ModalListOptions style={[styles.shadow]}>
                    <ModalContainerTitle>
                        <ModalTitle>
                            {title}
                        </ModalTitle>
                        <ButtonClose onPress={() => setSelect(!select)}>
                            <Icon name='close' size={20} />
                        </ButtonClose>
                    </ModalContainerTitle>
                    <List
                        data={list}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ItemList onPress={() => handleSelected(item)}>
                                <ItemTitle>{item.name}</ItemTitle>
                            </ItemList>
                        )}
                    />
                </ModalListOptions>
            </Modal>
        </>
    )
}