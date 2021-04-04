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
import { nowPlayingVar } from "../utils/with-apollo";

import { dummyData } from "../dummy-data";

export const NOW_PLAYING = gql`
    query NowPlaying {
        nowPlaying @client
    }
`;

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [nowPlaying, setNowPlaying] = useState({
        title: "",
        artist: "",
        version: "",
        label: "",
        image: "",
        filename: "",
    });

    const myAudio = useRef();

    const handlePlayPause = () => {
        if (myAudio.current !== undefined) {
            myAudio.current.play();
        }
    };

    const cards = (
        <Flex justifyContent="center" wrap="wrap">
            {dummyData.map((track, key) => (
                <Box key={key} onClick={() => setNowPlaying(track)}>
                    <TrackCard track={track} />
                </Box>
            ))}
        </Flex>
    );

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
                        {cards}
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
                height="50px"
                bottom="0px"
                left="0px"
                right="0px"
                alignItems="center"
                backgroundColor="#1e1e1e"
            >
                <Box
                    display="flex"
                    h="50px"
                    ml={2}
                    alignItems="center"
                    cursor="pointer"
                    fontSize="2.5rem"
                    color="primary.400"
                    onClick={handlePlayPause}
                >
                    <RiPlayCircleFill />
                </Box>
                <Box ml={2}>
                    {nowPlaying.filename !== "" ? (
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
            </Box>
            <audio
                id="audio-player"
                ref={myAudio}
                src={`http://localhost:5000/media/audio/tracks/${nowPlaying.filename}`}
                autoPlay
                className={playerStyles.player}
            />
            )
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
