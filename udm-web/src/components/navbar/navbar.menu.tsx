import React from "react";
import { Box, Container, Flex, Spacer, Stack } from "@chakra-ui/react";
import { NavbarMenuItem } from "./navbar.menu-item";

export const NavbarMenu = () => {
    return (
        <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
        >
            <NavbarMenuItem isLast to="/">
                Log in
            </NavbarMenuItem>
            <NavbarMenuItem to="/">SIGN UP</NavbarMenuItem>
        </Stack>
    );
};
