import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

export const NowPlaying = ({ nowPlaying }) => {
    return (
        <Box ml={2} fontWeight="600">
            {nowPlaying.filename ? (
                <Box fontSize={["sm", "md", "md", "lg"]} isTruncated>
                    <Text as="span">{`${nowPlaying.artist}`}</Text>
                    <Text
                        as="span"
                        color="pumpkin.200"
                    >{` - ${nowPlaying.title}`}</Text>
                    {nowPlaying.version ? (
                        <Text
                            as="span"
                            color="primary.300"
                        >{` (${nowPlaying.version})`}</Text>
                    ) : null}
                </Box>
            ) : null}
        </Box>
    );
};
