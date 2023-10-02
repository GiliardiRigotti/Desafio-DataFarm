import { useState } from "react";
import { Container, ItemList, ItemTitle, List, Title } from "./styles";
import { ISelect } from "../../interfaces/select";
import Svg, { Path } from "react-native-svg"
import { colors } from "../../constants/colors";

interface Props {
    title: string
    placeholder?: string
    list: ISelect[]
    width?: number
    onChance: (id: number) => void
}

export default function ListItems({ title, list, width = 80, onChance }: Props) {
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
                <List
                    data={list}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ItemList style={{
                            backgroundColor: item.name == selectedText ? colors.greenLight : "white"
                        }} onPress={() => handleSelected(item)}>
                            {
                                item.icon &&
                                <Svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                >
                                    <Path d={item.icon} fill="#000" />
                                </Svg>
                            }
                            <ItemTitle>{item.name}</ItemTitle>
                        </ItemList>
                    )}
                />
            </Container>
        </>
    )
}