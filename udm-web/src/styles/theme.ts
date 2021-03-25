import { extendTheme } from "@chakra-ui/react";
import { styles } from "./styles";
import { colors } from "./foundations/colors";
import { typography } from "./foundations/typography";

const theme = extendTheme({
    styles,
    colors,
    typography,
});

export default theme;
