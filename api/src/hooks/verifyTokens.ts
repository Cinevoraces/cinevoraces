import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { EErrorMessages, ERoles } from '../models/enums/_index';
import plugin from 'fastify-plugin';

export default plugin((async (fastify, opts, done) => {
  /**
   * @onRequest
   * @description Access token verification
   * This hook verifies the access token then populate request.user with decoded informations.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyAccessToken', async (request: Request, reply: Reply) => {
    try {
      // await request.jwtVerify();
      console.log('----------------------- On test le token -----------------------');
      const result = await request.jwtVerify() as { id: number; pseudo: string; role: number; expiresIn: number; iat: number; exp: number };
      console.log('Contenu du token : ', result);
      console.log('----------------------- Le token est testé -----------------------');
    } catch {
      fastify._errorService.send(EErrorMessages.INVALID_TOKEN, 401);
    }
  });

  /**
   * @onRequest
   * @description Optionnal Access token verification
   * This hook verifies the access token then populate request.user with decoded informations.
   * The verification doesn't throw any error if token isn't provided, 
   * use it with visitor routes that has extra features if user is logged.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyAccessTokenOptionnal', async (request: Request, reply: Reply) => {
    if (request.headers.authorization) {
      try {
        await request.jwtVerify();
      } catch {
        fastify._errorService.send(EErrorMessages.INVALID_TOKEN, 401);
      }
    }
  });

  /**
   * @onRequest
   * @description Refresh token verification
   * This hook verifies the refresh token then populate request.user with decoded informations.
  */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('verifyRefreshToken', async (request: Request, reply: Reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch {
      fastify._errorService.send(EErrorMessages.INVALID_TOKEN, 401);
    }
  });

  /**
   * @onRequest
   * @description Admin role verification
   * This hook verifies if user role is 'admin'.
  */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('isAdmin', async (request: Request, reply: Reply) => {
    const { _errorService } = fastify;
    await request.jwtVerify();
    if (request.user.role !== ERoles.ADMIN)
      _errorService.send(EErrorMessages.ADMIN_ONLY, 403);
  });

  done();
}) as FastifyPluginCallback);
