import React from "react";
// import Link from "next/link";
import {
    Box,
    Container,
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

const Home = () => {
    const [sm] = useMediaQuery("");
    return (
        <Layout home>
            <Container maxW={"62em"}>
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
                    <GridItem rowSpan={4} colSpan={4} bg="black"></GridItem>
                </Grid>
            </Container>
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
