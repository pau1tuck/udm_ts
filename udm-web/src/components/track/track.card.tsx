import React, { useState } from "react";
import {
    Box,
    Container,
    Flex,
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

import { dummyData } from "../../dummy-data";
import { TrackDetails } from "./track.details";

export const TrackCard = () => {
    const data = dummyData;
    return (
        <>
            {data.map((track, key) => (
                <Box
                    w="246px"
                    h="310px"
                    mr={2}
                    mb={4}
                    align="center"
                    bgColor="#0d0d0d"
                    opacity="0.9"
                    borderRadius={6}
                >
                    <Grid h="310px" m={1} mb={4} templateRows="repeat(9, 1fr)">
                        <Box key={key} cursor="pointer">
                            <GridItem rowSpan={4} align="center">
                                <Box w="237px" h="134px" align="center">
                                    <img src={track.image} />
                                </Box>
                            </GridItem>
                            <GridItem rowSpan={4}>
                                <Box
                                    d="flex"
                                    h="140px"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <TrackDetails track={track} />
                                </Box>
                            </GridItem>
                        </Box>
                        <GridItem rowSpan={1}>
                            <Box
                                d="flex"
                                justifyContent="center"
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
            ))}
        </>
    );
};
