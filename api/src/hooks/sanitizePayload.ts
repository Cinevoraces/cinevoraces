import type {
  FastifyRequest as Request,
  FastifyPluginCallback,
} from 'fastify';
import plugin from 'fastify-plugin';
import { sanitizeObject } from '@src/utils/sanitizeHtmlHandler';

export const sanitizePayloadHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Sanitize Payload**
   * @preHandler
   * @description 
   * Look for any HTML tags in the payload and remove them.
   * This hook is executed on every endpoints.
   */
  fastify.addHook('preHandler', async (
    request: Request,
  ) => {
    if (request.body) request.body = sanitizeObject(request.body as Record<string, unknown>);
  });
    
  done();
};

export default plugin(sanitizePayloadHooks);
