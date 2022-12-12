import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
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
    reply: Reply
  ) => {
    const { pgClient, user, body } = request;
    const { id: userId } = user;

    if (!body || !(body as { password: string }).password) {
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
    
      const isPasswordCorrect = await request.bcryptCompare(
        (body as { password: string }).password, rows[0].password
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
