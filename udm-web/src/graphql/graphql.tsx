import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import * as ApolloReactHoc from "@apollo/client/react/hoc";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The `Upload` scalar type represents a file upload. */
    Upload: any;
};

export type Mutation = {
    __typename?: "Mutation";
    register: Scalars["Boolean"];
    login?: Maybe<User>;
    logout: Scalars["Boolean"];
    updateUser?: Maybe<User>;
    uploadAvatar: Scalars["Boolean"];
    deleteUser: Scalars["Boolean"];
    createTrack: Track;
    updateTrack?: Maybe<Track>;
    deleteTrack: Scalars["Boolean"];
};

export type MutationRegisterArgs = {
    isAdmin: Scalars["Boolean"];
    password: Scalars["String"];
    email: Scalars["String"];
    country: Scalars["String"];
    lastName: Scalars["String"];
    firstName: Scalars["String"];
};

export type MutationLoginArgs = {
    password: Scalars["String"];
    email: Scalars["String"];
};

export type MutationUpdateUserArgs = {
    country: Scalars["String"];
    lastName: Scalars["String"];
    firstName: Scalars["String"];
    id: Scalars["String"];
};

export type MutationUploadAvatarArgs = {
    avatar: Scalars["Upload"];
    id: Scalars["String"];
};

export type MutationDeleteUserArgs = {
    id: Scalars["String"];
};

export type MutationCreateTrackArgs = {
    input: TrackInput;
};

export type MutationUpdateTrackArgs = {
    buyUrl: Scalars["String"];
    filename: Scalars["String"];
    image: Scalars["String"];
    id: Scalars["String"];
};

export type MutationDeleteTrackArgs = {
    id: Scalars["String"];
};

export type PaginatedTracks = {
    __typename?: "PaginatedTracks";
    tracks: Array<Track>;
    hasMore: Scalars["Boolean"];
};

export type Query = {
    __typename?: "Query";
    users: Array<User>;
    currentUser?: Maybe<User>;
    tracks: PaginatedTracks;
    track?: Maybe<Track>;
};

export type QueryTracksArgs = {
    limit: Scalars["Int"];
};

export type QueryTrackArgs = {
    id: Scalars["String"];
};

export type Track = {
    __typename?: "Track";
    id: Scalars["ID"];
    artist: Scalars["String"];
    title: Scalars["String"];
    version: Scalars["String"];
    label: Scalars["String"];
    image: Scalars["String"];
    filename: Scalars["String"];
    buyUrl: Scalars["String"];
    votes: Scalars["Int"];
    createdAt: Scalars["String"];
    updatedAt: Scalars["String"];
};

export type TrackInput = {
    artist: Scalars["String"];
    title: Scalars["String"];
    version: Scalars["String"];
    label: Scalars["String"];
    image: Scalars["String"];
    filename: Scalars["String"];
    buyUrl: Scalars["String"];
};

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    firstName: Scalars["String"];
    lastName: Scalars["String"];
    country: Scalars["String"];
    avatar: Scalars["String"];
    email: Scalars["String"];
    isAdmin: Scalars["Boolean"];
    createdAt: Scalars["String"];
    updatedAt: Scalars["String"];
};

export type CreateTrackMutationVariables = Exact<{
    input: TrackInput;
}>;

export type CreateTrackMutation = { __typename?: "Mutation" } & {
    createTrack: { __typename?: "Track" } & Pick<
        Track,
        | "id"
        | "artist"
        | "title"
        | "version"
        | "label"
        | "image"
        | "filename"
        | "createdAt"
        | "updatedAt"
        | "votes"
    >;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
    currentUser?: Maybe<
        { __typename?: "User" } & Pick<
            User,
            "id" | "firstName" | "lastName" | "country" | "email" | "isAdmin"
        >
    >;
};

export type LoginMutationVariables = Exact<{
    email: Scalars["String"];
    password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
    login?: Maybe<
        { __typename?: "User" } & Pick<
            User,
            "id" | "firstName" | "lastName" | "country" | "email" | "isAdmin"
        >
    >;
};

