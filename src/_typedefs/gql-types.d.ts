export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type LoginUserInput = {
  hash: Scalars['String'];
  id: Scalars['ID'];
};

export type LoginUserPayload = {
  __typename?: 'LoginUserPayload';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTeam: CreateTeamPayload;
  createUser: CreateUserPayload;
  /** Authenticate self with ID and Hash (Not a real world auth example!) */
  login: LoginUserPayload;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};

/** Primary query for all requests */
export type Query = {
  __typename?: 'Query';
  /** Public access test call */
  hello: Scalars['String'];
  /** Once authenticated, return User details */
  me: User;
  /** Once authenticated, return list of teams */
  teams: Array<Maybe<Team>>;
  /** Once authenticated, look up another user */
  user: User;
};

/** Friendships last forever */
export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  /** Full name with no current restrictions */
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  city: Scalars['String'];
  country: Scalars['String'];
  /** ISO 3166-1 Alpha-2 code format like US */
  countryCode: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  team?: Maybe<Team>;
  /** Integer offset from UTC like -5 for Central */
  timezone: Scalars['Int'];
};
