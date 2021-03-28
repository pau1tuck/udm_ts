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
                <GridItem rowSpan={4} align="center">
                    <Box
                        w="237px"
                        h="134px"
                        align="center"
                        backgroundColor="black"
                    >
                        <img src="https://i.ytimg.com/vi/NIdUMZfn-18/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBKTwxV41emvbCbl9CM-JR2Cxepqw" />
                    </Box>
                </GridItem>
                <GridItem rowSpan={4}>
                    <Stack
                        mt={1}
                        spacing={1}
                        fontFamily="track"
                        fontSize="0.9rem"
                    >
                        <Text>Tears of the Fallen Angel (Extended Mix)</Text>
                        <Text>Marc Brauner, Muhammad Ali Shawal</Text>
                        <Text>SHALL NOT FADE</Text>
                    </Stack>
                </GridItem>
                <GridItem pb={2} rowSpan={1}>
                    <Text>👍</Text>
                </GridItem>
            </Grid>
        </Box>
    );
};
