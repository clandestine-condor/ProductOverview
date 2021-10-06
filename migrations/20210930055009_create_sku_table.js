exports.up = function(knex) {
  return knex.schema.createTable('sku', (table) => {
    table.integer('id').primary()
    table.integer('style_id').notNullable().index()
    table.foreign('style_id').references('styles.id')
    table.string('size')
    table.integer('quantity')

    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sku', (table) => {
    console.log('sku table was dropped!')
  })
};
