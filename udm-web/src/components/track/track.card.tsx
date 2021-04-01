import React, { useState } from "react";
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Link,
    Stack,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { HiThumbUp } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";

export const TrackCard = () => {
    return (
        <Box
            w="15.4em"
            h="310px"
            mr={2}
            mb={4}
            align="center"
            bgColor="#0d0d0d"
            opacity="0.9"
            borderRadius={6}
        >
            <Grid h="310px" m={1} mb={4} templateRows="repeat(9, 1fr)">
                <Box cursor="pointer">
                    <GridItem rowSpan={4} align="center">
                        <Box w="237px" h="134px" align="center">
                            <img src="https://i.ytimg.com/vi/NIdUMZfn-18/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBKTwxV41emvbCbl9CM-JR2Cxepqw" />
                        </Box>
                    </GridItem>
                    <GridItem rowSpan={4}>
                        <Stack
                            mt={2}
                            spacing={1}
                            fontFamily="track"
                            fontSize="0.9rem"
                        >
                            <Text color="secondary.300">
                                Tears of the Fallen Angel
                            </Text>
                            <Text color="primary.400">(Extended Mix)</Text>
                            <Text>Marc Brauner, Muhammad Ali Shawal</Text>
                            <Text fontSize="sm" color="pumpkin.300">
                                [SHALL NOT FADE]
                            </Text>
                        </Stack>
                    </GridItem>
                </Box>
                <GridItem rowSpan={1}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        mt={3}
                        opacity="0.6"
                        fontSize="1.3rem"
                    >
                        <Box pt="1px" pr={2}>
                            <AiFillStar />
                        </Box>
                        <Box pr={2}>
                            <HiThumbUp />
                        </Box>
                        <Box>
                            <RiShoppingBasket2Fill />
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};
