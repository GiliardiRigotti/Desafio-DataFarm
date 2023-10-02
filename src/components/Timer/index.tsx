import Icon from "@expo/vector-icons/MaterialCommunityIcons"

import { Button, Container, TimeLabel, TimeText } from "./styles";
import { colors } from "../../constants/colors";
import { useEffect, useState } from "react";

interface Props {
    onChange: (id: number) => void
}

export function Timer({ onChange }: Props) {
    const [timer, setTimer] = useState(10)

    function handleTimerAdd() {
        setTimer(prev => prev + 1)
    }

    function handleTimerSub() {
        if (timer < 2) {
            return
        }
        setTimer(prev => prev - 1)
    }

    useEffect(() => {
        if (typeof onChange === "function") {
            onChange(timer)
        }
    }, [timer])

    return (
        <Container disabled>
            <Button onPress={handleTimerAdd}>
                <Icon name="plus-circle-outline" size={25} color={colors.orange} />
            </Button>
            <TimeLabel>
                <TimeText>
                    {timer} min
                </TimeText>
            </TimeLabel>
            <Button onPress={handleTimerSub}>
                <Icon name="minus-circle-outline" size={25} color={colors.orange} />
            </Button>
        </Container>
    )
}