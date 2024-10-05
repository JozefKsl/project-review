import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('review', (table) => {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.text('reviewText').notNullable();
        table.integer('rating').notNullable();
        table
            .integer('productId')
            .unsigned()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE');
        table.timestamps(true, true);

        table.check(`rating >= 1 AND rating <= 5`);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('review');
}
