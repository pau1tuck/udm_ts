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

import { dummyData } from "../dummy-data";
import { useTracksQuery } from "../graphql/graphql";

import { Media, Player, controls, withMediaProps } from "react-media-player";
const { PlayPause, MuteUnmute } = controls;
import PlayPauseButton from "../components/player/player.playpause-button";

export const NOW_PLAYING = gql`
    query NowPlaying {
        nowPlaying @client
    }
`;

interface ITrack {
    id: string;
    artist: string;
    title: string;
    version?: string;
    label: string;
    month: number;
    year: number;
    youTubeId: string;
    buyUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
}

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const myAudio = useRef();

    const [currentTrack, setCurrentTrack] = useState({
        id: "",
        title: "",
        artist: "",
        label: "",
        month: 0,
        year: 0,
        youTubeId: "",
        buyUrl: "",
        createdAt: "",
        updatedAt: "",
        votes: 0,
    });

    const { loading, error, data, fetchMore, variables } = useTracksQuery({
        // fetchPolicy: "cache-first",
        variables: {
            limit: 6,
        },
        notifyOnNetworkStatusChange: true,
    });

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

    const onChangeTrack = () => {
        return 0;
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
            {/*
            <Box>
                <Media>
                    <div className="media">
                        <Box visibility="hidden">
                            <Player
                                src={`http://www.youtube.com/embed/${currentTrack.youTubeId}`}
                            />
                        </Box>
                        <div className="media-controls">
                            <PlayPauseButton />
                        </div>
                    </div>
                </Media>
            </Box>
            */}
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
