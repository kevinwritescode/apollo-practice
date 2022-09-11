export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type CreateTeamInput = {
    name: Scalars['String'];
};

export type CreateTeamPayload = {
    __typename?: 'CreateTeamPayload';
    error?: Maybe<Error>;
    team?: Maybe<Team>;
};

export type CreateUserInput = {
    city: Scalars['String'];
    countryCode: Scalars['String'];
    name: Scalars['String'];
    teamId?: InputMaybe<Scalars['Int']>;
    timezone?: InputMaybe<Scalars['Int']>;
};

export type CreateUserPayload = {
    __typename?: 'CreateUserPayload';
    error?: Maybe<Error>;
    user?: Maybe<User>;
};

export type Error = {
    __typename?: 'Error';
    code: Scalars['Int'];
    message?: Maybe<Scalars['String']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createTeam: CreateTeamPayload;
    createUser: CreateUserPayload;
};

export type MutationCreateTeamArgs = {
    input: CreateTeamInput;
};

export type MutationCreateUserArgs = {
    input: CreateUserInput;
};

export type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    me: User;
    teams: Array<Maybe<Team>>;
    user: User;
};

export type Team = {
    __typename?: 'Team';
    id: Scalars['ID'];
    name: Scalars['String'];
};

export type User = {
    __typename?: 'User';
    city: Scalars['String'];
    country: Scalars['String'];
    countryCode: Scalars['String'];
    id: Scalars['ID'];
    name: Scalars['String'];
    team?: Maybe<Team>;
    timezone: Scalars['Int'];
};
