const knex = require('knex') (require('./knexfile'))

const addEntry = ({start_time, end_time, hours_worked}) => {
  return knex('entries').insert({
    start_time,
    end_time,
    hours_worked
  })
}

const getInitialData = ({firstDay, lastDay}) => {
  return knex.sum('hours_worked as hours')
    .from('entries').whereBetween('start_time', [firstDay, lastDay])
    .then(([data]) => data.hours)
}

const getHours = (firstDay,lastDay) => {
  return knex.select('id','start_time', 'end_time')
    .from('entries')
    .whereBetween('start_time', [firstDay, lastDay])
    .then((data) => {
      return data
    })
}

module.exports = {addEntry, getInitialData, getHours}