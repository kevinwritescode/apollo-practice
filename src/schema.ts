import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDef as Error } from './schemas/error.js';
import { resolvers as MutationRes, typeDef as Mutation } from './schemas/mutation.js';
import { resolvers as QueryRes, typeDef as Query } from './schemas/query.js';
import { typeDef as Team } from './schemas/team.js';
import { resolvers as UserRes, typeDef as User } from './schemas/user.js';

const schema = makeExecutableSchema({
    typeDefs: [Query, User, Team, Mutation, Error],
    // TODO do a deep merge to support merging shared Query and Mutations
    // TODO learn more about large GQL schemas and how to manage
    resolvers: { ...QueryRes, ...UserRes, ...MutationRes },
});

export default schema;
