import React from "react";
import NextLink from "next/link";
import {
    Box,
    ButtonGroup,
    Button,
    Container,
    Divider,
    Link,
    Flex,
    Slide,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

export const NavbarMenu = ({ toggle, user }) => {
    const [isLoading, setIsLoading] = React.useState({
        loginButton: false,
        signUpButton: false,
    });
    return (
        <Box
            width="100%"
            m={0}
            pb={12}
            bg="black"
            align="center"
            justify="center"
        >
            <Box
                align="right"
                pt={3}
                pr={4}
                onClick={toggle}
                opacity="0.8"
                fontSize="1.8rem"
            >
                <IoMdClose />
            </Box>
            <Box>
                <ButtonGroup>
                    <Stack
                        spacing={4}
                        align="center"
                        justify="center"
                        direction="column"
                        pt={2}
                        textAlign="center"
                    >
                        <Button size="md" colorScheme="primary">
                            <Text fontFamily="Quicksand" fontWeight="700">
                                SIGN UP
                            </Text>
                        </Button>
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
                        <Divider />
                        <Text fontFamily="Quicksand" fontWeight="700">
                            Latest Tunes
                        </Text>
                        <Text fontFamily="Quicksand" fontWeight="700">
                            All Tracks
                        </Text>
                    </Stack>
                </ButtonGroup>
            </Box>
        </Box>
    );
};
