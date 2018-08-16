const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'tutukani',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'bqG#ieoZ>5fK',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../tutukani.sql'),
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
