require('dotenv').config({ path: __dirname + '/../.env' });

// Configuration for database connection
let connection = {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8',
};

/**
 * Database configuration.
 */
export default {
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: 'migrations',
  },
};
