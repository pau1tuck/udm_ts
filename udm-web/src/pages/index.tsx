import React from "react";
import Layout, { siteTitle } from "../components/layout";
import { withApollo } from "../utils/with-apollo";

const Home = () => {
    return (
        <Layout home>
            <div>Hello, Bastard.</div>
        </Layout>
    );
};

export default withApollo({ ssr: false })(Home);
