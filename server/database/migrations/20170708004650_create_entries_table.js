
exports.up = function(knex, Promise) {
  return knex.schema.createTable('entries', t => {
    t.increments('id').primary()
    t.dateTime('start_time').notNullable()
    t.dateTime('end_time').notNullable()
    t.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('entries')
};
