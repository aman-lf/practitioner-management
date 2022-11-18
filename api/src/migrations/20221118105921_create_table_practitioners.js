/**
 * Create table `practitioner `.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.createTable('practitioners', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email');
    table.string('contact');
    table.date('dob');
    table.string('working_day');
    table.time('start_time');
    table.time('end_time');
    table.boolean('is_specialist');
  });
};

/**
 * Drop `practitioner `.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.dropTable('practitioners');
};
