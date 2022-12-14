import { Context } from 'apollo-server-core';
import { Response } from 'express';
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

export interface AppContext extends Context {
    user: UserDb;
    res: Response;
    dataSources: {
        db: DB;
    };
}
