export function getUser(User, token: string): object {
    return User.find(row => row.token === token);
}

export function hasPermission(user, context: string): boolean {
    return user?.permission.includes(context);
}