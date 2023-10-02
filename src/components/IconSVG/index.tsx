import Svg, { Path } from "react-native-svg"

interface Props {
    svg: string
}
export function IconSvg({ svg }: Props) {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
        >
            <Path d={svg} fill="#000" />
        </Svg>
    )
}