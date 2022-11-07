import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { comparePassword } from '@src/utils/bcryptHandler';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    verifyPassword: (request: Request, reply: Reply)=>void;
  }
}

interface Body {
  password: string;
}

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
    reply: Reply
  ) => {
    const { pgClient, user, body } = request;
    const { id: userId } = user;

    if (!body || !(body as Body).password) {
      reply.code(401); // Unauthorized
      throw new Error('Mot de passe requis.');
    }

    try {
      const { rows } = await pgClient.query({
        text: ` SELECT password
              FROM "user"
              WHERE id=$1;`,
        values: [userId],
      });
    
      const isPasswordCorrect = await comparePassword(
        (body as Body).password, rows[0].password
      );
      if (!isPasswordCorrect) {
        reply.code(401); // Unauthorized
        throw new Error('Mot de passe incorrect.');
      }
    } catch (err) {
      reply.send(err);
    }
  });
  done();
};

export default plugin(verifyPasswordHooks);
