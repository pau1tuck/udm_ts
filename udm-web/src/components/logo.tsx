import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMediaQuery } from "@chakra-ui/react";
import logoStyles from "../styles/components/logo.module.css";
import { Subheader } from "./subheader";

export const Logo = () => {
    const [isMobile] = useMediaQuery("(max-width: 30em)");
    return (
        <Box pt={6} mb={7} align="center" justifyContent="center">
            <Link href="/">
                <Box as="button" zIndex="10">
                    <img
                        src="/images/udm-logo-web.png"
                        alt="UDM"
                        width="125px"
                        height="140px"
                    />
                </Box>
            </Link>
            <Subheader />
        </Box>
    );
};
