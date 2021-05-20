import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  uploadAvatar: Scalars['Boolean'];
  createTrack: Track;
  updateTrack?: Maybe<Track>;
  deleteTrack: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  input: RegisterUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  password: Scalars['String'];
  input: RegisterUserInput;
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationUploadAvatarArgs = {
  avatar: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationCreateTrackArgs = {
  input: TrackInput;
};


export type MutationUpdateTrackArgs = {
  buyUrl: Scalars['String'];
  youTubeId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteTrackArgs = {
  id: Scalars['String'];
};

export type PaginatedTracks = {
  __typename?: 'PaginatedTracks';
  payload: Array<Track>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  currentUser?: Maybe<User>;
  tracks: PaginatedTracks;
  track?: Maybe<Track>;
};


export type QueryTracksArgs = {
  limit: Scalars['Int'];
};


export type QueryTrackArgs = {
  id: Scalars['String'];
};

export type RegisterUserInput = {
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
};

export type Track = {
  __typename?: 'Track';
  id: Scalars['ID'];
  artist: Scalars['String'];
  title: Scalars['String'];
  version: Scalars['String'];
  label: Scalars['String'];
  month: Scalars['Int'];
  year: Scalars['Int'];
  youTubeId: Scalars['String'];
  buyUrl: Scalars['String'];
  votes: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TrackInput = {
  artist: Scalars['String'];
  title: Scalars['String'];
  version: Scalars['String'];
  label: Scalars['String'];
  month: Scalars['Int'];
  year: Scalars['Int'];
  youTubeId: Scalars['String'];
  buyUrl: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  facebookId: Scalars['String'];
  googleId: Scalars['String'];
  twitterId: Scalars['String'];
  givenName: Scalars['String'];
  familyName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  roles?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateTrackMutationVariables = Exact<{
  input: TrackInput;
}>;


export type CreateTrackMutation = (
  { __typename?: 'Mutation' }
  & { createTrack: (
    { __typename?: 'Track' }
    & Pick<Track, 'id' | 'artist' | 'title' | 'version' | 'label' | 'month' | 'year' | 'youTubeId' | 'buyUrl' | 'createdAt' | 'updatedAt' | 'votes'>
  ) }
);

export type CurrentUserBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserBasicQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'givenName' | 'familyName' | 'roles'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'givenName' | 'familyName' | 'roles'>
  )> }
);

export type TracksQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type TracksQuery = (
  { __typename?: 'Query' }
  & { tracks: (
    { __typename?: 'PaginatedTracks' }
    & Pick<PaginatedTracks, 'hasMore'>
    & { payload: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'artist' | 'title' | 'version' | 'label' | 'month' | 'year' | 'youTubeId' | 'buyUrl' | 'votes' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);


export const CreateTrackDocument = gql`
    mutation CreateTrack($input: TrackInput!) {
  createTrack(input: $input) {
    id
    artist
    title
    version
    label
    month
    year
    youTubeId
    buyUrl
    createdAt
    updatedAt
    votes
  }
}
    `;
export type CreateTrackMutationFn = Apollo.MutationFunction<CreateTrackMutation, CreateTrackMutationVariables>;
export type CreateTrackProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateTrackMutation, CreateTrackMutationVariables>
    } & TChildProps;
export function withCreateTrack<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateTrackMutation,
  CreateTrackMutationVariables,
  CreateTrackProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateTrackMutation, CreateTrackMutationVariables, CreateTrackProps<TChildProps, TDataName>>(CreateTrackDocument, {
      alias: 'createTrack',
      ...operationOptions
    });
};

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
export function useCreateTrackMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrackMutation, CreateTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrackMutation, CreateTrackMutationVariables>(CreateTrackDocument, options);
      }
export type CreateTrackMutationHookResult = ReturnType<typeof useCreateTrackMutation>;
export type CreateTrackMutationResult = Apollo.MutationResult<CreateTrackMutation>;
export type CreateTrackMutationOptions = Apollo.BaseMutationOptions<CreateTrackMutation, CreateTrackMutationVariables>;
export const CurrentUserBasicDocument = gql`
    query CurrentUserBasic {
  currentUser {
    id
    givenName
    familyName
    roles
  }
}
    `;
export type CurrentUserBasicProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>
    } & TChildProps;
export function withCurrentUserBasic<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CurrentUserBasicQuery,
  CurrentUserBasicQueryVariables,
  CurrentUserBasicProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CurrentUserBasicQuery, CurrentUserBasicQueryVariables, CurrentUserBasicProps<TChildProps, TDataName>>(CurrentUserBasicDocument, {
      alias: 'currentUserBasic',
      ...operationOptions
    });
};

/**
 * __useCurrentUserBasicQuery__
 *
 * To run a query within a React component, call `useCurrentUserBasicQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserBasicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserBasicQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserBasicQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>(CurrentUserBasicDocument, options);
      }
export function useCurrentUserBasicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>(CurrentUserBasicDocument, options);
        }
export type CurrentUserBasicQueryHookResult = ReturnType<typeof useCurrentUserBasicQuery>;
export type CurrentUserBasicLazyQueryHookResult = ReturnType<typeof useCurrentUserBasicLazyQuery>;
export type CurrentUserBasicQueryResult = Apollo.QueryResult<CurrentUserBasicQuery, CurrentUserBasicQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    givenName
    familyName
    roles
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const TracksDocument = gql`
    query Tracks($limit: Int!) {
  tracks(limit: $limit) {
    payload {
      id
      artist
      title
      version
      label
      month
      year
      youTubeId
      buyUrl
      votes
      createdAt
      updatedAt
    }
    hasMore
  }
}
    `;
export type TracksProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<TracksQuery, TracksQueryVariables>
    } & TChildProps;
export function withTracks<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TracksQuery,
  TracksQueryVariables,
  TracksProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, TracksQuery, TracksQueryVariables, TracksProps<TChildProps, TDataName>>(TracksDocument, {
      alias: 'tracks',
      ...operationOptions
    });
};

/**
 * __useTracksQuery__
 *
 * To run a query within a React component, call `useTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTracksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTracksQuery(baseOptions: Apollo.QueryHookOptions<TracksQuery, TracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TracksQuery, TracksQueryVariables>(TracksDocument, options);
      }
export function useTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TracksQuery, TracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TracksQuery, TracksQueryVariables>(TracksDocument, options);
        }
export type TracksQueryHookResult = ReturnType<typeof useTracksQuery>;
export type TracksLazyQueryHookResult = ReturnType<typeof useTracksLazyQuery>;
export type TracksQueryResult = Apollo.QueryResult<TracksQuery, TracksQueryVariables>;