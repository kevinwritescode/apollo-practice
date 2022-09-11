import { UserDb } from './_typedefs/models.js';

/**
 * Lookup a user based on a simple token authorization
 * TODO implement a real authentication layer
 * @param db
 * @param token
 * @returns
 */
export async function getUser(db, token: string): Promise<UserDb | undefined> {
    return db.getUser(token);
}

/**
 * Performs a basic check based on route context and whether user has rights
 * TODO implement a proper role/permission system
 *
 * @param user
 * @param context
 * @returns
 */
export function hasPermission(user: UserDb, context: string): boolean {
    return user?.permission.includes(context);
}
