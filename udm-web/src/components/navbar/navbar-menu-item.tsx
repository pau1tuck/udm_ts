import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";

interface IMenuItem {
    children: any;
    isLast?: boolean;
    to: string;
}

export const NavbarMenuItem = ({
    children,
    isLast,
    to = "/",
    ...rest
}: IMenuItem) => {
    return (
        <Link href={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    );
};
