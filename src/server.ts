import { ApolloServer, gql } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { SQLDataSource } from 'datasource-sql';
import express from 'express';
import http from 'http';
import Sqlite3 from 'sqlite3';
import typeDefs from './schema.js';
import { User, Team } from './database.js';
import { getUser } from './auth.js';
import { AuthenticationError } from 'apollo-server-core';


const sqlite3 = Sqlite3.verbose();

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        context: ({ req }) => {
            const token = req.headers.authorization ?? '';
            const user = getUser(User, token);
            return { user };
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        hello(parent, args, context, info) {
            return 'hello';    
        },
        me(parent, args, context, info) {
            if (!context.user) throw new AuthenticationError('Please login first');
            return context.user;
        },
        teams(parent, args, context, info): object[] {
            if (!context.user) throw new AuthenticationError('Please login first');
            return Team;
        },
    },
};

startApolloServer(typeDefs, resolvers);