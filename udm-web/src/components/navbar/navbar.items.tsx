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
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarMenu } from "./navbar.menu";

export const NavbarItems = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Box display={["none", "none", "none", "block"]}>
                <ButtonGroup mr={2} spacing={2}>
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
            <Box
                display={["block", "block", "block", "none"]}
                p={2}
                pr={3}
                onClick={toggle}
                opacity="0.8"
                fontSize="1.6rem"
            >
                <GiHamburgerMenu />
            </Box>
            <Slide in={isOpen} direction="top" style={{ zIndex: 10 }}>
                <NavbarMenu toggle={toggle} />
            </Slide>
        </>
    );
};
