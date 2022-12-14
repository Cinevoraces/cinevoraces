import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { ApiError } from '../types/_index';
import plugin from 'fastify-plugin';

export const verifyPasswordHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {
/**
   * **Password verification**
   * @preValidation
   * @description
   * This hook verifies if the password is correct.
   */
  fastify.decorate('verifyPassword', async (
    request: Request, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, user, body } = request;
    const { id: userId } = user;

    if (!body || !(body as { password: string }).password)
      error.send(ApiError.MISSING_PASSWORD, 401);

    const { rows } = await pgClient.query({
      text: ` SELECT password
              FROM "user"
              WHERE id=$1;`,
      values: [userId],
    });
    
    const isPasswordCorrect = await request.bcryptCompare(
      (body as { password: string }).password, rows[0].password
    );

    if (!isPasswordCorrect) 
      error.send(ApiError.INVALID_PASSWORD, 401);
  });
  done();
};

export default plugin(verifyPasswordHooks);
