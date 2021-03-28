import React, { useState } from "react";
import Image from "next/image";
import {
    Avatar,
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
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useCurrentUserQuery } from "../../graphql/graphql";

export const NavbarItems = () => {
    const { data, loading } = useCurrentUserQuery({
        fetchPolicy: "cache-first",
    });
    const apolloClient = useApolloClient();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let body = null;
    if (loading) {
    } else if (!data?.currentUser) {
        body = (
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
            </>
        );
    } else {
        body = (
            <>
                <Box
                    display={["none", "none", "flex", "flex"]}
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
