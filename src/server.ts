/**
 * ✨ Let's build a NodeJS + Express + Apollo Server!
 */
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import http from 'http';
import { authorize } from './auth.js';
import DB from './database.js';
import schema from './schema.js';
import { prepareDb } from './_typedefs/prepare-db.js';

/**
 * 🏃‍♀️ Run at every reload to initialze express and database
 * @param schema
 */
async function startApolloServer(schema: GraphQLSchema) {
    console.log('🥳 Attmpting to start Server');

    // Initialize Routing + Databases
    const app = express();

    // Support CORS HTTP ONLY cookies for sessions
    app.use(cookieParser());

    // Simple redirect for CodeSandbox
    app.get('/', (req, res) => res.redirect('/graphql'));

    const httpServer = http.createServer(app);
    const db = new DB({
        client: 'sqlite3',
        connection: ':memory:',
        // @ts-ignore
        userNullAsDefault: true, // TODO I never got this warning to fix, explore sqlite3 lib
    });

    // TODO 💀 Never call this data mocking in production
    await prepareDb(db.getKnex());

    // For development, allow all origins
    // TODO If this went into production, create an approval list of origins
    const cors = {
        origin: process.env.NODE_ENV !== 'production',
        credentials: true,
    };

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        introspection: process.env.NODE_ENV !== 'production',
        dataSources: () => ({ db }),
        async context({ req, res }) {
            return {
                user: await authorize(req, db),
                res, // Needed to setup HTTP Only cookie during login() mutation
            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });

    // Start Express + Apollo server and listen
    await server.start();
    server.applyMiddleware({ app, cors });
    await new Promise<void>((resolve) => {
        console.log('listening');
        return httpServer.listen({ port: 4000 }, resolve);
    });

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

await startApolloServer(schema);
