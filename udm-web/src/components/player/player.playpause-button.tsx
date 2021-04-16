import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { withMediaProps } from "react-media-player";

const PlayPauseButton = (props: any) => {
    const { media } = props;

    const handlePlayPause = () => {
        media.playPause();
    };

    return (
        <Button type="button" onClick={handlePlayPause}>
            {media.isPlaying ? "Pause" : "Play"}
        </Button>
    );
};

export default withMediaProps(PlayPauseButton);
