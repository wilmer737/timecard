const knex = require('knex') (require('./knexfile'))

const addEntry = ({start_time, end_time}) => {
  return knex('entries').insert({
    start_time,
    end_time
  })
}

module.exports = {addEntry}