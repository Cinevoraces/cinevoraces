import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { ApiError, Roles } from '../types/_index';
import plugin from 'fastify-plugin';

export const verifyRolesHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Admin verification**
   * @onRequest
   * @description
   * This hook verifies if user role is 'admin'.
  */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('isAdmin', async (request: Request, reply: Reply) => {
    const { error } = request;
    await request.jwtVerify();
    if (request.user.role !== Roles.ADMIN) 
      error.send(ApiError.ADMIN_ONLY, 403);
  });

  done();
};

export default plugin(verifyRolesHooks);
