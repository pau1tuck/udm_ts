import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { colors } from "./foundations/colors";
import { typography } from "./foundations/typography";

const overrides = {
    useSystemColorMode: false,
    initialColorMode: "dark",
    styles,
    colors,
    typography,
};

export default extendTheme(overrides);
