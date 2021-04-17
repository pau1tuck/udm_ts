import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { styles } from "./styles";
import { colors } from "./foundations/colors";
import { typography } from "./foundations/typography";

const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
});

const theme = extendTheme({
    styles,
    colors,
    fonts: {
        body: "'Montserrat', sans-serif",
        track: "'Architects Daughter', sans-serif",
        heading: "'Montserrat', sans-serif",
        title: "'Michroma', monospace",
    },
    "::placeholder": {
        /* Chrome, Firefox, Opera, Safari 10.1+ */ color: "#CDC9C9 !important",
    },
    ":active": {
        /* Chrome, Firefox, Opera, Safari 10.1+ */ color: "yellow",
    },
    breakpoints,
});

export default theme;
