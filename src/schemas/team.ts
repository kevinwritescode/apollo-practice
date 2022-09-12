import { gql } from 'apollo-server-express';

export const typeDef = gql`
    "Friendships last forever"
    type Team {
        id: ID!
        "Full name with no current restrictions"
        name: String!
    }

    input CreateTeamInput {
        name: String!
    }

    type CreateTeamPayload {
        team: Team
        error: Error
    }
`;
