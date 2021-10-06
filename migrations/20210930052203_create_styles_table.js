exports.up = function(knex) {
  return knex.schema.createTable('styles', (table) => {
    table.integer('id').primary()
    table.integer('product_id').notNullable().index()
    table.foreign('product_id').references('products.id')
    table.string('name')
    table.integer('sale_price')
    table.integer('original_price')
    table.integer('default_style')


    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('styles', (table) => {
    console.log('styles table was dropped!')
  })
};
