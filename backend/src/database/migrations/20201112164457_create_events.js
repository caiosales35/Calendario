
exports.up = function(knex) {
    return knex.schema.createTable('events', function(table){
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.datetime('start');
        table.datetime('end');
        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
