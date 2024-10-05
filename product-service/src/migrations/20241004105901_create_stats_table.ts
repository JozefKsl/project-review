import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('stats', (table) => {
        table.integer('productId').unsigned().primary()
            .references('id').inTable('product')
            .onDelete('CASCADE');
        table.float('avgRating').notNullable().defaultTo(0);
        table.integer('reviewCount').notNullable().defaultTo(0);
        table.integer('totalRatingPoints').notNullable().defaultTo(0);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('stats');
}
