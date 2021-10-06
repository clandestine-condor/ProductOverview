exports.up = function(knex) {
  return knex.schema.createTable('photos', (table) => {
    table.integer('id').primary()
    table.integer('style_id').notNullable().index()
    table.foreign('style_id').references('styles.id')
    table.string('url')
    table.string('thumbnail_url')

    const useTimestamps = true
    const defaulToNow = true
    table.timestamps(useTimestamps, defaulToNow)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('photos', (table) => {
    console.log('photos table was dropped!')
  })
};
