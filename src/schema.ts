import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        hello: String!
        me: User!
        teams: [Team]
    }

    type User {
        id: ID!
        name: String!
        city: String!
        country: String!
        countryCode: String!
        timezone: String!
        team: Team!
    }

    type Team {
        id: ID!
        name: String!
    }
`;

export default typeDefs;