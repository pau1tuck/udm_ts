import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { RiPlayCircleFill } from "react-icons/ri";
import { RiPauseCircleFill } from "react-icons/ri";
import { withMediaProps } from "react-media-player";

const PlayPauseButton = (props: any) => {
    const { media } = props;

    const handlePlayPause = () => {
        media.playPause();
    };

    return (
        <div>
            <Box onClick={handlePlayPause}>
                {media.isPlaying ? (
                    <Box color="lime.400">
                        <RiPauseCircleFill />
                    </Box>
                ) : (
                    <Box color="primary.400">
                        <RiPlayCircleFill />
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default withMediaProps(PlayPauseButton);
