import React from "react";
import Typed from "react-typed";
import { Box, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import taglineStyles from "../styles/components/tagline.module.css";

export const Tagline = () => {
    return (
        <Flex
            mt={4}
            mb={6}
            ml={1}
            alignContent="center"
            justifyContent="space-between"
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
