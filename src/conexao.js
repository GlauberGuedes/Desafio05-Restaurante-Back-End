const knex = require('knex')({
  client: 'pg',
  connection: {
      host: process.env.BD_HOST,
      user: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE
  }
});

module.exports = knex;