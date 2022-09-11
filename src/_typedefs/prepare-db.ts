import { Knex } from 'knex';
import { UserDb } from './db-types.js';
import { Team } from './gql-types.js';

export const users: UserDb[] = [
    {
        id: '01b6a624-d854-4da8-bb3e-4b13b4d0f74d',
        name: 'Kevin',
        city: 'Austin',
        country: 'United States',
        countryCode: 'US',
        timezone: -5,
        teamId: '1',
        token: 'AAA',
        permission: 'Team|User',
        hash: 'XYZ',
    },
    {
        id: '1980dd03-cebb-46f0-9649-90b5dcd6f9cb',
        name: 'Gracie 🐈‍⬛',
        city: 'Cattown',
        country: 'United States',
        countryCode: 'US',
        timezone: -4,
        teamId: '2',
        token: 'BBB',
        permission: '',
        hash: 'ABC',
    },
];

export const teams: Team[] = [
    {
        id: '1',
        name: 'Mercury',
    },
    {
        id: '2',
        name: 'Solar',
    },
];

/**
 * 💀 Never run in production! for local experimentation only!
 * TODO move out of source and have a local only PREPARE step
 */
export async function prepareDb(knex: Knex) {
    if (process.env.NODE_ENV === 'production') {
        console.log('💀 Avoiding production data replacement');
        return;
    }

    console.log('Initializing DB');

    await knex.schema.dropTableIfExists('user');

    await knex.schema.dropTableIfExists('team');

    await knex.schema.createTable('user', function (table) {
        table.uuid('id').primary();
        table.string('name');
        table.string('city');
        table.string('country');
        table.string('countryCode');
        table.integer('timezone');
        table.string('teamId');
        table.string('token');
        table.string('permission').defaultTo('');
        table.string('hash');
    });

    await knex.batchInsert('user', users);

    await knex.schema.createTable('team', function (table) {
        table.uuid('id').primary();
        table.string('name');
    });

    await knex.batchInsert('team', teams);
}
