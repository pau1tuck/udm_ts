import React from "react";
import { Box } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export const MenuButton = ({ toggleMenu, isOpen }) => {
    return (
        <Box display={{ base: "block", sm: "none" }} onClick={toggleMenu}>
            {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </Box>
    );
};
