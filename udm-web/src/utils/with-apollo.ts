import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { withApollo as nextWithApollo } from "next-apollo";
import { PaginatedTracks } from "../graphql/graphql";
import { NextPageContext } from "next";

export const nowPlayingVar = makeVar("");

const createClient = (ctx: NextPageContext) =>
    new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_HOST}/graphql` as string,
        credentials: "include",
        headers: {
            cookie:
                (typeof window === "undefined"
                    ? ctx?.req?.headers.cookie
                    : undefined) || "",
                sameSite: "lax",
                secure: "auto",
        },
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        tracks: {
                            keyArgs: [],
                            merge(
                                existing: PaginatedTracks | undefined,
                                incoming: PaginatedTracks
                            ): PaginatedTracks {
                                return {
                                    ...incoming,
                                    payload: [
                                        ...(existing?.payload || []),
                                        ...incoming.payload,
                                    ],
                                };
                            },
                        },
                        nowPlaying: {
                            read() {
                                return nowPlayingVar();
                            },
                        },
                    },
                },
            },
        }),
    });

export const withApollo = nextWithApollo(createClient);
