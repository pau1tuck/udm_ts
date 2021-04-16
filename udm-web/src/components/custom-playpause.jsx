import React, { useState, useRef } from "react";
import {
    Box,
    Button,
} from "@chakra-ui/react";
import { Media, Player, controls, withMediaProps } from "react-media-player";

class CustomPlayPause extends React.Component {
    shouldComponentUpdate({ media }) {
        return this.props.media.isPlaying !== media.isPlaying;
    }

    _handlePlayPause = () => {
        this.props.media.playPause();
    };

    render() {
        const { className, style, media } = this.props;
        return (
            <Button
                type="button"
                className={className}
                style={style}
                onClick={this._handlePlayPause}
            >
                {media.isPlaying ? "Pause" : "Play"}
            </Button>
        );
    }
}

export default withMediaProps(CustomPlayPause);
