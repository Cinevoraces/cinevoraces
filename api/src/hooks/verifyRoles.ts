import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    isAdmin: (request: Request, reply: Reply)=>void;
  }
}

export const verifyRolesHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Admin verification**
   * @onRequest
   * @description
   * This hook verifies if user role is 'admin'.
  */
  fastify.decorate('isAdmin', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
      if (request.user.role !== 'admin') {
        reply.status(403);
        throw new Error('accès restreint aux administrateurs.');
      }
    } catch (err) {
      reply.send(err);
    }
  });

  done();
};

export default plugin(verifyRolesHooks);
