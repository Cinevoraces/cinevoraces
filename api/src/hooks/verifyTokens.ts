import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';

export const verifyTokensHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Access token verification**
   * @onRequest
   * @description
   * This hook verifies the access token then populate request.user with decoded informations.
   */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyAccessToken', async (request: Request, reply: Reply) => {
    await request.jwtVerify();
  });

  /**
   * **Optionnal Access token verification**
   * @onRequest
   * @description
   * This hook verifies the access token then populate request.user with decoded informations.
   * The verification doesn't throw any error if token isn't provided, 
   * use it with visitor routes that has special features if user is logged.
  */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyAccessTokenOptionnal', async (request: Request, reply: Reply) => {
    if (request.headers.authorization) await request.jwtVerify();
  });

  /**
   * **Refresh token verification**
   * @onRequest
   * @description
   * This hook verifies the refresh token then populate request.user with decoded informations.
  */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyRefreshToken', async (request: Request, reply: Reply) => {
    await request.jwtVerify({ onlyCookie: true });
  });

  done();
};

export default plugin(verifyTokensHooks);
