import React, { useState } from "react";
import NextLink from "next/link";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Slide,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarMenu } from "./navbar.menu";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useCurrentUserBasicQuery } from "../../graphql/graphql";

export const NavbarItems = () => {
    const { data, loading } = useCurrentUserBasicQuery({
        fetchPolicy: "cache-first",
    });
    const apolloClient = useApolloClient();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState({
        loginButton: false,
        signUpButton: false,
    });

    const toggle = () => setIsOpen(!isOpen);

    let body = null;
    if (loading) {
    } else if (!data?.currentUser) {
        body = (
            <>
                <Box display={["none", "none", "none", "block"]}>
                    <ButtonGroup mt={1} mr={2} spacing={2}>
                        <NextLink href="/user/login" passHref>
                            <Link>
                                <Button
                                    size="sm"
                                    colorScheme="white"
                                    variant="ghost"
                                    fontFamily="Quicksand"
                                    fontWeight="700"
                                    isLoading={isLoading.loginButton}
                                    onClick={() => {
                                        setIsLoading({
                                            ...isLoading,
                                            loginButton: true,
                                        });
                                    }}
                                >
                                    LOG IN
                                </Button>
                            </Link>
                        </NextLink>

                        <Button
                            size="sm"
                            fontFamily="Quicksand"
                            fontWeight="700"
                            colorScheme="primary"
                        >
                            SIGN UP
                        </Button>
                    </ButtonGroup>
                </Box>
            </>
        );
    } else {
        body = (
            <>
                <Box
                    display={["none", "none", "flex", "flex"]}
                    pr={4}
                    alignItems="center"
                >
                    <Text
                        mr={2}
                        fontFamily="heading"
                        fontWeight="600"
                        fontSize="sm"
                    >{`${data.currentUser.givenName} ${data.currentUser.familyName}`}</Text>
                    <Menu>
                        <MenuButton
                            as={Avatar}
                            aria-label="Settings"
                            icon={
                                <Avatar
                                    src="http://localhost:5000/media/images/avatars/3/avatar.png"
                                    alt={data.currentUser.givenName}
                                />
                            }
                            cursor="pointer"
                        />
                        <MenuList fontSize="sm" color="black">
                            <MenuItem fontWeight="bold">
                                <NextLink href="/admin/add-track" passHref>
                                    <Link>Add Track</Link>
                                </NextLink>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </>
        );
    }

    return (
        <>
            {" "}
            {body}{" "}
            <Box
                display={["block", "block", "block", "none"]}
                p={2}
                pr={3}
                onClick={toggle}
                opacity="0.8"
                fontSize="1.6rem"
                cursor="pointer"
            >
                <GiHamburgerMenu />
            </Box>
            <Slide in={isOpen} direction="top" style={{ zIndex: 10 }}>
                <NavbarMenu toggle={toggle} user={data?.currentUser} />
            </Slide>
        </>
    );
};
