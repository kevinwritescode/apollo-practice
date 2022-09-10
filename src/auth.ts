
import { UserDb } from "./models.js";

export async function getUser(db, token: string): Promise<UserDb | undefined> {
    return db.getUser(token);
}

export function hasPermission(user: UserDb, context: string): boolean {
    return user?.permission.includes(context);
}