module.exports = {
  client: 'pg',
  connection: {
    host : 'localhost',
    port : 5432,
    user : 'dev',
    password: 'password',
    database : 'products'
  },
  migrations: {
    tableName: 'knex_migration',
    directory: '../migrations'
  }
}