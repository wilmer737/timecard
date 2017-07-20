module.exports = {
  client: 'mysql',
  connection: {
    host : 'us-cdbr-iron-east-03.cleardb.net',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'Sand8520',
    database: 'timecard'
  }
}