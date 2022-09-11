import { gql } from 'apollo-server-express';

export const typeDef = gql`
    type Error {
        code: Int!
        message: String
    }
`;
