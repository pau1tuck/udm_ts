import React from "react";
import {
    Box,
    Container,
    Grid,
    GridItem,
    useMediaQuery,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import { Subheader } from "../components/subheader";
import { withApollo } from "../utils/with-apollo";

const Home = () => {
    const [sm] = useMediaQuery("");
    return (
        <Layout home>
            <Container maxW="62em">
                <Subheader />
                <Grid
                    display={["none", "none", "none", "grid"]}
                    h="500px"
                    mb={12}
                    templateRows="repeat(4, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={4}
                >
                    <GridItem rowSpan={4} colSpan={1} bg="gray.900" />
                    <GridItem rowSpan={2} colSpan={4} bg="gray.900" />
                    <GridItem rowSpan={2} colSpan={4} bg="gray.900" />
                </Grid>
            </Container>
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
