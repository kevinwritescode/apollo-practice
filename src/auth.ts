import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import DB from './database.js';
import { UserDb } from './_typedefs/db-types.js';
import { Scalars } from './_typedefs/gql-types.js';

/**
 * Lookup a user based on a simple token authorization
 * TODO implement a real authentication layer
 * @param db
 * @param token
 * @returns
 */
export async function getUserByToken(db: DB, token: string): Promise<UserDb | undefined> {
    return db.getUserByToken(token);
}

export async function loginUser(db: DB, id: Scalars['ID'], hash: string): Promise<string> {
    const user = await db.getUser(id);
    if (!hash || user.hash !== hash) {
        throw new AuthenticationError('Invalid login credentials');
    }
    // TODO generate a proper session hash per login, destroy old ones (or support multiple logins)
    return user.token;
}

/**
 * Performs a basic check based on route context and whether user has rights
 * TODO implement a proper role/permission system
 *
 * @param user
 * @param context
 * @returns
 */
export function validateOrThrow(user: UserDb, context: string): boolean {
    // If user session doesn't exist, this will throw too
    const isAllowed = user?.permission.split('|').includes(context);
    if (!isAllowed) {
        throw new ForbiddenError('User not allowed');
    }
    return true;
}
