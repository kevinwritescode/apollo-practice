import { Team, User } from "../gql-types.js";

// TODO Do not extend User typedef once you establish proper DB types
export interface UserDb extends Omit<User, 'team'> {
    teamId: string,
    token: string,
    permission: string[]
}

export const users: UserDb[] = [
    {
        id: '1',
        name: 'Kevin',
        city: 'Austin',
        country: 'United States',
        countryCode: 'US',
        timezone: -5,
        teamId: '1',
        token: 'AAA',
        permission: ['Team'],
    },
    {
        id: '2',
        name: 'Nancy',
        city: 'Boston',
        country: 'United States',
        countryCode: 'US',
        timezone: -4,
        teamId: '2',
        token: 'BBB',
        permission: [],
    },
];

export const teams: Team[] = [
    {
        id: '1',
        name: 'Mercury',
    },
    {
        id: '2',
        name: 'Solar'
    }
]