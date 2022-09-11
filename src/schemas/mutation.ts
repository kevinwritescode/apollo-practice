import { AuthenticationError, gql } from 'apollo-server-express';
import { validateOrThrow } from '../auth.js';
import { AppContext, Args } from '../_typedefs/db-types.js';
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
        async login(parent, { input }: Args<LoginUserInput>, { dataSources }: AppContext): Promise<LoginUserPayload> {
            const { id, hash } = input;
            const user = await dataSources.db.getUser(id);
            if (!hash || !user || user.hash !== hash) {
                throw new AuthenticationError('Invalid login credentials');
            }
            return { token: user.token };
        },

        /**
         * Create a new user if logged in
         * TODO explore advanced permissions for more dangerous mutations
         */
        async createUser(parent, { input }: Args<CreateUserInput>, { user, dataSources }: AppContext): Promise<CreateUserPayload> {
            validateOrThrow(user, 'User');

            const newUserId = await dataSources.db.createUser(input);
            const newUser = await dataSources.db.getUser(newUserId);
            return { user: newUser };
        },
    },
};
