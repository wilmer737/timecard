const knex = require('knex') (require('./knexfile'))

const addEntry = ({start_time, end_time, hours_worked}) => {
  return knex('entries').insert({
    start_time,
    end_time,
    hours_worked
  })
}

module.exports = {addEntry}