import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { gql } from 'apollo-server-express';
import { hasPermission } from '../auth.js';
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
        hello(): string {
            return 'hello';
        },
        async me(parent, args, { user }): Promise<User> {
            if (!user) {
                throw new AuthenticationError('Invalid User session');
            }

            return user;
        },
        async teams(parent, args, { user, dataSources }): Promise<Team[]> {
            if (!hasPermission(user, 'Team')) {
                throw new ForbiddenError('User not allowed');
            }
            return dataSources.db.getTeams();
        },
    },
};
