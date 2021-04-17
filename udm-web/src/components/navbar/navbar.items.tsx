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
    Slide,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarMenu } from "./navbar.menu";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useCurrentUserQuery } from "../../graphql/graphql";

export const NavbarItems = () => {
    const { data, loading } = useCurrentUserQuery({
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
                    >{`${data.currentUser.firstName} ${data.currentUser.lastName}`}</Text>
                    <Avatar
                        src="http://localhost:5000/media/images/avatars/9681727f-11af-424c-8a54-942f9321fc48/avatar.jpg"
                        alt={data.currentUser.firstName}
                    />
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
            >
                <GiHamburgerMenu />
            </Box>
            <Slide in={isOpen} direction="top" style={{ zIndex: 10 }}>
                <NavbarMenu toggle={toggle} user={data?.currentUser} />
            </Slide>
        </>
    );
};
