/**
 * Create table `practitioner `.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.alterTable('practitioners', (table) => {
    table.string('photo');
  });
};

/**
 * Drop `practitioner `.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.alterTable('practitioners', (table) => {
    table.dropColumn('photo');
  });
};
