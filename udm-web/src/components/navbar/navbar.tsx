import React, { useState } from "react";
import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "./logo";
import { MenuButton } from "./menu-button";

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div>
            <Container maxWidth="container.lg">
                <Flex
                    bg="pumpkin.500"
                    as="nav"
                    margin="0px"
                    align="center"
                    justify="space-between"
                    wrap="wrap"
                    color="white"
                    opacity="0.9"
                >
                    <Logo />
                    <Box p="1">.</Box>
                    <Spacer />
                    <Box p="1">
                        <MenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
                    </Box>
                </Flex>
            </Container>
        </div>
    );
};
