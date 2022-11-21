/**
 * Alter table `practitioner `. Add column specialization.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.up = function (knex) {
  return knex.schema.alterTable('practitioners', (table) => {
    table.json('specialization');
  });
};

/**
 * Alter table `practitioner `. Drop column specialization.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.alterTable('practitioners', (table) => {
    table.dropColumn('specialization');
  });
};
