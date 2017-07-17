const knex = require('knex') (require('./knexfile'))

const addEntry = ({start_time, end_time, hours_worked}) => {
  console.log('sup')
  return knex('entries').insert({
    start_time,
    end_time,
    hours_worked
  })
}

module.exports = {addEntry}