import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { Request } from 'express';
import DB from './database.js';
import { UserDb } from './_typedefs/db-types.js';
import { Scalars } from './_typedefs/gql-types.js';

/**
 * Lookup a user based on a simple token authorization
 * TODO implement a real authentication layer
 */
export async function getUserByToken(db: DB, token: string): Promise<UserDb | undefined> {
    return db.getUserByToken(token);
}

/**
 * Performs a basic check based on route context and whether user has rights
 * TODO implement a proper role/permission system
 */
export function validateOrThrow(user: UserDb, context: string): boolean {
    // If user session doesn't exist, this will throw too
    const isAllowed = user?.permission.split('|').includes(context);
    if (!isAllowed) {
        throw new ForbiddenError('User not allowed');
    }
    return true;
}

export async function authorize(req: Request, db: DB) {
    // Avoid updating context on introspection
    if (req.body.operationName === 'IntrospectionQuery') {
        return;
    }

    // On every request, authorize user token if provided
    const token = req.headers.authorization ?? '';
    const user = token ? await getUserByToken(db, token) : undefined;
    console.log(`🗝️ Authorized ${user?.id ?? 'NOONE'} for ${req.body.operationName}`);

    return { user };
}
