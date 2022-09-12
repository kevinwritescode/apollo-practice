import { gql } from 'apollo-server-express';
import { Team } from '../_typedefs/gql-types.js';

export const typeDef = gql`
    type User {
        id: ID!
        name: String!
        city: String!
        country: String!
        "ISO 3166-1 Alpha-2 code format like US"
        countryCode: String!
        "Integer offset from UTC like -5 for Central"
        timezone: Int!
        team: Team
    }

    input LoginUserInput {
        id: ID!
        hash: String!
    }

    type LoginUserPayload {
        token: String!
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
        },
    },
};
