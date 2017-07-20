module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST|| '127.0.0.1',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Sand8520',
    database: process.env.DB || 'timecard'
  }
}