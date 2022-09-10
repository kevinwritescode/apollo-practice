import { SQLDataSource } from 'datasource-sql';
import { Team, User } from '../gql-types.js';
import { teams, users } from './models.js';

const MINUTE = 60;

export default class DB extends SQLDataSource {
    async initialize() {
        const knex = this.knex;

        await knex.schema.dropTableIfExists('user');

        await knex.schema.dropTableIfExists('team');

        await knex.schema.createTable('user', function(table) {
            table.string('id');
            table.string('name');
            table.string('city');
            table.string('country');
            table.string('countryCode');
            table.integer('timezone');
            table.string('teamId');
            table.string('token');
            table.string('permission');

            knex.batchInsert('user', users);
        });

        await knex.schema.createTable('team', function(table) {
            table.string('id');
            table.string('name');

            knex.batchInsert('team', teams);
        });
    }

    async getUser(token: string): Promise<User> {
        return this.knex('user').where({ token }).first();
    }

    
    async getTeams(): Promise<Team[]> {
        return this.knex('team');
    }

    async getTeam(id: string): Promise<Team> {
        return this.knex('team').where({ id }).first();
    }
}