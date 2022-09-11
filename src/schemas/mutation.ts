import { gql } from 'apollo-server-express';

export const typeDef = gql`
    type Mutation {
        createUser(input: CreateUserInput!): CreateUserPayload!
        createTeam(input: CreateTeamInput!): CreateTeamPayload!
    }
`;