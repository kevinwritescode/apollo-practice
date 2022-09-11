/**
 * ✨ Let's build a NodeJS + Express + Apollo Server!
 */
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import http from 'http';
import { getUserByToken } from './auth.js';
import DB from './database.js';
import schema from './schema.js';
import { prepareDb } from './_typedefs/prepare-db.js';

/**
 * Run at every reload to initialze express and database
 * @param schema
 */
async function startApolloServer(schema: GraphQLSchema) {
    console.log('🥳 Attmpting to start Server');

    // Initialize Routing + Databases
    const app = express();
    const httpServer = http.createServer(app);
    const db = new DB({
        client: 'sqlite3',
        connection: ':memory:',
        // @ts-ignore
        userNullAsDefault: true,
    });

    // TODO 💀 Never call this in production, find a better place to put this
    await prepareDb(db.getKnex());

    // Simple redirect for CodeSandbox
    app.get('/', (req, res) => res.redirect('/graphql'));

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: 'bounded',
        introspection: process.env.NODE_ENV !== 'production',
        dataSources: () => ({ db }),
        context: async ({ req }) => {
            // Avoid updating context on introspection
            if (req.body.operationName === 'IntrospectionQuery') {
                return;
            }

            // On every request, authorize user token if provided
            const token = req.headers.authorization ?? '';
            const user = token ? await getUserByToken(db, token) : undefined;
            console.log(`🗝️ Authorized ${user?.id ?? 'NOONE'} for ${req.body.operationName}`);

            return { user };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });

    // Start Express + Apollo server and listen
    await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>((resolve) => {
        console.log('listening');
        return httpServer.listen({ port: 4000 }, resolve);
    });

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

await startApolloServer(schema);
