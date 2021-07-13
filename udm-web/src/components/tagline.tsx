import React from "react";
import Typed from "react-typed";
import { Box, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import taglineStyles from "../styles/components/tagline.module.css";

export const Tagline = () => {
    return (
        <Flex
            display={["none", "flex", "flex", "flex"]}
            mt={4}
            mb={6}
            justifyContent="center"
            alignContent="center"
        >
            <Typed
                className={taglineStyles.typed}
                strings={[
                    "Delivering the finest new underground house and techno.",
                ]}
                typeSpeed={50}
            />
        </Flex>
    );
};
