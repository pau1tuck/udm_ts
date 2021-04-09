import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMediaQuery } from "@chakra-ui/react";
import logoStyles from "../styles/components/logo.module.css";
import { Subheader } from "./subheader";

export const Logo = () => {
    const [isMobile] = useMediaQuery("(max-width: 30em)");
    return (
        <Box mb={7} align="center" justifyContent="center">
            <Link href="/">
                <Box as="button" zIndex="10">
                    <Image
                        src="/images/udm-logo.png"
                        alt="UDM"
                        width={225}
                        height={180}
                    />
                </Box>
            </Link>
            <Subheader />
        </Box>
    );
};
