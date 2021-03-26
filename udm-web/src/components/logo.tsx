import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";

export const Logo = () => {
    return (
        <Box mb={7} justifyContent="center">
            <Link href="/">
                <Box as="button" mt="-55px" zIndex="10">
                    <Image
                        src="/images/udm-logo.png"
                        alt="UDM"
                        width={300}
                        height={200}
                    />
                </Box>
            </Link>
            <Box justifyContent="center">
                <Box mt="-10px" zIndex="11">
                    <Image
                        src="/images/udm-title.png"
                        alt="UNDERGROUND DANCE MUSIC"
                        width={500}
                        height={100}
                    />
                </Box>
            </Box>
        </Box>
    );
};
