import knexJs from 'knex';

import knexConfig from './knexfile';

/**s
 * Database connection.
 */
const knex = knexJs(knexConfig);

export default knex;
