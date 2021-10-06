exports.up = function(knex) {
  return knex.schema.createTable('related_products', (table) => {
    table.integer('id').primary()
    table.integer('current_product_id').notNullable().index()
    table.foreign('current_product_id').references('products.id')
    table.integer('related_product_id')
    table.foreign('related_product_id').references('products.id')

    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('related_products', (table) => {
    console.log('related_products table was dropped!')
  })
};
