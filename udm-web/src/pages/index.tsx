import React, { useState, useRef } from "react";
import { gql } from "@apollo/client";
import { Box, Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import Layout from "../components/layout";
import { Tagline } from "../components/tagline";
import { Navigation } from "../components/navigation";
import { withApollo } from "../utils/with-apollo";
import { TrackCard } from "../components/track/track.card";
import playerStyles from "../styles/components/player.module.css";
import { RiPlayCircleFill } from "react-icons/ri";
import { RiPauseCircleFill } from "react-icons/ri";
import { nowPlayingVar } from "../utils/with-apollo";
import { NowPlaying } from "../components/track/track.now-playing";
import PlayPauseButton from "../components/player/player.playpause-button";

import { useTracksQuery } from "../graphql/graphql";
import { ITrack } from "~types/track.types";

export const NOW_PLAYING = gql`
    query NowPlaying {
        nowPlaying @client
    }
`;

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        id: null,
    });

    const myAudio = useRef();

    const { loading, error, data, fetchMore, variables } = useTracksQuery({
        // fetchPolicy: "cache-first",
        variables: {
            limit: 6,
        },
        notifyOnNetworkStatusChange: true,
    });

    const onChangeTrack = (track: ITrack) => {
        setCurrentTrack({ ...track });
        setIsPlaying(true);
    };

    if (!data && loading) {
        <div>Loading...</div>;
    }
    let cards: any;
    if (data) {
        cards = data.tracks.payload.map((track: ITrack, key: number) => (
            <TrackCard
                key={key}
                track={track}
                handleChangeTrack={onChangeTrack}
            />
        ));
    }

    const playPause = (myAudio) => {
        if (isPlaying) {
            myAudio.current.pause();
            setIsPlaying(false);
        } else if (currentTrack.id) {
            myAudio.current.play();
            setIsPlaying(true);
        } else return;
    };

    return (
        <Layout home>
            <Container maxW={"62em"} justifyContent="center">
                <Tagline />
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
                    display={["flex", "flex", "flex", "none"]}
                    flexWrap="wrap"
                    w="100%"
                    justifyContent="center"
                    wrap="wrap"
                >
                    {cards}
                </Box>
            </Container>
            {currentTrack.trackId !== 0 && (
                <div>
                    <Box
                        position="fixed"
                        display="flex"
                        maxWidth="100vw"
                        height="40px"
                        bottom="0px"
                        left="0px"
                        right="0px"
                        pb="7px"
                        alignItems="center"
                        borderTopWidth="2px"
                        borderTopColor="#161616"
                        backgroundColor="#111111"
                        opacity="0.9"
                    >
                        <div>
                            <Box
                                display="flex"
                                h="50px"
                                ml={1}
                                pb={1}
                                alignItems="center"
                                cursor="pointer"
                                fontSize="2.5rem"
                            >
                                <Box
                                    onClick={() => {
                                        playPause(myAudio);
                                    }}
                                    pt={1}
                                >
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
                            </Box>
                        </div>
                        <NowPlaying nowPlaying={currentTrack} />
                    </Box>
                    <audio
                        src={`${process.env.NEXT_PUBLIC_HOST}/media/audio/${currentTrack.trackId}.mp3`}
                        ref={myAudio}
                        autoPlay
                        style={{ visibility: "hidden" }}
                    ></audio>
                </div>
            )}
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
