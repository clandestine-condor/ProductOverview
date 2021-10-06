exports.up = function(knex) {
  return knex.schema.createTable('features', (table) => {
    table.integer('id').primary()
    table.integer('product_id').notNullable().index()
    table.foreign('product_id').references('products.id')
    table.string('feature')
    table.string('value')

    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('features')
  console.log('features table was dropped')
};
