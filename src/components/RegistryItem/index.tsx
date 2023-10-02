import { IRegistryItem } from "../../interfaces/registry";
import { IconSvg } from "../IconSVG";
import { Container, Description, Title, Wrapper, DateLabel, DateText } from "./styles";

interface Props {
    data: IRegistryItem
}
export function RegistryItem({ data }: Props) {
    const dataNumber = parseInt(data.created)
    const date = new Date(dataNumber)
    const dateFormatted = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    return (
        <Container>
            <IconSvg svg={data.reason.icon} />
            <Wrapper>
                <Title>
                    {data.farm.name}
                </Title>
                <Description>
                    {
                        data.note ?
                            data.note
                            :
                            data.reason.name
                    }
                </Description>
            </Wrapper>
            {
                data.created &&
                <DateLabel>
                    <DateText>
                        {dateFormatted}
                    </DateText>
                </DateLabel>
            }
        </Container>
    )
}