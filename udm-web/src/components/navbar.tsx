import React from "react";
import { Container, Flex } from "@chakra-ui/react";

export const Navbar = () => {
    return (
        <div>
            <Container maxWidth="1200px">
                <Flex
                    bg="pumpkin.500"
                    as="nav"
                    height="60px"
                    margin="0px"
                    align="center"
                    justify="space-between"
                    wrap="wrap"
                    color="white"
                    opacity="0.9"
                >
                    Navbar
                </Flex>
            </Container>
        </div>
    );
};
