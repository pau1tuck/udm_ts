import React from "react";
import Typed from "react-typed";
import { Box, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import subheaderStyles from "../styles/components/subheader.module.css";

export const Subheader = () => {
    return (
        <Flex
            mt={4}
            mb={6}
            ml={3}
            alignContent="center"
            justifyContent="space-between"
        >
            <Typed
                className={subheaderStyles.typed}
                strings={[
                    "Delivering the finest new underground house and techno.",
                ]}
                typeSpeed={50}
            />
        </Flex>
    );
};
