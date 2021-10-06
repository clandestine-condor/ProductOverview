exports.up = function(knex) {
  return knex.schema.alterTable('photos', (table) => {
    table.text('url', 500).alter();
    table.text('thumbnail_url', 500).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('photos', (table) => {
    table.text('url').alter();
    table.text('thumbnail_url').alter();
  })
};
