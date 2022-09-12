import { AuthenticationError } from 'apollo-server-core';
import { gql } from 'apollo-server-express';
import { validateOrThrow } from '../auth.js';
import { Team, User } from '../_typedefs/gql-types.js';

export const typeDef = gql`
    type Query {
        hello: String!
        me: User!
        teams: [Team]!
        user: User!
    }
`;

export const resolvers = {
    Query: {
        /**
         * Simple test method with public access
         */
        hello(): string {
            return 'hello';
        },

        /**
         * Return information about the users self
         * Requires authentication first to return the user's context
         */
        async me(parent, args, { user }): Promise<User> {
            if (!user) {
                throw new AuthenticationError('Invalid User session');
            }

            return user;
        },

        /**
         * Return a list of teams
         */
        async teams(parent, args, { user, dataSources }): Promise<Team[]> {
            validateOrThrow(user, 'Team');

            return dataSources.db.getTeams();
        },
    },
};
