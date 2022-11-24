import db from '../db';
import { UserToCreate } from '../interfaces/userInterface';

/**
 * User model.
 */
class User {
  public static table = 'users';

  /**
   * Get all users
   */
  public static async getAllUsers() {
    const users = await db(User.table).select('id', 'email');
    return users;
  }

  /**
   * Get user by email
   * @param  {string} email
   */
  public static async getUserByEmail(email: string) {
    const user = await db(User.table).where({ email }).first();

    return user;
  }

  /**
   * Get user by id
   * @param  {number} id
   */
  public static async getUserById(id: number) {
    const user = await db(User.table).where({ id }).first();

    return user;
  }

  /**
   * Create user
   * @param  {UserToCreate} user
   */
  public static async createUser(user: UserToCreate) {
    const newUser = await db(User.table).insert(user, ['id', 'email']);

    return newUser;
  }
}

export default User;
