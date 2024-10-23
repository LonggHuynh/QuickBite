import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err: any) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
