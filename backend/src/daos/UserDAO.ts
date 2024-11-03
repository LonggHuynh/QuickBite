import pool from '../configs/database';
import { AppUser } from '../models/AppUser';

export async function createUser(user: AppUser): Promise<void> {
  const query = `INSERT INTO app_user (id, email, password) VALUES ($1, $2, $3)`;
  await pool.query(query, [user.id, user.email, user.password]);
}

export async function getUserByEmail(email: string): Promise<AppUser | undefined> {
  const query = `SELECT app_user.*, restaurant.id as restaurant_id FROM app_user
    LEFT JOIN restaurant ON app_user.id = restaurant.owner_id
     WHERE email = $1
  `;

  const result = await pool.query<AppUser>(query, [email]);
  return result.rows.at(0);
}
