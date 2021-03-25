import React, { useState } from "react";
import { Box, Container, Flex, Slide, Spacer, Stack } from "@chakra-ui/react";
import { NavbarLogo } from "./navbar.logo";
import { NavbarMenuButton } from "./navbar.menu-button";
import { NavbarMenu } from "./navbar.menu";

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Box maxWidth="container.lg" margin="auto">
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                w="100%"
                p={3}
                bg="tangerine.500"
                color="white"
            >
                <NavbarLogo />
                <Box p="2">.</Box>
                <Spacer />
                <NavbarMenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
                <Slide in={isOpen} direction="top" style={{ zIndex: 10 }}>
                    <Box
                        display={{
                            base: isOpen ? "block" : "none",
                            md: "block",
                        }}
                        flexBasis={{ base: "100%", md: "auto" }}
                    >
                        <NavbarMenu />
                    </Box>
                </Slide>
            </Flex>
        </Box>
    );
};
