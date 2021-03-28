import React, { useState } from "react";
import { Box, Container, Flex, Slide, Spacer, Stack } from "@chakra-ui/react";
import { NavbarLogo } from "./navbar.logo";
import { NavbarItems } from "./navbar.items";
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
                pt={2}
                pr={2}
                color="white"
            >
                <Box>&nbsp;</Box>
                <NavbarLogo />
                <Spacer />
                <NavbarItems />
            </Flex>
        </Box>
    );
};
