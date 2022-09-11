import { gql } from 'apollo-server-express';
import { loginUser, validateOrThrow } from '../auth.js';
import { Args, DataSources } from '../_typedefs/db-types.js';
import { CreateUserInput, CreateUserPayload, LoginUserInput, LoginUserPayload } from '../_typedefs/gql-types.js';

export const typeDef = gql`
    type Mutation {
        login(input: LoginUserInput!): LoginUserPayload!
        createUser(input: CreateUserInput!): CreateUserPayload!
        createTeam(input: CreateTeamInput!): CreateTeamPayload!
    }
`;

export const resolvers = {
    Mutation: {
        /**
         * This is a very basic example of a login
         * TODO Implement a proper Passport / MFA / or email+password login combination
         * TODO consider never returning a token but using HTTP ONLY cookies
         */
        async login(parent, { input }: Args<LoginUserInput>, { dataSources }): Promise<LoginUserPayload> {
            const { id, hash } = input;
            const token = await loginUser(dataSources.db, id, hash);
            return { token };
        },

        async createUser(parent, { input }: Args<CreateUserInput>, { user, dataSources }: DataSources): Promise<CreateUserPayload> {
            validateOrThrow(user, 'User');

            const newUserId = await dataSources.db.createUser(input);
            const newUser = await dataSources.db.getUser(newUserId);
            return { user: newUser };
        },
    },
};
