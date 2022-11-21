/**
 * Alter table `practitioner `. Add column photo.
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
 *Alter table `practitioner `. Drop column photo.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
exports.down = function (knex) {
  return knex.schema.alterTable('practitioners', (table) => {
    table.dropColumn('photo');
  });
};
