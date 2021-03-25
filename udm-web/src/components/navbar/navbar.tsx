import React, { useState } from "react";
import { Box, Container, Flex, Spacer } from "@chakra-ui/react";
import { Logo } from "./logo";
import { MenuButton } from "./menu-button";

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Box maxWidth="container.lg" margin="auto">
            <Flex
                as="nav"
                margin="0px"
                align="center"
                justify="space-between"
                wrap="wrap"
                color="white"
            >
                <Logo />
                <Box p="2">.</Box>
                <Spacer />
                <Box p="2">
                    <MenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
                </Box>
            </Flex>
        </Box>
    );
};
