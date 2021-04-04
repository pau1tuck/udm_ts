import React from "react";
// import Link from "next/link";
import {
    Box,
    Center,
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
import Layout from "../components/layout";
import { Subheader } from "../components/subheader";
import { Navigation } from "../components/navigation";
import { withApollo } from "../utils/with-apollo";
import { TrackCard } from "../components/track/track.card";

import { dummyData } from "../dummy-data";

const Home = () => {
    const cards = dummyData.map((track, key) => (
        <TrackCard track={track} key={key} />
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
                    <Flex justifyContent="center" wrap="wrap">
                        {cards}
                    </Flex>
                </Box>
            </Container>
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
