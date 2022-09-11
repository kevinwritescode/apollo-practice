import { gql } from 'apollo-server-express';

export const typeDef = gql`
    type Team {
        id: ID!
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