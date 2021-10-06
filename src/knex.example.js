module.exports = {
  client: '',
  connection: {
    host : '',
    port : '',
    user : '',
    password: '',
    database : ''
  },
  migrations: {
    tableName: 'knex_migration',
    directory: '../migrations'
  },
  pool: { min: 2, max: 10 }
}