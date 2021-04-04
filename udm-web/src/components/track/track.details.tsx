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

export const TrackDetails = ({ track }) => {
    return (
        <Stack
            spacing={1}
            textAlign="center"
            fontFamily="track"
            fontSize="0.9rem"
        >
            <Text color="pumpkin.300">{track.title}</Text>
            {track.version ? (
                <Text color="primary.400">({track.version})</Text>
            ) : null}
            <Text>{track.artist}</Text>
            <Text fontSize="sm" color="secondary.300">
                [{track.label}]
            </Text>
        </Stack>
    );
};
