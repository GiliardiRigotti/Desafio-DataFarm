import { useState } from "react";
import { Box, Container, ItemList, ItemTitle, List, Title } from "./styles";
import { ISelect } from "../../interfaces/select";
import Svg, { Path } from "react-native-svg"
import { colors } from "../../constants/colors";
import { IconSvg } from "../IconSVG";

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
        console.log(item.icon)
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
                <Box>
                    <List
                        data={list}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ItemList style={{
                                backgroundColor: item.name == selectedText ? colors.greenLight : "white"
                            }} onPress={() => handleSelected(item)}>
                                {
                                    item.icon &&
                                    <IconSvg svg={item.icon} />
                                }
                                <ItemTitle>{item.name}</ItemTitle>
                            </ItemList>
                        )}
                    />
                </Box>
            </Container>
        </>
    )
}