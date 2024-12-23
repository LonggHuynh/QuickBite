import { Pool } from 'pg';
import dotenv from 'dotenv';

import logger from '../utils/logger';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.on('connect', () => {
  logger.info('Connected to the database');
});

pool.on('error', (err: Error) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
