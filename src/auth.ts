
import { UserDb } from "./database.js";

export function getUser(users: UserDb[], token: string): UserDb | undefined {
    return users.find(row => row.token === token);
}

export function hasPermission(user: UserDb, context: string): boolean {
    return user?.permission.includes(context);
}