import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import logoStyles from "../styles/components/logo.module.css";

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
                    <img
                        className={logoStyles.title}
                        src="/images/udm-title.png"
                        alt="UNDERGROUND DANCE MUSIC"
                    />
                </Box>
            </Box>
        </Box>
    );
};
