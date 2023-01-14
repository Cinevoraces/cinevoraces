import type { PoolClient } from 'pg';
import type { FastifyPluginCallback } from 'fastify';
import type { PQuerystring, PUser } from '../models/types/_index';
import { v2 } from 'cloudinary';
import DatabaseService from './databaseService';
import plugin from 'fastify-plugin';

/**
 * @description UserService contains movies and SQL query related methods 
 * related to users routes.
 */
class UserService extends DatabaseService {
  constructor(client: PoolClient) {
    super(client);
  }

  /**
   * @description Get users using query parameters.
   * @param {object} query object containing queries parameters
   * @returns Array of users.
   */
  public async getUsersByQuery(
    query: PQuerystring
  ): Promise<{ rowCount: number; rows: Array<PUser> }> {
    const enums = {
      where: ['id', 'pseudo', 'mail', 'role'],
      select: ['propositions', 'reviews', 'metrics', 'movies'],
    };

    const { select, where, limit, sort } = query;
    let values = [] as Array<unknown>,
      SELECT: string = undefined,
      WHERE = { query: '', count: 0, values: [] as Array<unknown> },
      ORDERBY = '',
      LIMIT = '';

    // Build SELECT query
    if (select) {
      SELECT = this.reduceSelect(select, enums.select);
    }
    // Build WHERE query
    if (where) {
      WHERE = this.reduceWhere(where, 'AND', enums.where);
      values = WHERE.values as Array<unknown>;
    }
    // Build ORDERBY query
    if (sort === 'asc' || sort === 'desc') {
      ORDERBY = `ORDER BY id ${sort}`;
    }
    // Build LIMIT query
    if (typeof limit === 'number' && limit > 0) {
      LIMIT = `LIMIT ${limit}`;
    }

    const { rowCount, rows } = await this.requestDatabase({
      text: ` SELECT id, pseudo, mail, avatar_url, role, created_at, updated_at
              ${SELECT ? `,${SELECT}` : ''}
              FROM userview
              ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
              ${ORDERBY}
              ${LIMIT};`,
      values,
    });

    return { rowCount, rows };
  }

  /**
   * @description Update one user.
   * @param {number} id user's id
   * @param {object} set object containing updated user's data
   */
  public async updateUser(
    id: number,
    set: Record<string, unknown>
  ): Promise<void> {
    const enumerator = ['pseudo', 'mail', 'password', 'avatar_url'];
    const SET = this.reduceWhere(set, ',', enumerator, 1);
    await this.requestDatabase({
      text: ` UPDATE "user"
              SET ${SET.query}
              WHERE id=$1;`,
      values: [id, ...SET.values],
    });
  }

  /**
   * @description Delete one user.
   * @param {number} id User's id.
   */
  public async deleteUser(id: number): Promise<void> {
    await this.requestDatabase({
      text: ' DELETE FROM "user" WHERE id=$1;',
      values: [id],
    });
  }

  /**
   * @description Upload image to Cloudinary account.
   * @param {string} userPseudo - The user's pseudo that will prefix filename.
   * @param {string} filePath - The name of the file to upload.
   */
  public async cloudinaryUpload(
    userPseudo: string,
    filePath: string
  ): Promise<string> {
    v2.config({ cloudinary_url: process.env.CLOUDINARY_URL });
    const { url } = await v2.uploader.upload(filePath, {
      folder: 'cinevoraces',
      tags: 'avatar',
      width: 200,
      height: 200,
      crop: 'fill',
      gravity: 'faces',
      format: 'jpg',
      public_id: userPseudo,
    });
    return url;
  }
};

// Decorate FastifyInstance with UserService
export type TUserService = InstanceType<typeof UserService>;
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_userService'))
    return fastify.log.warn('userService already registered');
  
  const UserServiceInstance = new UserService(fastify._postgres.client);
  fastify.decorate('_userService', { getter: () => UserServiceInstance });
  done();
}) as FastifyPluginCallback);
