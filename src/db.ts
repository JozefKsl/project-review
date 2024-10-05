import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USERNAME || 'username',
        password: process.env.PASSWORD || 'password',
        database: process.env.DB_NAME || 'database_name',
        port: 5432,
    },
    pool: { min: 0, max: 7 },
});

export default db;
