import React, { useState } from "react";
import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Stack,
    Text,
    useMediaQuery,
} from "@chakra-ui/react";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { HiThumbUp } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import trackCardStyles from "../../styles/components/track-card.module.css";
import { TrackDetails } from "./track.details";

export const TrackCard = ({ track, handleChangeTrack }) => {
    return (
        <Box
            w="246px"
            h="310px"
            mr={2}
            mb={4}
            pt="1px"
            align="center"
            bgColor="#111111"
            opacity="0.9"
            borderRadius={6}
        >
            <Grid h="310px" m={1} mb={4} templateRows="repeat(9, 1fr)">
                <Box onClick={() => handleChangeTrack(track)} cursor="pointer">
                    <GridItem rowSpan={4} align="center">
                        <Box w="237px" h="134px" align="center">
                            <img
                                src={track.image}
                                className={trackCardStyles.image}
                            />
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
    );
};
