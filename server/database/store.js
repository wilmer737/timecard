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

const getHours = ({firstDay,lastDay}) => {
  return knex.select(
    'id',
    knex.raw('date_format(start_time, "%I:%i %p") AS start_time'),
    knex.raw('date_format(end_time, "%I :%i %p") AS end_time'),
    'start_time AS current_day'
  ).from('entries')
    .whereBetween('start_time', [firstDay, lastDay])
    .orderBy('current_day', 'desc')
    .then(data => data)
}

const getEntry = ({id}) => {
  return knex.select('*').from('entries').where('id',id).then(([data]) => data)
}

const updateEntry = ({id, newValues}) => {
  return knex('entries')
    .where('id', id)
    .update(newValues).then(data => data)
}

const deleteEntry = ({id}) => {
  return knex('entries')
    .where('id', id)
    .del()
}

module.exports = {
  addEntry,
  getInitialData,
  getHours,
  getEntry,
  updateEntry,
  deleteEntry
}