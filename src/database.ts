import { SQLDataSource } from 'datasource-sql';
import { Team, User } from './_typedefs/gql-types.js';
import { teams, users } from './_typedefs/models.js';

const MINUTE = 60;

export default class DB extends SQLDataSource {
    /**
     * 💀 Never run in production! for local experimentation only!
     * TODO move out of source and have a local only PREPARE step
     */
    async prepare() {
        if (process.env.NODE_ENV === 'production') {
            console.log('💀 Avoiding production data replacement');
            return;
        }

        console.log('Initializing DB');
        const knex = this.knex;

        await knex.schema.dropTableIfExists('user');

        await knex.schema.dropTableIfExists('team');

        await knex.schema.createTable('user', function (table) {
            table.string('id');
            table.string('name');
            table.string('city');
            table.string('country');
            table.string('countryCode');
            table.integer('timezone');
            table.string('teamId');
            table.string('token');
            table.string('permission');
        });

        await knex.batchInsert('user', users);

        await knex.schema.createTable('team', function (table) {
            table.string('id');
            table.string('name');
        });

        await knex.batchInsert('team', teams);
    }

    async getUser(token: string): Promise<User> {
        return this.knex('user').where({ token }).first();
    }

    async getTeams(): Promise<Team[]> {
        return this.knex('team');
    }

    async getTeam(id: string): Promise<Team> {
        const out = await this.knex('team').where({ id }).first();
        return out;
    }
}
