import Head from "next/head";
import { Navbar } from "./navbar/navbar";
import { Logo } from "./logo";
import { Box } from "@chakra-ui/react";

export const siteTitle = "UDM | Underground Dance Music";

const Layout = ({
    children,
    size = "max",
    home,
}: {
    children: React.ReactNode;
    size?: string;
    home?: boolean;
}) => {
    return (
        <>
            <div>
                <Head>
                    <title>{siteTitle}</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="description"
                        content="Delivering the finest new underground house and techno."
                    />

                    <meta name="og:title" content={siteTitle} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <link href="/fonts/fonts.css" rel="stylesheet" />
                </Head>
                <Navbar />
                <Logo />

                <div>
                    <Box pb="75px">{children}</Box>
                </div>
            </div>
        </>
    );
};

export default Layout;
