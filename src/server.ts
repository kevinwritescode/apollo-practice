import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import Sqlite3 from 'sqlite3';
import typeDefs from './type-defs.js';
import resolvers from './resolvers.js';
import { getUser } from './auth.js';
import DB from './database.js';

const sqlite3 = Sqlite3.verbose();

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const db = new DB({
        client: 'sqlite3', 
        connection: ':memory:',
        // @ts-ignore
        userNullAsDefault: true
    });
    db.initialize();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        dataSources: () => ({ db }),
        context: async ({ req }) => {
            const token = req.headers.authorization ?? '';
            const user = await getUser(db, token);
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

startApolloServer(typeDefs, resolvers);