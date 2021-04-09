import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import logoStyles from "../styles/components/logo.module.css";

export const Subheader = () => {
    return (
        <Box justifyContent="center">
            <Box mt="-10px" zIndex="11">
                <img
                    className={logoStyles.title}
                    src="/images/udm-title.png"
                    alt="UNDERGROUND DANCE MUSIC"
                />
            </Box>
        </Box>
    );
};
