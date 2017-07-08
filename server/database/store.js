const knex = require('knex') (require('./knexfile'))

const addEntry = () => {
  console.log('Adding Entry')
  return Promise.resolve()
}

module.exports = {addEntry}