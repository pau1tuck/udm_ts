import React, { useState, useRef } from "react";
import { gql } from "@apollo/client";
import {
    Box,
    Button,
    Center,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Layout from "../components/layout";
import { Subheader } from "../components/subheader";
import { Navigation } from "../components/navigation";
import { withApollo } from "../utils/with-apollo";
import { TrackCard } from "../components/track/track.card";
import playerStyles from "../styles/components/player.module.css";
import { RiPlayCircleFill } from "react-icons/ri";
import { RiPauseCircleFill } from "react-icons/ri";
import { nowPlayingVar } from "../utils/with-apollo";
import { NowPlaying } from "../components/track/track.now-playing";

import { dummyData } from "../dummy-data";

export const NOW_PLAYING = gql`
    query NowPlaying {
        nowPlaying @client
    }
`;

interface ITrack {
    id: string;
    artist: string;
    title: string;
    version: string;
    label: string;
    image: string;
    filename: string;
    buyUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
}

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        title: "",
        artist: "",
        version: "",
        label: "",
        image: "",
        filename: "",
        buyUrl: "",
    });

    const myAudio = useRef();

    const onChangeTrack = (track: ITrack) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const onPause = () => {
        if (myAudio.current !== undefined) {
            myAudio.current.pause();
            setIsPlaying(false);
        }
    };

    const cards = dummyData.map((track, key) => (
        <TrackCard key={key} track={track} handleChangeTrack={onChangeTrack} />
    ));

    return (
        <Layout home>
            <Container maxW={"62em"} justifyContent="center">
                <Subheader />
                <Grid
                    display={["none", "none", "none", "grid"]}
                    h="500px"
                    mb={12}
                    templateRows="repeat(4, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={4}
                >
                    <GridItem rowSpan={4} colSpan={1}>
                        <Navigation />
                    </GridItem>
                    <GridItem rowSpan={4} colSpan={4}>
                        <Flex wrap="wrap">{cards}</Flex>
                    </GridItem>
                </Grid>
                <Box
                    display={[
                        "inline-grid",
                        "inline-grid",
                        "inline-grid",
                        "none",
                    ]}
                    w="100%"
                    justifyContent="center"
                    wrap="wrap"
                >
                    {cards}
                </Box>
            </Container>
            <Box
                position="fixed"
                display="flex"
                maxWidth="100vw"
                height="40px"
                bottom="0px"
                left="0px"
                right="0px"
                pb="2px"
                alignItems="center"
                borderTopWidth="2px"
                borderTopColor="#161616"
                backgroundColor="#111111"
                opacity="0.9"
            >
                <Box
                    display="flex"
                    h="50px"
                    ml={1}
                    alignItems="center"
                    cursor="pointer"
                    fontSize="2.5rem"
                >
                    {isPlaying ? (
                        <Box onClick={onPause} color="lime.400">
                            <RiPauseCircleFill />
                        </Box>
                    ) : (
                        <Box color="primary.400">
                            <RiPlayCircleFill />
                        </Box>
                    )}
                </Box>
                <NowPlaying nowPlaying={currentTrack} />
            </Box>
            <audio
                id="audio-player"
                ref={myAudio}
                src={`http://localhost:5000/media/audio/tracks/${currentTrack.filename}`}
                autoPlay
                className={playerStyles.player}
            />
            )
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
