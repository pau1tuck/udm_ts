import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { RiPlayCircleFill } from "react-icons/ri";
import { RiPauseCircleFill } from "react-icons/ri";
import { withMediaProps } from "react-media-player";

const PlayPauseButton = (isPlaying: boolean) => {
    return (
        <Box>
            {isPlaying ? (
                <Box color="lime.400">
                    <RiPauseCircleFill />
                </Box>
            ) : (
                <Box color="primary.400">
                    <RiPlayCircleFill />
                </Box>
            )}
        </Box>
    );
};

export default withMediaProps(PlayPauseButton);
