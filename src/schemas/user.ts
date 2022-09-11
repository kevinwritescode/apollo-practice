import { gql } from 'apollo-server-express';
import { Team } from '../_typedefs/gql-types.js';

export const typeDef = gql`
    type User {
        id: ID!
        name: String!
        city: String!
        country: String!
        countryCode: String!
        timezone: Int!
        team: Team
    }

    input CreateUserInput {
        name: String!
        city: String!
        countryCode: String!
        timezone: Int
        teamId: Int
    }

    type CreateUserPayload {
        user: User
        error: Error
    }
`;

export const resolvers = {
    User: {
        async team(parent, args, { dataSources }): Promise<Team | undefined> {
            return dataSources.db.getTeam(parent.teamId);
        }
    }
}