export const CreateTrackDocument = gql`
    mutation CreateTrack($input: TrackInput!) {
        createTrack(input: $input) {
            id
            artist
            title
            version
            label
            image
            filename
            createdAt
            updatedAt
            votes
        }
    }
`;
export type CreateTrackMutationFn = Apollo.MutationFunction<
    CreateTrackMutation,
    CreateTrackMutationVariables
>;
export type CreateTrackProps<
    TChildProps = {},
    TDataName extends string = "mutate"
> = {
    [key in TDataName]: Apollo.MutationFunction<
        CreateTrackMutation,
        CreateTrackMutationVariables
    >;
} &
    TChildProps;
export function withCreateTrack<
    TProps,
    TChildProps = {},
    TDataName extends string = "mutate"
>(
    operationOptions?: ApolloReactHoc.OperationOption<
        TProps,
        CreateTrackMutation,
        CreateTrackMutationVariables,
        CreateTrackProps<TChildProps, TDataName>
    >
) {
    return ApolloReactHoc.withMutation<
        TProps,
        CreateTrackMutation,
        CreateTrackMutationVariables,
        CreateTrackProps<TChildProps, TDataName>
    >(CreateTrackDocument, {
        alias: "createTrack",
        ...operationOptions,
    });
}

/**
 * __useCreateTrackMutation__
 *
 * To run a mutation, you first call `useCreateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackMutation, { data, loading, error }] = useCreateTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTrackMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateTrackMutation,
        CreateTrackMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        CreateTrackMutation,
        CreateTrackMutationVariables
    >(CreateTrackDocument, options);
}
export type CreateTrackMutationHookResult = ReturnType<
    typeof useCreateTrackMutation
>;
export type CreateTrackMutationResult = Apollo.MutationResult<CreateTrackMutation>;
export type CreateTrackMutationOptions = Apollo.BaseMutationOptions<
    CreateTrackMutation,
    CreateTrackMutationVariables
>;
export const CurrentUserDocument = gql`
    query CurrentUser {
        currentUser {
            id
            firstName
            lastName
            country
            email
            isAdmin
        }
    }
`;
export type CurrentUserProps<
    TChildProps = {},
    TDataName extends string = "data"
> = {
    [key in TDataName]: ApolloReactHoc.DataValue<
        CurrentUserQuery,
        CurrentUserQueryVariables
    >;
} &
    TChildProps;
export function withCurrentUser<
    TProps,
    TChildProps = {},
    TDataName extends string = "data"
>(
    operationOptions?: ApolloReactHoc.OperationOption<
        TProps,
        CurrentUserQuery,
        CurrentUserQueryVariables,
        CurrentUserProps<TChildProps, TDataName>
    >
) {
    return ApolloReactHoc.withQuery<
        TProps,
        CurrentUserQuery,
        CurrentUserQueryVariables,
        CurrentUserProps<TChildProps, TDataName>
    >(CurrentUserDocument, {
        alias: "currentUser",
        ...operationOptions,
    });
}

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
    baseOptions?: Apollo.QueryHookOptions<
        CurrentUserQuery,
        CurrentUserQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
        CurrentUserDocument,
        options
    );
}
export function useCurrentUserLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        CurrentUserQuery,
        CurrentUserQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
        CurrentUserDocument,
        options
    );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
    typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
    CurrentUserQuery,
    CurrentUserQueryVariables
>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            firstName
            lastName
            country
            email
            isAdmin
        }
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;
export type LoginProps<
    TChildProps = {},
    TDataName extends string = "mutate"
> = {
    [key in TDataName]: Apollo.MutationFunction<
        LoginMutation,
        LoginMutationVariables
    >;
} &
    TChildProps;
export function withLogin<
    TProps,
    TChildProps = {},
    TDataName extends string = "mutate"
>(
    operationOptions?: ApolloReactHoc.OperationOption<
        TProps,
        LoginMutation,
        LoginMutationVariables,
        LoginProps<TChildProps, TDataName>
    >
) {
    return ApolloReactHoc.withMutation<
        TProps,
        LoginMutation,
        LoginMutationVariables,
        LoginProps<TChildProps, TDataName>
    >(LoginDocument, {
        alias: "login",
        ...operationOptions,
    });
}

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
