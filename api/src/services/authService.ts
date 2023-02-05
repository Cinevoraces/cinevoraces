import type { PoolClient } from 'pg';
import type { FastifyPluginCallback } from 'fastify';
import type { ERoles } from '../models/enums/ERoles';
import DatabaseService from './databaseService';
import bcrypt from 'bcryptjs';
import plugin from 'fastify-plugin';

/**
 * @description AuthService contains auth and SQL query methods 
 * related to authentication routes.
 */
class AuthService extends DatabaseService {
  constructor(client: PoolClient) {
    super(client);
  }

  /**
   * @description Hash string with a salt set to 10.
   * @param {string} string string to hash.
   * @returns Hashed string.
   */
  public async hashString(string: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
  }

  /**
   * @description Compare string with hashed one.
   * @param {string} s1 string to compare.
   * @param {string} s2 string to compare.
   * @returns Boolean.
   */
  public async compareStrings(s1: string, s2: string): Promise<boolean> {
    return await bcrypt.compare(s1, s2);
  }

  /**
   * @description Get a user by pseudo or mail, returns only those fields.
   * @param {string} pseudo user pseudo
   * @param {string} mail user mail
   * @returns Object containing *pseudo, mail*.
   */
  public async getUserByPseudoOrMail(
    pseudo: string,
    mail: string
  ): Promise<{ pseudo: string; mail: string }> {
    const { rows } = await this.requestDatabase({
      text: ` SELECT pseudo, mail
              FROM "user"
              WHERE pseudo = $1 OR mail = $2;`,
      values: [pseudo, mail],
    });
    return rows[0];
  }

  /**
   * @description Get token construction data of one user using id or pseudo.
   * @param {object} value Object containing *id or pseudo*.
   * @returns Object containing token content.
   */
  public async getPrivateUser(
    value: { id: number } | { pseudo: string } | { mail: string }
  ): Promise<{
      id: number;
      pseudo: string;
      mail: string;
      role: ERoles;
    }> {
    const column: string = Object.keys(value)[0];
    const { rows } = await this.requestDatabase({
      text: ` SELECT id, pseudo, mail, password, role, document_group_id
              FROM "user"
              WHERE ${Object.keys(value)[0]} = $1;`,
      values: [value[column as keyof typeof value]],
    });
    return rows[0];
  }

  /**
   * @description Create a new user.
   * @param {object} values Object containing *pseudo, mail, password*.
   * @returns pgPromise
   */
  public async createUser(
    values: Record<'pseudo' | 'mail' | 'password', string>
  ): Promise<void> {
    const { pseudo, mail, password } = values;
    await this.requestDatabase({
      text: ` INSERT INTO "user" (pseudo, mail, password)
              VALUES ($1, $2, $3);`,
      values: [pseudo, mail, password],
    });
  }

  /**
   * @description Compare given string with user password from database.
   * @param {number} userId Id of user to compare.
   * @param {string} password string to compare.
   * @returns boolean
   */
  public async verifyPassword(
    userId: number,
    password: string
  ): Promise<boolean> {
    const { rows } = await this.requestDatabase({
      text: ` SELECT password
              FROM "user"
              WHERE id = $1;`,
      values: [userId],
    });
    return await this.compareStrings(password, rows[0].password);
  }

};

// Decorate FastifyInstance with AuthService
export type TAuthService = InstanceType<typeof AuthService>;
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_authService'))
    return fastify.log.warn('authService already registered');
  
  const AuthServiceInstance = new AuthService(fastify._postgres.client);
  fastify.decorate('_authService', { getter: () => AuthServiceInstance });
  done();
}) as FastifyPluginCallback);
