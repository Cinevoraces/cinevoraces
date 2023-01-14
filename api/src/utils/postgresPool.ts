import { Pool } from 'pg';

/**
 * @package pg
 * @description PostgreSQL pool object.
 * @see https://github.com/brianc/node-postgres
 * @see https://node-postgres.com/
 */
export default new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
});
