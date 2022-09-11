import crypto from 'crypto';
import { SQLDataSource } from 'datasource-sql';
import { UserDb } from './_typedefs/db-types.js';
import { CreateUserInput, Scalars, Team } from './_typedefs/gql-types.js';

const MINUTE = 60;

export default class DB extends SQLDataSource {
    getKnex() {
        return this.knex;
    }

    async getUsers(): Promise<UserDb[]> {
        return this.knex('user');
    }

    async getUser(id: Scalars['ID']): Promise<UserDb> {
        return this.knex('user').where({ id }).first();
    }

    async createUser(input: CreateUserInput): Promise<Scalars['ID']> {
        const res = await this.knex('user').insert({ ...input, id: crypto.randomUUID() }, ['id']);
        return res?.[0]?.id;
    }

    async getUserByToken(token: string): Promise<UserDb> {
        return this.knex('user').where({ token }).first();
    }

    async getTeams(): Promise<Team[]> {
        return this.knex('team');
    }

    async getTeam(id: Scalars['ID']): Promise<Team> {
        const out = await this.knex('team').where({ id }).first();
        return out;
    }
}
