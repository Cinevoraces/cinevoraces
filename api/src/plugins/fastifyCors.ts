import type { FastifyPluginCallback } from 'fastify';
import cors from '@fastify/cors';
import plugin from 'fastify-plugin';

type originCallback = (err: Error, allow: boolean)=>void;

/**
 * **Fastify CORS**
 * @description
 * This plugin registers the CORS plugin used for Cross Origin Requests authorization
 */
const fastifyCors: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(cors),
  {
    origin: (origin: string, cb: originCallback) => {
      const hostname = new URL(origin).hostname;
      if (hostname === 'localhost') {
        //Requests from localhost will pass
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error('Not allowed'), false);
    },
  };
  done();
};

export default plugin(fastifyCors);