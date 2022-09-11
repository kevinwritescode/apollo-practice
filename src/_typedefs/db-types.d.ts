import DB from '../database.js';
import { User } from './gql-types.js';

// TODO Do not extend User typedef once you establish proper DB types
export interface UserDb extends Omit<User, 'team'> {
    teamId: string;
    token: string;
    permission: string;
    hash: string;
}

export interface Args<T> {
    input: T;
}

export interface DataSources {
    user: UserDb;
    dataSources: {
        db: DB;
    };
}
