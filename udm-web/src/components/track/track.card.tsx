import React from "react";
import { Box, Grid, GridItem, Icon } from "@chakra-ui/react";
import "animate.css/animate.css";
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
            className="animate__animated animate__zoomIn"
        >
            <Grid h="310px" m={1} mb={4} templateRows="repeat(9, 1fr)">
                <Box onClick={() => handleChangeTrack(track)} cursor="pointer">
                    <GridItem rowSpan={4} align="center">
                        <Box w="237px" h="134px" align="center">
                            <img
                                src={`${process.env.NEXT_PUBLIC_HOST}/media/images/tracks/${track.trackId}.png`}
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
                        <Box pt="1px" pr={3} color="#383838">
                            <AiFillStar />
                        </Box>
                        <Box pr={3} color="#383838">
                            <HiThumbUp />
                        </Box>
                        <Box
                            as="a"
                            href={track.buyUrl}
                            target="_blank"
                            mt="-7px"
                        >
                            <Icon
                                aria-label="buy"
                                fontSize="1.4rem"
                                cursor="pointer"
                                _hover={{
                                    color: "white",
                                }}
                            >
                                <RiShoppingBasket2Fill />
                            </Icon>
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
};
