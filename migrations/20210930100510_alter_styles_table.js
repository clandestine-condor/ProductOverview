exports.up = function(knex) {
  return knex.schema.alterTable('styles', (table) => {
    table.string('sale_price', 30).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('styles', (table) => {
    table.integer('sale_price').alter();
  })
};
