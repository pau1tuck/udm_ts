import React, { useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    Slide,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { NavbarMenuButton } from "./navbar.menu-button";

export const NavbarItems = () => {
    const [isMinWidthLg] = useMediaQuery("(min-width: 62em)");
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <Box display={{ base: "none", md: "block" }}>
                <ButtonGroup spacing="2">
                    <Button size="sm" colorScheme="white" variant="ghost">
                        <Text fontFamily="Quicksand" fontWeight="700">
                            LOG IN
                        </Text>
                    </Button>
                    <Button size="sm" colorScheme="primary">
                        <Text fontFamily="Quicksand" fontWeight="700">
                            SIGN UP
                        </Text>
                    </Button>
                </ButtonGroup>
            </Box>
            <NavbarMenuButton toggleMenu={toggleMenu} isOpen={isOpen} />
        </>
    );
};
