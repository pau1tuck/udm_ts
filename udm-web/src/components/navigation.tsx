import React from "react";
import NextLink from "next/link";
import {
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

export const Navigation = () => {
    return (
        <Stack
            mt={6}
            spacing={4}
            fontFamily="Montserrat"
            fontWeight="600"
            fontSize="large"
        >
            <NextLink href="/" passHref>
                <Link>Latest Tunes</Link>
            </NextLink>
        </Stack>
    );
};
