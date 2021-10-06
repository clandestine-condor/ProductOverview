exports.up = async function(knex) {
  await knex.schema.createTable('products', (table) => {
    table.integer('id').primary()
    table.string('name')
    table.string('slogan')
    table.string('description', 1000)
    table.string('category')
    table.string('default_price')

    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('products')
  console.log('products table was dropped')
};
