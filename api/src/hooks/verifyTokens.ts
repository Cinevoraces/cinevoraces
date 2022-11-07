import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    verifyAccessToken: (request: Request, reply: Reply)=>void;
    verifyAccessTokenOptionnal: (request: Request, reply: Reply)=>void;
    verifyRefreshToken: (request: Request, reply: Reply)=>void;
  }
}

export const verifyTokensHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Access token verification**
   * @onRequest
   * @description
   * This hook verifies the access token then populate request.user with decoded informations.
   */
  fastify.decorate('verifyAccessToken', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Optionnal Access token verification**
   * @onRequest
   * @description
   * This hook verifies the access token then populate request.user with decoded informations.
   * The verification doesn't throw any error if token isn't provided, 
   * use it with visitor routes that has special features if user is logged.
  */
  fastify.decorate('verifyAccessTokenOptionnal', async (request: Request, reply: Reply) => {
    try {
      if (request.headers.authorization) await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  /**
   * **Refresh token verification**
   * @onRequest
   * @description
   * This hook verifies the refresh token then populate request.user with decoded informations.
  */
  fastify.decorate('verifyRefreshToken', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch (err) {
      reply.send(err);
    }
  });

  done();
};

export default plugin(verifyTokensHooks);
