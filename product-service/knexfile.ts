import type { Knex } from 'knex';

// Knex configuration settings for PostgreSQL
const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'username',
            password: 'password',
            database: 'database_name',
        },
        migrations: {
            directory: './src/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/seeds',
            extension: 'ts',
        },
    },
};

export default config;
